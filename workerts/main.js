const { dir, log } = console
if (Worker) {
    const worker = new Worker('worker.js')
    worker.postMessage('Hello World')
    worker.addEventListener('message', e => {
        dir(e)
        log('message data: ', e.data)
    })
}