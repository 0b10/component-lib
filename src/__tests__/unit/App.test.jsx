import React from "react";
import App from "../../App";
import { mount } from "enzyme";
import {
  navBarStubPropsFactory,
  sideMenuButtonStubPropsFactory,
  postsStubPropsFactory
} from "../../components";

describe("Unit Tests: App", () => {
  it("should render something, anything", () => {
    const wrapper = mount(<AppFactory />);
    expect(wrapper.length).toBe(1);
  });

  const postsLength = () => postsStubPropsFactory().getPosts().length;

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
    sideMenuButtonProps={sideMenuButtonStubPropsFactory()}
    navBarProps={navBarStubPropsFactory()}
  />
);
