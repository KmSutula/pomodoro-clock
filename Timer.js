export default class Timer {
  constructor(root) {
    root.innerHTML = Timer.getHTML();
    this.el = {
      minutes: root.querySelector("#minutes-left"),
      seconds: root.querySelector("#seconds-left"),
      play: root.querySelector(".fa-circle-play"),
      pause: root.querySelector(".fa-circle-pause"),
      reset: root.querySelector(".fa-arrow-rotate-left"),
      audio: root.querySelector("#audio"),
      currentType: root.querySelector("#timer-label"),
      sessionIncrementBtn: root.querySelector("#session-increment"),
      sessionLength: root.querySelector("#session-length"),
      sessionDecrementBtn: root.querySelector("#session-decrement"),
      breakIncrementBtn: root.querySelector("#break-increment"),
      breakDecrementBtn: root.querySelector("#break-decrement"),
      breakLength: root.querySelector("#break-length"),
    };
    this.interval = null;
    this.remainingSeconds = 1500;

    this.el.play.addEventListener("click", () => {
      if (this.interval === null) {
        this.start();
      } else {
        return;
      }
    });

    this.el.pause.addEventListener("click", () => {
      this.stop();
    });

    this.el.reset.addEventListener("click", () => {
      //add code
    });

    //functionality of up/down buttons

    this.el.sessionIncrementBtn.addEventListener("click", () => {
      this.el.sessionLength.innerHTML++;
      this.el.minutes.innerHTML = this.el.sessionLength.innerHTML;
      this.remainingSeconds = parseInt(this.el.minutes.innerHTML) * 60;
    });

    this.el.sessionDecrementBtn.addEventListener("click", () => {
      this.el.sessionLength.innerHTML--;

      if (this.el.sessionLength.innerHTML < 1) {
        this.el.sessionLength.innerHTML = 1;
        this.el.minutes.innerHTML = this.el.sessionLength.innerHTML;
      }
      this.el.minutes.innerHTML = this.el.sessionLength.innerHTML;
      this.remainingSeconds = parseInt(this.el.minutes.innerHTML) * 60;
    });

    this.el.breakIncrementBtn.addEventListener("click", () => {
      this.el.breakLength.innerHTML++;
    });

    this.el.breakDecrementBtn.addEventListener("click", () => {
      this.el.breakLength.innerHTML--;

      if (this.el.breakLength.innerHTML < 1) {
        this.el.breakLength.innerHTML = 1;
      }
    });

    this.el.reset.addEventListener("click", () => {
      this.el.minutes.innerHTML = this.el.sessionLength.innerHTML;
      this.remainingSeconds = parseInt(this.el.minutes.innerHTML) * 60;

      this.updateInterfaceTime();
      this.stop();
    });
  }
  // switchTimers() {
  //   if (this.remainingSeconds === 0) {
  //     this.el.currentType.innerHTML = "Break";
  //     this.el.minutes.innerHTML = this.el.breakLength.innerHTML;
  //     this.remainingSeconds = parseInt(this.el.minutes.innerHTML) * 60;
  //   }
  // }

  updateInterfaceTime() {
    const minutes = Math.floor(this.remainingSeconds / 60);
    const seconds = this.remainingSeconds % 60;

    this.el.minutes.textContent = minutes.toString().padStart(2, "0");
    this.el.seconds.textContent = seconds.toString().padStart(2, "0");
  }

  updateInterfaceControls() {
    if (this.interval === null) {
      this.el.play.style.color = "white";
    } else {
      this.el.pause.style.color = "white";
    }
  }

  start() {
    if (this.remainingSeconds === 0) return;

    this.interval = setInterval(() => {
      this.remainingSeconds--;
      this.updateInterfaceTime();

      if (
        this.remainingSeconds === 0 &&
        this.el.currentType.innerHTML === "Session"
      ) {
        this.stop();
        this.el.audio.play();
        this.el.currentType.innerHTML = "Break";
        this.el.minutes.innerHTML = this.el.breakLength.innerHTML;
        this.remainingSeconds = parseInt(this.el.minutes.innerHTML) * 60;
      }
      if (this.remainingSeconds === 0) {
        this.stop();
        this.el.audio.play();
        this.el.currentType.innerHTML = "Session";
        this.el.minutes.innerHTML = this.el.sessionLength.innerHTML;
        this.remainingSeconds = parseInt(this.el.minutes.innerHTML) * 60;
      }
    }, 1000);

    this.updateInterfaceControls();
  }

  stop() {
    clearInterval(this.interval);

    this.interval = null;
    this.updateInterfaceControls;
  }

  static getHTML() {
    return `
    <div class="time-control">
      <div class="length-control">
        <div id="break-label">Break Length</div>
        <div class="timer-controllers">
        <i class="fa-solid fa-arrow-up" id="break-increment"></i><h4 id="break-length">5</h4>
          <i class="fa-solid fa-arrow-down" id="break-decrement"></i
        ></i>
        </div>
        </div>
      <div class="length-control">
        <div id="session-label">Study Session Length</div>
        <div class="timer-controllers">

        <i class="fa-solid fa-arrow-up" id="session-increment"
          ></i><h4 id="session-length">25</h4></i
        ><i class="fa-solid fa-arrow-down" id="session-decrement"></i>
        </div>
      </div>
    </div>
    <div id="timer"><div id="timer-label">Session</div>
        <div id="time-left">
        <span id="minutes-left">25</span>
        <span id="dots">:</span>
        <span id="seconds-left">00</span></div>
        </div>
        </div>
        <audio id="audio" src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
        <div id="start-stop-reset">
            <i class="fa-solid fa-circle-play"></i>
            <i class="fa-solid fa-circle-pause"></i>
            <i class="fa-solid fa-arrow-rotate-left" id="reset"></i>
        </div>

`;
  }
}

new Timer(document.querySelector(".timer-container"));
