// 目覚まし時計クラス
export class AlarmClock {
  #state;
  // コンストラクタに状態を渡して初期化する（何も渡されなかったらnormalとする）
  constructor(state) {
    this.#state = state || "normal";
  }

  // アラーム設定イベント
  setAlarm() {
    switch (this.#state) {
      case "normal":
        this.#state = "alarmSet";
        return "none";
      default:
        return "none";
    }
  }

  // アラーム解除イベント
  cancelAlarm() {
    switch (this.#state) {
      case "alarmSet":
        this.#state = "normal";
        return "none";
      case "alarmSounding":
        this.#state = "normal";
        return "stopAlarm";
      case "snoozing":
        this.#state = "normal";
        return "none";
      default:
        return "none";
    }
  }

  // アラーム設定時刻到達イベント
  reachedToAlarmTime() {
    switch (this.#state) {
      case "alarmSet":
        this.#state = "alarmSounding";
        return "soundAlarm";
      default:
        return "none";
    }
  }

  // スヌーズイベント
  snooze() {
    switch (this.#state) {
      case "alarmSounding":
        this.#state = "snoozing";
        return "stopAlarm";
      default:
        return "none";
    }
  }

  // スヌーズ設定時間経過イベント
  elapseSnoozeTime() {
    switch (this.#state) {
      case "snoozing":
        this.#state = "alarmSounding";
        return "soundAlarm";
      default:
        return "none";
    }
  }
}
