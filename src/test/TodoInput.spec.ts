import { describe, it, expect, vi } from "vitest";
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

  //テスト4: 空文字のバリデーションが正しく反映される
  it("空文字のバリデーション", async () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    const wrapper = mount(TodoInput);
    const button = wrapper.find("button");
    await button.trigger("click");
    expect(wrapper.emitted("add-todo")).toBeFalsy();
    expect(alertMock).toHaveBeenCalledWith(
      "タスクは１文字以上で入力してください"
    );
    alertMock.mockRestore();
  });
});
