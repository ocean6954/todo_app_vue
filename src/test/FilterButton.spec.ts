import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import type { FilterCriteria } from "../types/todo.ts";
import FilterButton from "../components/FilterButton.vue";

describe("FilterButton", () => {
  // テスト1: コンポーネントが正しくレンダリングされることを確認
  it("正しくレンダリングされる", () => {
    const wrapper = mount(FilterButton, {
      props: { currentFilter: "all" as FilterCriteria },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("label").exists()).toBe(true);
    expect(wrapper.find("label").text()).toBe("表示フィルター:");
    expect(wrapper.find("select").exists()).toBe(true);
    expect(wrapper.findAll("option").length).toBe(3); // 3つのオプションがあることを確認
  });

  // テスト2: 初期選択値が正しいことを確認
  it("初期選択値が正しい", () => {
    const wrapper = mount(FilterButton, {
      props: { currentFilter: "all" as FilterCriteria },
    });
    expect(wrapper.find("select").element.value).toBe("all");
  });

  // テスト３ プロパティテスト
  it("フィルターがactiveの時", () => {
    const wrapper = mount(FilterButton, {
      props: { currentFilter: "active" as FilterCriteria },
    });
    const selectElement = wrapper.find("select").element as HTMLSelectElement;
    expect(selectElement.value).toBe("active");
  });

  it("フィルターがallの時", () => {
    const wrapper = mount(FilterButton, {
      props: { currentFilter: "all" as FilterCriteria },
    });
    const selectElement = wrapper.find("select").element as HTMLSelectElement;
    expect(selectElement.value).toBe("all");
  });

  it("フィルターがcompletedの時", () => {
    const wrapper = mount(FilterButton, {
      props: { currentFilter: "completed" as FilterCriteria },
    });
    const selectElement = wrapper.find("select").element as HTMLSelectElement;
    expect(selectElement.value).toBe("completed");
  });

  it("option要素の表示文字をテストする", () => {
    const wrapper = mount(FilterButton, {
      props: { currentFilter: "all" as FilterCriteria },
    });
    const options = wrapper.findAll("option");
    expect(options[0]?.text()).toBe("全て");
    expect(options[1]?.text()).toBe("未完了");
    expect(options[2]?.text()).toBe("完了済み");
  });

  it("select値変更時にchange-filterイベントが発火される", async () => {
    const wrapper = mount(FilterButton, {
      props: { currentFilter: "all" as FilterCriteria },
    });
    const select = wrapper.find("select");

    await select.setValue("active");

    expect(wrapper.emitted("change-filter")).toBeTruthy();

    const emittedEvents = wrapper.emitted("change-filter");
    expect(emittedEvents![0]).toEqual(["active"]);
  });
});

describe("イベントテスト - 複数パターン", () => {
  it("allからcompletedに変更", async () => {
    const wrapper = mount(FilterButton, {
      props: { currentFilter: "all" as FilterCriteria },
    });

    const select = wrapper.find("select");
    await select.setValue("completed");

    expect(wrapper.emitted("change-filter")).toBeTruthy();

    const emittedEvents = wrapper.emitted("change-filter");
    expect(emittedEvents![0]).toEqual(["completed"]);
  });

  it("activeからcompletedに変更", async () => {
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
