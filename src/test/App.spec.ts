import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Component from "../App.vue";

describe("App.vue", () => {
  it("コンポーネントがDOM上に存在する", () => {
    const wrapper = mount(Component);
    expect(wrapper.exists()).toBe(true);
  });

  it("h1要素に'Todo App'というテキストが表示される", () => {
    const wrapper = mount(Component);
    expect(wrapper.find("h1").text()).toBe("Todo App");
  });

  it("必要な子コンポーネント（TodoInput、TodoList、FilterButton、SortButton）がすべて存在する", () => {
    const wrapper = mount(Component);
    expect(wrapper.findComponent({ name: "TodoInput" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "TodoList" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "FilterButton" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "SortButton" }).exists()).toBe(true);
  });
});
