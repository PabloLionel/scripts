const { log } = console;

const countdown = (deadline, fn) => {
  const timerUpdate = setInterval(async () => {
    const time = (deadline - new Date() + 1000) / 1000;

    if (time <= 1) {
      clearInterval(timerUpdate);
      return;
    }

    const seconds = Math.floor(time % 60),
      minutes = Math.floor((time / 60) % 60),
      hours = Math.floor((time / 3600) % 24),
      days = Math.floor(time / (3600 * 24));

    fn({ seconds, minutes, hours, days });
  }, 1000);
};

countdown(
  new Date('Sun Apr 19 2020 06:57:06 GMT-0300 (hora estándar de Argentina)'),
  log
);

Vue.component('countdown', {
  template: `
  <section class="countdown">
    <div class="countdown__content">
      <span class="countdown__days">{{days}}</span>
      <span class="countdown__hours">{{hours}}</span>
      <span class="countdown__minutes">{{minutes}}</span>
      <span class="countdown__seconds">{{seconds}}</span>
    </div>
  </section>`,
  data() {
    return {
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0,
      ended: false,
    };
  },
  props: {
    second: {
      type: Number,
      default: 0,
    },
    minute: {
      type: Number,
      default: 0,
    },
    hour: {
      type: Number,
      default: 0,
    },
    day: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    countdown(deadline) {
      const timerUpdate = setInterval(async () => {
        const time = (deadline - new Date() + 1000) / 1000;
        if (time <= 1) {
          this.ended = true;
          clearInterval(timerUpdate);
          return;
        }
        this.seconds = Math.floor(time % 60);
        this.minutes = Math.floor((time / 60) % 60);
        this.hours = Math.floor((time / 3600) % 24);
        this.days = Math.floor(time / (3600 * 24));
      }, 1000);
    },
  },
  async mounted() {
    const d = new Date();
    this.countdown(
      new Date(
        d.getFullYear(),
        d.getMonth(),
        this.day || d.getDay(),
        this.hour || d.getHours(),
        this.minute || d.getMinutes(),
        this.second || d.getSeconds()
      )
    );
  },
});
