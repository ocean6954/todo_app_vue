import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { mockTodoList, mockEmptyTodoList } from "./mocks/todoMocks.ts";
import TodoList from "../components/TodoList.vue";
import TodoItem from "../components/TodoItem.vue";

describe("TodoList", () => {
  // テスト1: コンポーネントが正しくレンダリングされることを確認
  it("正しくレンダリングされる", () => {
    const wrapper = mount(TodoList, {
      props: { todos: mockTodoList },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("ul").exists()).toBe(true);
  });

  // テスト2: todosの数だけTodoItemがレンダリングされる
  it("todosの数だけTodoItemコンポーネントがレンダリングされる", () => {
    const wrapper = mount(TodoList, {
      props: { todos: mockTodoList },
    });
    const todoItems = wrapper.findAllComponents(TodoItem);
    expect(todoItems.length).toBe(mockTodoList.length);
  });

  // テスト3: 空のリストでも正しくレンダリングされる
  it("空のtodosリストでも正しくレンダリングされる", () => {
    const wrapper = mount(TodoList, {
      props: { todos: mockEmptyTodoList },
    });
    expect(wrapper.exists()).toBe(true);
    const todoItems = wrapper.findAllComponents(TodoItem);
    expect(todoItems.length).toBe(0);
  });

  //テスト4: TodoItemの削除
  it("remove-todoイベントが正しく中継される", async () => {
    const targetIndex = Math.floor(Math.random() * mockTodoList.length);
    const wrapper = mount(TodoList, {
      props: { todos: mockTodoList },
    });
    const todoItems = wrapper.findAllComponents(TodoItem);
    const targetTodoItem = todoItems[targetIndex];

    await targetTodoItem?.vm.$emit(
      "remove-todo",
      mockTodoList[targetIndex]!.id
    );
    expect(wrapper.emitted("remove-todo")).toBeTruthy();
    expect(wrapper.emitted("remove-todo")![0]).toEqual([
      mockTodoList[targetIndex]!.id,
    ]);
  });

  //テスト5: TodoItemの編集
  it("edit-todoイベントが正しく中継される", async () => {
    const targetIndex = Math.floor(Math.random() * mockTodoList.length);
    const wrapper = mount(TodoList, {
      props: { todos: mockTodoList },
    });
    const todoItems = wrapper.findAllComponents(TodoItem);
    const targetTodoItem = todoItems[targetIndex];
    const randomString = Math.random().toString(36).slice(2, 12);

    await targetTodoItem?.vm.$emit(
      "edit-todo",
      mockTodoList[targetIndex]!.id,
      randomString
    );
    expect(wrapper.emitted("edit-todo")).toBeTruthy();
    expect(wrapper.emitted("edit-todo")![0]).toEqual([
      mockTodoList[targetIndex]!.id,
      randomString,
    ]);
  });

  //テスト6: TodoItemの完了
  it("complete-todoイベントが正しく中継される", async () => {
    const targetIndex = Math.floor(Math.random() * mockTodoList.length);
    const wrapper = mount(TodoList, {
      props: { todos: mockTodoList },
    });
    const todoItems = wrapper.findAllComponents(TodoItem);
    const targetTodoItem = todoItems[targetIndex];

    await targetTodoItem?.vm.$emit(
      "complete-todo",
      mockTodoList[targetIndex]!.id
    );
    expect(wrapper.emitted("complete-todo")).toBeTruthy();
    expect(wrapper.emitted("complete-todo")![0]).toEqual([
      mockTodoList[targetIndex]!.id,
    ]);
  });
});
