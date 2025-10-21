import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import TodoInput from "../components/TodoInput.vue";

describe("TodoInput", () => {
  // テスト1: コンポーネントが正しくレンダリングされることを確認
  it("正しくレンダリングされる", () => {
    const wrapper = mount(TodoInput);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("input").exists()).toBe(true);
    expect(wrapper.find("button").exists()).toBe(true);
    expect(wrapper.find("button").text()).toBe("Add");
  });

  // テスト2: 入力値が正しく管理されることを確認
  it("入力値が正しく管理される", async () => {
    const wrapper = mount(TodoInput);
    const input = wrapper.find("input");

    await input.setValue("新しいタスク");

    expect((input.element as HTMLInputElement).value).toBe("新しいタスク");
  });

  // テスト3: ボタンクリック時に正しいイベントが発火されることを確認
  it("ボタンクリック時にadd-todoイベントが発火される", async () => {
    const wrapper = mount(TodoInput);
    const input = wrapper.find("input");
    const button = wrapper.find("button");

    await input.setValue("テストタスク");
    await button.trigger("click");

    expect(wrapper.emitted("add-todo")).toBeTruthy();
    expect(wrapper.emitted("add-todo")![0]).toEqual(["テストタスク"]);

    expect((input.element as HTMLInputElement).value).toBe("");
  });
});
