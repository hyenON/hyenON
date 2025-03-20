class Timer {
  constructor(timeLimit = 5) {
    this.timeLimit = timeLimit; // 시간제한 5초
    this.timeRemaining = timeLimit; // 남은 시간
    this.timerInterval = null; // setInterval을 저장할 변수
    this.isRunning = false; // 타이머가 실행중인지 여부
  }

  startTimer(callback) {
    if (this.isRunning) {
      console.log("타이머가 실행중입니다.");
      return;
    }

    this.isRunning = true;
    this.timeRemaining = this.timeLimit; // 타이머 시작할때마다 5초로 초기화
    this.timerInterval = setInterval(() => {
      this.timeRemaining -= 1;
      console.log(`남은시간 : ${this.timeRemaining}초`);

      if (this.timeRemaining <= 0) {
        clearInterval(this.timerInterval);
        this.isRunning = false;
        this.timeRemaining = this.timeLimit; // 타이머 종료 후 시간 초기화
        console.log("시간 종료~!!");
        callback(); // 시간끝나면 콜백함수 실행 (다음문제로 넘어감)
      }
    }, 1000); // 1초마다 시간 감소
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    this.isRunning = false;
    console.log("타이머 종료");
  }

  getTimeRemaining() {
    return this.timeRemaining;
  }
}

module.exports = Timer;