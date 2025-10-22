import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import SortButton from "../components/SortButton.vue";
import type { SortCriteria } from "../types/todo";

describe("SortButton", () => {
  describe("正常系", () => {
    describe("コンポーネントのレンダリング", () => {
      it("必要なDOM要素が表示される", () => {
        const wrapper = mount(SortButton, {
          props: { currentSort: "oldest" as SortCriteria },
        });
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find("select").exists()).toBe(true);
        expect(wrapper.find("label").text()).toBe("ソート:");
        expect(wrapper.findAll("option").length).toBe(3);
      });

      it("option要素に正しいラベルが表示される", () => {
        const wrapper = mount(SortButton, {
          props: { currentSort: "oldest" as SortCriteria },
        });
        const options = wrapper.findAll("option");
        expect(options[0]!.text()).toBe("古い順");
        expect(options[1]!.text()).toBe("新しい順");
        expect(options[2]!.text()).toBe("ランダム");
      });
    });

    describe("初期表示", () => {
      it("Propsで渡したoldestが初期値として設定される", () => {
        const wrapper = mount(SortButton, {
          props: { currentSort: "oldest" as SortCriteria },
        });
        const selectElement = wrapper.find("select")
          .element as HTMLSelectElement;
        expect(selectElement.value).toBe("oldest");
      });

      it("Propsで渡したnewestが初期値として設定される", () => {
        const wrapper = mount(SortButton, {
          props: { currentSort: "newest" as SortCriteria },
        });
        const selectElement = wrapper.find("select")
          .element as HTMLSelectElement;
        expect(selectElement.value).toBe("newest");
      });

      it("Propsで渡したrandomが初期値として設定される", () => {
        const wrapper = mount(SortButton, {
          props: { currentSort: "random" as SortCriteria },
        });
        const selectElement = wrapper.find("select")
          .element as HTMLSelectElement;
        expect(selectElement.value).toBe("random");
      });
    });

    describe("イベント発火", () => {
      it("select値をoldestからnewestに変更した時、change-sortイベントが発火される", async () => {
        const wrapper = mount(SortButton, {
          props: { currentSort: "oldest" as SortCriteria },
        });
        const select = wrapper.find("select");
        await select.setValue("newest");
        expect(wrapper.emitted("change-sort")).toBeTruthy();

        const emittedEvents = wrapper.emitted("change-sort");
        expect(emittedEvents![0]).toEqual(["newest"]);
      });

      it("select値をnewestからoldestに変更した時、change-sortイベントが発火される", async () => {
        const wrapper = mount(SortButton, {
          props: { currentSort: "newest" as SortCriteria },
        });
        const select = wrapper.find("select");
        await select.setValue("oldest");
        expect(wrapper.emitted("change-sort")).toBeTruthy();

        const emittedEvents = wrapper.emitted("change-sort");
        expect(emittedEvents![0]).toEqual(["oldest"]);
      });
    });
  });

  describe("異常系", () => {
    describe("不正な初期値", () => {
      it("SortCriteriaに存在しない値が渡された時、oldestとして扱われる", () => {
        const wrapper = mount(SortButton, {
          props: { currentSort: "invalid" as SortCriteria },
        });
        expect(wrapper.find("select").element.value).toBe("oldest");
      });
    });
  });
});
