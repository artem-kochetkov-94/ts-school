interface IIterator<T> {
  current(): T | undefined;
  next(): T | undefined;
  prev(): T | undefined;
  index(): number;
}

type SortDirection = "ASC" | "DESC";

class Task {
  constructor(public id: number, public date: Date, public title: string) {}
}

class TaskList {
  private tasks: Task[] = [];

  public sortBy(key: keyof Task, direction: SortDirection = "ASC"): void {
    this.tasks = this.tasks.sort((a, b) => {
      if (direction === "ASC") {
        return a[key] < b[key] ? 1 : a[key] === b[key] ? 0 : -1;
      } else {
        return a[key] > b[key] ? 1 : a[key] === b[key] ? 0 : -1;
      }
    });
  }

  public addTask(task: Task) {
    this.tasks.push(task);
  }

  public getTasks() {
    return this.tasks;
  }

  public count() {
    return this.tasks.length;
  }
}

class TaskIterator implements IIterator<Task> {
  private position: number = 0;
  private taskList: TaskList;

  constructor(taskList: TaskList, key: keyof Task, direction?: SortDirection) {
    taskList.sortBy(key, direction);
    this.taskList = taskList;
  }

  public current(): Task | undefined {
    return this.taskList.getTasks()[this.position];
  }

  public next(): Task | undefined {
    if (this.position === this.taskList.getTasks().length - 1) {
      return this.taskList.getTasks()[this.position];
    }

    this.position += 1;
    return this.taskList.getTasks()[this.position];
  }

  public prev(): Task | undefined {
    if (this.position === 0) {
      return this.taskList.getTasks()[this.position];
    }

    this.position -= 1;
    return this.taskList.getTasks()[this.position];
  }

  index(): number {
    return this.position;
  }
}

const taskList = new TaskList();
taskList.addTask({ id: 3, date: new Date(), title: "3" });
taskList.addTask({ id: 2, date: new Date(), title: "2" });
taskList.addTask({ id: 1, date: new Date(), title: "1" });
const iteratorById = new TaskIterator(taskList, "id", "ASC");
const iteratorByDate = new TaskIterator(taskList, "date");

console.log(iteratorById.current());
console.log(iteratorById.next());
console.log(iteratorById.next());
console.log(iteratorById.next());
console.log(iteratorById.next());
console.log(iteratorById.next());
console.log(iteratorById.next());
console.log(iteratorById.next());
console.log(iteratorById.index());

export {};
