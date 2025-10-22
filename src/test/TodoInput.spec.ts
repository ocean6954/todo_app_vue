import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import TodoInput from "../components/TodoInput.vue";

describe("TodoInput", () => {
  describe("正常系", () => {
    describe("コンポーネントのレンダリング", () => {
      it("必要なDOM要素が表示される", () => {
        const wrapper = mount(TodoInput);
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find("input").exists()).toBe(true);
        expect(wrapper.find("button").exists()).toBe(true);
        expect(wrapper.find("button").text()).toBe("Add");
      });
    });

    describe("入力値の管理", () => {
      it("input要素に入力した値が反映される", async () => {
        const wrapper = mount(TodoInput);
        const input = wrapper.find("input");

        await input.setValue("新しいタスク");

        expect((input.element as HTMLInputElement).value).toBe("新しいタスク");
      });
    });

    describe("イベント発火", () => {
      it("ボタンクリック時にadd-todoイベントが発火され、入力欄がクリアされる", async () => {
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
  });

  describe("異常系", () => {
    describe("空文字入力時のバリデーション", () => {
      it("空文字でボタンクリック時、アラートが表示されadd-todoイベントが発火されない", async () => {
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
  });
});
