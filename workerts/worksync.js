// https://stackoverflow.com/questions/30036/javascript-and-threads

class Scheduler {
  _tasks = [];

  constructor() {
    if (!window.Worker) throw new Error('Worker not support');
  }

  //As a worker normally take another JavaScript file to execute we convert the function in an URL: http://stackoverflow.com/a/16799132/2576706
  _getScriptPath(fn) {
    return window.URL.createObjectURL(
      new Blob(
        [
          (typeof fn === 'string' ? fn : fn.toString()).match(
            /^\s*function\s*\(\s*\)\s*\{(([\s\S](?!\}$))*[\s\S])/
          )[1],
        ],
        {
          type: 'text/javascript',
        }
      )
    );
  }

  add(tag, fn, active_value) {
    this._tasks.push({
      tag,
      worker: new Worker(this._getScriptPath(fn)),
      value: active_value,
    });
    return this;
  }

  on(_tag, listener) {
    const task = this._tasks.filter(({ tag }) => tag === _tag);

    if (task.length)
      task.forEach(({ worker }) =>
        worker.addEventListener('message', listener, false)
      );

    return this;
  }

  start() {
    this._tasks.forEach(({ worker, value }) => worker.postMessage(value));
  }
}

var MAX_VALUE = 10000;

const scheduler = new Scheduler();

scheduler
  .add(
    'que?',
    function () {
      self.addEventListener(
        'message',
        function (e) {
          var value = 0;
          while (value <= e.data) {
            self.postMessage(value);
            value++;
          }
        },
        false
      );
    },
    MAX_VALUE
  )
  .add(
    'que',
    function () {
      self.addEventListener(
        'message',
        function (e) {
          var value = 0;
          while (value <= e.data) {
            self.postMessage(value);
            value++;
          }
        },
        false
      );
    },
    MAX_VALUE
  )
  .on('que?', function (e) {
    document.getElementById('result1').innerHTML = e.data;
  })
  .start();
