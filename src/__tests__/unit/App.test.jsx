import React from "react";
import App from "../../App";
import { mount } from "enzyme";
import { stubs } from "../../layouts";
import { stubs as postsStubs } from "../../components";

describe("Unit Tests: App", () => {
  it("should render something, anything", () => {
    const wrapper = mount(<AppFactory />);
    expect(wrapper.length).toBe(1);
  });

  const postsLength = () => postsStubs.posts.posts.getPosts().length;

  describe.each`
    component           | length
    ${"NavBar"}         | ${1}
    ${"SideMenuButton"} | ${1}
    ${"SideMenu"}       | ${1}
    ${"Post"}           | ${postsLength()}
    ${"Posts"}          | ${1}
  `("$component", ({ component, length }) => {
    it(`should be rendered ${length > 1 ? length + " times" : "once"}`, () => {
      const wrapper = mount(<AppFactory />).find(component);
      expect(wrapper.length).toBe(length);
    });
  });
});

const AppFactory = () => (
  <App
    sideMenuButtonProps={stubs.defaultLayout.sideMenuButtonProps}
    navBarProps={stubs.defaultLayout.navBarProps}
  />
);
