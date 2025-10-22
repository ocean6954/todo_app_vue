import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import type { FilterCriteria } from "../types/todo.ts";
import FilterButton from "../components/FilterButton.vue";

describe("FilterButton", () => {
  describe("正常系", () => {
    describe("コンポーネントのレンダリング", () => {
      it("必要なDOM要素が表示される", () => {
        const wrapper = mount(FilterButton, {
          props: { currentFilter: "all" as FilterCriteria },
        });
        expect(wrapper.exists()).toBe(true);
        expect(wrapper.find("label").exists()).toBe(true);
        expect(wrapper.find("label").text()).toBe("表示フィルター:");
        expect(wrapper.find("select").exists()).toBe(true);
        expect(wrapper.findAll("option").length).toBe(3);
      });

      it("option要素に予め設定してあるラベルが表示される", () => {
        const wrapper = mount(FilterButton, {
          props: { currentFilter: "all" as FilterCriteria },
        });
        const options = wrapper.findAll("option");
        expect(options[0]?.text()).toBe("全て");
        expect(options[1]?.text()).toBe("未完了");
        expect(options[2]?.text()).toBe("完了済み");
      });
    });

    describe("初期表示", () => {
      it("Propsで渡したallが初期値として設定される", () => {
        const wrapper = mount(FilterButton, {
          props: { currentFilter: "all" as FilterCriteria },
        });
        expect(wrapper.find("select").element.value).toBe("all");
      });

      it("Propsで渡したactiveが初期値として設定される", () => {
        const wrapper = mount(FilterButton, {
          props: { currentFilter: "active" as FilterCriteria },
        });
        const selectElement = wrapper.find("select")
          .element as HTMLSelectElement;
        expect(selectElement.value).toBe("active");
      });

      it("Propsで渡したcompletedが初期値として設定される", () => {
        const wrapper = mount(FilterButton, {
          props: { currentFilter: "completed" as FilterCriteria },
        });
        const selectElement = wrapper.find("select")
          .element as HTMLSelectElement;
        expect(selectElement.value).toBe("completed");
      });
    });

    describe("イベント発火", () => {
      it("select値をallからactiveに変更した時、change-filterイベントが発火される", async () => {
        const wrapper = mount(FilterButton, {
          props: { currentFilter: "all" as FilterCriteria },
        });
        const select = wrapper.find("select");

        await select.setValue("active");

        expect(wrapper.emitted("change-filter")).toBeTruthy();

        const emittedEvents = wrapper.emitted("change-filter");
        expect(emittedEvents![0]).toEqual(["active"]);
      });

      it("select値をallからcompletedに変更した時、change-filterイベントが発火される", async () => {
        const wrapper = mount(FilterButton, {
          props: { currentFilter: "all" as FilterCriteria },
        });

        const select = wrapper.find("select");
        await select.setValue("completed");

        expect(wrapper.emitted("change-filter")).toBeTruthy();

        const emittedEvents = wrapper.emitted("change-filter");
        expect(emittedEvents![0]).toEqual(["completed"]);
      });

      it("select値をactiveからcompletedに変更した時、change-filterイベントが発火される", async () => {
        const wrapper = mount(FilterButton, {
          props: { currentFilter: "active" as FilterCriteria },
        });

        const select = wrapper.find("select");
        await select.setValue("completed");

        expect(wrapper.emitted("change-filter")).toBeTruthy();

        const emittedEvents = wrapper.emitted("change-filter");
        expect(emittedEvents![0]).toEqual(["completed"]);
      });
    });
  });

  describe("異常系", () => {
    describe("不正な初期値", () => {
      it("FilterCriteriaに存在しない値が渡された時、allとして扱われる", () => {
        const wrapper = mount(FilterButton, {
          props: { currentFilter: "invalid" as FilterCriteria },
        });
        expect(wrapper.find("select").element.value).toBe("all");1
      });
    });
  });
});
