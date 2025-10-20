// SortButtonコンポーネントのテスト
import SortButton from "../src/components/SortButton.vue";

import { mount } from "@vue/test-utils";
import { beforeEach, describe, it, expect } from "vitest";
import { SortCriteria } from "../src/types/todo";

describe("SortButton", () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(SortButton, {
      props: { currentSort: "oldest" as SortCriteria },
    });
  });

  it("正しくレンダリングされる", () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("select").exists()).toBe(true);
    expect(wrapper.find("label").text()).toBe("ソート:");
    expect(wrapper.findAll("option").length).toBe(3);
  });

  it("ソートがoldestの時", () => {
    const selectElement = wrapper.find("select").element as HTMLSelectElement;
    expect(selectElement.value).toBe("oldest");
  });

  it("ソートがnewestの時", () => {
    wrapper = mount(SortButton, {
      props: { currentSort: "newest" as SortCriteria },
    });
    const selectElement = wrapper.find("select").element as HTMLSelectElement;
    expect(selectElement.value).toBe("newest");
  });

  it("ソートがrandomの時", () => {
    wrapper = mount(SortButton, {
      props: { currentSort: "random" as SortCriteria },
    });
    const selectElement = wrapper.find("select").element as HTMLSelectElement;
    expect(selectElement.value).toBe("random");
  });

  it("optionの表示文字をテストする", () => {
    const options = wrapper.findAll("option");
    expect(options[0].text()).toBe("古い順");
    expect(options[1].text()).toBe("新しい順");
    expect(options[2].text()).toBe("ランダム");
  });
});

describe("イベントテスト - 複数パターン", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = mount(SortButton, {
      props: { currentSort: "oldest" as SortCriteria },
    });
  });

  it("oldest → newestへの変更", async () => {
    const select = wrapper.find("select");
    await select.setValue("newest");
    expect(wrapper.emitted("change-sort")).toBeTruthy();

    const emittedEvents = wrapper.emitted("change-sort");
    expect(emittedEvents![0]).toEqual(["newest"]);
  });

  it("newest → oldestへの変更", async () => {
    wrapper = mount(SortButton, {
      props: { currentSort: "newest" as SortCriteria },
    });
    const select = wrapper.find("select");
    await select.setValue("oldest");
    expect(wrapper.emitted("change-sort")).toBeTruthy();

    const emittedEvents = wrapper.emitted("change-sort");
    expect(emittedEvents![0]).toEqual(["oldest"]);
  });
});
