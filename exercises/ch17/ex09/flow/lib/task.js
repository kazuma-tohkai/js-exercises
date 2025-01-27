function isUserObject(obj) {
  return typeof obj === "object" && typeof obj["id"] === "number" && typeof obj["name"] === "string";
}
export class TaskManager {
  _tasks = [];
  add(task) {
    this._tasks.push(task);
  }
  completeTask(target) {
    if (isUserObject(target)) {
      this._tasks.filter(t => t.user === target).forEach(t => t.completed = true);
    } else {
      this._tasks.filter(t => t.title === target).forEach(t => t.completed = true);
    }
  }
  getTasks(predicate) {
    if (predicate === undefined) {
      return this._tasks;
    } else {
      return this._tasks.filter(predicate);
    }
  }
}
export function isLowOrCompletedTask(priorityTask) {
  return priorityTask.priority === "low" || priorityTask.completed;
}
export function not(f) {
  return arg => !f(arg);
}