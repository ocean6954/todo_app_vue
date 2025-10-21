import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import Component from "../App.vue";

describe("App.vue", () => {
  it("コンポーネントが正しくレンダリングされる", () => {
    const wrapper = mount(Component);
    expect(wrapper.exists()).toBe(true);
  });

  it("h1要素が正しく表示される", () => {
    const wrapper = mount(Component);
    expect(wrapper.find("h1").text()).toBe("Todo App");
  });

  it("子コンポーネントが正しく表示される", () => {
    const wrapper = mount(Component);
    expect(wrapper.findComponent({ name: "TodoInput" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "TodoList" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "FilterButton" }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: "SortButton" }).exists()).toBe(true);
  });
});
