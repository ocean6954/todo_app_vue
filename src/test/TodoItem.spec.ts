import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TodoItem from "../components/TodoItem.vue";
import {
  mockTodo,
  mockCompletedTodo,
  createTodoItemProps,
} from "./mocks/todoMocks.ts";

describe("TodoItem", () => {
  // テスト1: 通常状態のTodoItemが正しくレンダリングされることを確認
  it("通常状態で正しくレンダリングされる", () => {
    const props = createTodoItemProps(mockTodo);
    const wrapper = mount(TodoItem, { props });

    // チェックボックスが存在し、チェックされていない
    const checkbox = wrapper.find("input[type='checkbox']");
    expect(checkbox.exists()).toBe(true);
    expect((checkbox.element as HTMLInputElement).checked).toBe(false);

    // タスクのテキストが表示されている
    expect(wrapper.text()).toContain("テストタスク");

    // Editボタンが表示されている
    const editButton = wrapper.find("button.edit-btn");
    expect(editButton.exists()).toBe(true);
    expect(editButton.text()).toBe("Edit");

    // Deleteボタンが表示されている
    const deleteButton = wrapper.find("button.delete-btn");
    expect(deleteButton.exists()).toBe(true);
    expect(deleteButton.text()).toBe("Delete");
  });

  // テスト2: 完了状態のTodoItemが正しくレンダリングされることを確認
  it("完了状態で正しくレンダリングされる", () => {
    const props = createTodoItemProps(mockCompletedTodo);
    const wrapper = mount(TodoItem, { props });

    const checkbox = wrapper.find("input[type='checkbox']");
    expect((checkbox.element as HTMLInputElement).checked).toBe(true);

    const completeSpan = wrapper.find("span.complete");
    expect(completeSpan.exists()).toBe(true);
    expect(completeSpan.text()).toBe("完了済みタスク");

    const editButton = wrapper.find("button.edit-btn.disabled");
    expect(editButton.exists()).toBe(true);
    expect((editButton.element as HTMLButtonElement).disabled).toBe(true);
  });

  // テスト3: 編集状態のTodoItemが正しくレンダリングされることを確認
  it("編集状態で正しくレンダリングされる", () => {
    const props = {
      todo: mockTodo,
      isEdit: true,
      isCompleted: false,
    };

    const wrapper = mount(TodoItem, { props });

    const editInput = wrapper.find("input.edit-input");
    expect(editInput.exists()).toBe(true);

    expect((editInput.element as HTMLInputElement).value).toBe("テストタスク");

    const saveButton = wrapper.find("button.save-btn");
    expect(saveButton.exists()).toBe(true);
    expect(saveButton.text()).toBe("Save");

    expect(wrapper.find("span.normal").exists()).toBe(false);
    expect(wrapper.find("span.complete").exists()).toBe(false);
  });

  // テスト4: Todo削除イベントが呼び出される
  it("Deleteボタンクリック時にremove-todoイベントが発火される", async () => {
    const props = createTodoItemProps(mockTodo);
    const wrapper = mount(TodoItem, { props });

    const deleteButton = wrapper.find("button.delete-btn");
    await deleteButton.trigger("click");

    expect(wrapper.emitted("remove-todo")).toBeTruthy();
    expect(wrapper.emitted("remove-todo")![0]).toEqual([mockTodo.id]);
  });

  // テスト5: Todo編集イベントが呼び出される
  it("Saveボタンクリック時にedit-todoイベントが発火される", async () => {
    const props = {
      todo: mockTodo,
      isEdit: true,
      isCompleted: false,
    };
    const wrapper = mount(TodoItem, { props });

    const editButton = wrapper.find("button.save-btn");
    await editButton.trigger("click");

    expect(wrapper.emitted("edit-todo")).toBeTruthy();
    expect(wrapper.emitted("edit-todo")![0]).toEqual([
      mockTodo.id,
      props.todo.text,
    ]);
  });

  // テスト6: チェックボックス変更時にイベントが呼び出される
  it("チェックボックス変更時にcomplete-todoイベントが発火される", async () => {
    const props = createTodoItemProps(mockTodo);
    const wrapper = mount(TodoItem, { props });

    const checkBox = wrapper.find("input[type='checkbox']");
    await checkBox.trigger("change");

    expect(wrapper.emitted("complete-todo")).toBeTruthy();
    expect(wrapper.emitted("complete-todo")![0]).toEqual([mockTodo.id]);
  });
});
