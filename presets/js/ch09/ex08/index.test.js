import { AlarmClock } from "./index.js";

describe("引数なし", () => {
  it("setAlarm", () => {
    const normal = new AlarmClock();
    expect(normal.setAlarm()).toBe("none");
  });
  it("cancelAlarm", () => {
    const normal = new AlarmClock();
    expect(normal.cancelAlarm()).toBe("none");
  });
  it("reachedToAlarmTime", () => {
    const normal = new AlarmClock();
    expect(normal.reachedToAlarmTime()).toBe("none");
  });
  it("snooze", () => {
    const normal = new AlarmClock();
    expect(normal.snooze()).toBe("none");
  });
  it("elapseSnoozeTime", () => {
    const normal = new AlarmClock();
    expect(normal.elapseSnoozeTime()).toBe("none");
  });
});

describe("通常", () => {
  it("setAlarm", () => {
    const normal = new AlarmClock("normal");
    expect(normal.setAlarm()).toBe("none");
  });
  it("cancelAlarm", () => {
    const normal = new AlarmClock("normal");
    expect(normal.cancelAlarm()).toBe("none");
  });
  it("reachedToAlarmTime", () => {
    const normal = new AlarmClock("normal");
    expect(normal.reachedToAlarmTime()).toBe("none");
  });
  it("snooze", () => {
    const normal = new AlarmClock("normal");
    expect(normal.snooze()).toBe("none");
  });
  it("elapseSnoozeTime", () => {
    const normal = new AlarmClock("normal");
    expect(normal.elapseSnoozeTime()).toBe("none");
  });
});

describe("アラームセット中", () => {
  it("setAlarm", () => {
    const alarmSet = new AlarmClock("alarmSet");
    expect(alarmSet.setAlarm()).toBe("none");
  });
  it("cancelAlarm", () => {
    const alarmSet = new AlarmClock("alarmSet");
    expect(alarmSet.cancelAlarm()).toBe("none");
  });
  it("reachedToAlarmTime", () => {
    const alarmSet = new AlarmClock("alarmSet");
    expect(alarmSet.reachedToAlarmTime()).toBe("soundAlarm");
  });
  it("snooze", () => {
    const alarmSet = new AlarmClock("alarmSet");
    expect(alarmSet.snooze()).toBe("none");
  });
  it("elapseSnoozeTime", () => {
    const alarmSet = new AlarmClock("alarmSet");
    expect(alarmSet.elapseSnoozeTime()).toBe("none");
  });
});

describe("アラーム鳴動中", () => {
  it("setAlarm", () => {
    const alarmSounding = new AlarmClock("alarmSounding");
    expect(alarmSounding.setAlarm()).toBe("none");
  });
  it("cancelAlarm", () => {
    const alarmSounding = new AlarmClock("alarmSounding");
    expect(alarmSounding.cancelAlarm()).toBe("stopAlarm");
  });
  it("reachedToAlarmTime", () => {
    const alarmSounding = new AlarmClock("alarmSounding");
    expect(alarmSounding.reachedToAlarmTime()).toBe("none");
  });
  it("snooze", () => {
    const alarmSounding = new AlarmClock("alarmSounding");
    expect(alarmSounding.snooze()).toBe("stopAlarm");
  });
  it("elapseSnoozeTime", () => {
    const alarmSounding = new AlarmClock("alarmSounding");
    expect(alarmSounding.elapseSnoozeTime()).toBe("none");
  });
});

describe("スヌーズ中", () => {
  it("setAlarm", () => {
    const snoozing = new AlarmClock("snoozing");
    expect(snoozing.setAlarm()).toBe("none");
  });
  it("cancelAlarm", () => {
    const snoozing = new AlarmClock("snoozing");
    expect(snoozing.cancelAlarm()).toBe("none");
  });
  it("reachedToAlarmTime", () => {
    const snoozing = new AlarmClock("snoozing");
    expect(snoozing.reachedToAlarmTime()).toBe("none");
  });
  it("snooze", () => {
    const snoozing = new AlarmClock("snoozing");
    expect(snoozing.snooze()).toBe("none");
  });
  it("elapseSnoozeTime", () => {
    const snoozing = new AlarmClock("snoozing");
    expect(snoozing.elapseSnoozeTime()).toBe("soundAlarm");
  });
});
