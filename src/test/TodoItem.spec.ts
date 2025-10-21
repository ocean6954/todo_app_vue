// TodoItemコンポーネントのテスト
import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TodoItem from "../components/TodoItem.vue";
import {
  mockTodo,
  mockCompletedTodo,
  createTodoItemProps,
} from "../test/mocks/todoMocks";

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

    // チェックボックスがチェックされている
    const checkbox = wrapper.find("input[type='checkbox']");
    expect((checkbox.element as HTMLInputElement).checked).toBe(true);

    // 完了したタスクのテキストにcompleteクラスが適用されている
    const completeSpan = wrapper.find("span.complete");
    expect(completeSpan.exists()).toBe(true);
    expect(completeSpan.text()).toBe("完了済みタスク");

    // Editボタンが無効化されている
    const editButton = wrapper.find("button.edit-btn.disabled");
    expect(editButton.exists()).toBe(true);
    expect((editButton.element as HTMLButtonElement).disabled).toBe(true);
  });

  it("編集状態で正しくレンダリングされる", () => {
    const props = {
      todo: mockTodo,
      isEdit: true,
      isCompleted: false,
    };

    const wrapper = mount(TodoItem, { props });

    // 編集用input要素が存在することを確認
    const editInput = wrapper.find("input.edit-input");
    expect(editInput.exists()).toBe(true);

    // 編集用inputの初期値がtodoのtextと同じことを確認
    expect((editInput.element as HTMLInputElement).value).toBe("テストタスク");

    // Saveボタンが表示されることを確認
    const saveButton = wrapper.find("button.save-btn");
    expect(saveButton.exists()).toBe(true);
    expect(saveButton.text()).toBe("Save");

    // 通常のspan要素が非表示であることを確認
    expect(wrapper.find("span.normal").exists()).toBe(false);
    expect(wrapper.find("span.complete").exists()).toBe(false);
  });
});
