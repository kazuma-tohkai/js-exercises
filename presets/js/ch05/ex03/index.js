export function isHolidayWithIfElse(dayOfWeek) {
  if (dayOfWeek === "土" || dayOfWeek === "日") {
    return true;
  } else {
    return false;
  }
}
export function isHolidayWithSwitch(dayOfWeek) {
  switch (dayOfWeek) {
    case "土":
    case "日":
      return true;
    default:
      return false;
  }
}
