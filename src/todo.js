export class Todo {
  constructor(text, id = Date.now()) {
    this.id = id;
    this.text = text;
    this.completed = false;
  }

  toggle() {
    this.completed = !this.completed;
  }
}

export class TodoList {
  constructor() {
    this.items = [];
  }

  add(text) {
    const todo = new Todo(text);
    this.items.push(todo);
    return todo;
  }

  remove(id) {
    this.items = this.items.filter((item) => item.id !== id);
  }

  toggle(id) {
    const todo = this.items.find((item) => item.id === id);
    if (todo) todo.toggle();
  }

  getAll() {
    return this.items;
  }

  getActive() {
    return this.items.filter((item) => !item.completed);
  }

  getCompleted() {
    return this.items.filter((item) => item.completed);
  }
}
