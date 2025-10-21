import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import SortButton from "../components/SortButton.vue";
import type { SortCriteria } from "../types/todo";

describe("SortButton", () => {
  it("正しくレンダリングされる", () => {
    const wrapper = mount(SortButton, {
      props: { currentSort: "oldest" as SortCriteria },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find("select").exists()).toBe(true);
    expect(wrapper.find("label").text()).toBe("ソート:");
    expect(wrapper.findAll("option").length).toBe(3);
  });

  it("ソートがoldestの時", () => {
    const wrapper = mount(SortButton, {
      props: { currentSort: "oldest" as SortCriteria },
    });
    const selectElement = wrapper.find("select").element as HTMLSelectElement;
    expect(selectElement.value).toBe("oldest");
  });

  it("ソートがnewestの時", () => {
    const wrapper = mount(SortButton, {
      props: { currentSort: "newest" as SortCriteria },
    });
    const selectElement = wrapper.find("select").element as HTMLSelectElement;
    expect(selectElement.value).toBe("newest");
  });

  it("ソートがrandomの時", () => {
    const wrapper = mount(SortButton, {
      props: { currentSort: "random" as SortCriteria },
    });
    const selectElement = wrapper.find("select").element as HTMLSelectElement;
    expect(selectElement.value).toBe("random");
  });

  it("optionの表示文字をテストする", () => {
    const wrapper = mount(SortButton, {
      props: { currentSort: "oldest" as SortCriteria },
    });
    const options = wrapper.findAll("option");
    expect(options[0]!.text()).toBe("古い順");
    expect(options[1]!.text()).toBe("新しい順");
    expect(options[2]!.text()).toBe("ランダム");
  });
});

describe("イベントテスト", () => {
  it("oldest → newestへの変更", async () => {
    const wrapper = mount(SortButton, {
      props: { currentSort: "oldest" as SortCriteria },
    });
    const select = wrapper.find("select");
    await select.setValue("newest");
    expect(wrapper.emitted("change-sort")).toBeTruthy();

    const emittedEvents = wrapper.emitted("change-sort");
    expect(emittedEvents![0]).toEqual(["newest"]);
  });

  it("newest → oldestへの変更", async () => {
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
