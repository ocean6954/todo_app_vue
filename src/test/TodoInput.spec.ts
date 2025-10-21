// TodoInputコンポーネントのテスト
import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import TodoInput from "../components/TodoInput.vue";

describe("TodoInput", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(TodoInput);
  });

  // テスト1: コンポーネントが正しくレンダリングされることを確認
  it("正しくレンダリングされる", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("input").exists()).toBe(true);
    expect(wrapper.find("button").exists()).toBe(true);
    expect(wrapper.find("button").text()).toBe("Add");
  });

  // テスト2: 入力値が正しく管理されることを確認
  it("入力値が正しく管理される", async () => {
    const input = wrapper.find("input");

    // 入力フィールドに値を入力
    await input.setValue("新しいタスク");

    // 入力値が正しく反映されることを確認
    expect((input.element as HTMLInputElement).value).toBe("新しいタスク");
  });

  // テスト3: ボタンクリック時に正しいイベントが発火されることを確認
  it("ボタンクリック時にadd-todoイベントが発火される", async () => {
    const input = wrapper.find("input");
    const button = wrapper.find("button");

    // 入力値を設定
    await input.setValue("テストタスク");

    // ボタンをクリック
    await button.trigger("click");

    // add-todoイベントが発火されることを確認
    expect(wrapper.emitted("add-todo")).toBeTruthy();
    expect(wrapper.emitted("add-todo")[0]).toEqual(["テストタスク"]);

    // 送信後に入力フィールドがクリアされることを確認
    expect((input.element as HTMLInputElement).value).toBe("");
  });
});
