import { describe, it, expect, beforeEach } from "vitest";
import { Todo, TodoList } from "./todo.js";

describe("Todo", () => {
  it("should create a todo with text", () => {
    const todo = new Todo("Buy milk");
    expect(todo.text).toBe("Buy milk");
    expect(todo.completed).toBe(false);
  });

  it("should toggle completion status", () => {
    const todo = new Todo("Buy milk");
    todo.toggle();
    expect(todo.completed).toBe(true);
    todo.toggle();
    expect(todo.completed).toBe(false);
  });
});

describe("TodoList", () => {
  let list;

  beforeEach(() => {
    list = new TodoList();
  });

  it("should start empty", () => {
    expect(list.items.length).toBe(0);
  });

  it("should add a todo", () => {
    list.add("Buy milk");
    expect(list.items.length).toBe(1);
    expect(list.items[0].text).toBe("Buy milk");
  });

  it("should remove a todo", () => {
    const todo = list.add("Buy milk");
    list.remove(todo.id);
    expect(list.items.length).toBe(0);
  });

  it("should toggle a todo", () => {
    const todo = list.add("Buy milk");
    list.toggle(todo.id);
    expect(todo.completed).toBe(true);
  });

  it("should filter active todos", () => {
    list.add("Buy milk");
    const todo2 = list.add("Walk dog");
    list.toggle(todo2.id);

    const active = list.getActive();
    expect(active.length).toBe(1);
    expect(active[0].text).toBe("Buy milk");
  });

  it("should filter completed todos", () => {
    const todo1 = list.add("Buy milk");
    list.add("Walk dog");
    list.toggle(todo1.id);

    const completed = list.getCompleted();
    expect(completed.length).toBe(1);
    expect(completed[0].text).toBe("Buy milk");
  });
});
