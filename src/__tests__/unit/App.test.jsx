import React from "react";
import App from "../../App";
import { mount } from "enzyme";
import { stubs } from "../../layouts";

describe("Unit Tests: App", () => {
  it("should render something, anything", () => {
    const wrapper = mount(<AppFactory />);
    expect(wrapper.length).toBe(1);
  });

  // describe.each`
  //   component
  //   ${"NavBar"}
  //   ${"SideMenuButton"}
  //   ${"SideMenu"}
  // `("$component", ({ component }) => {
  //   it(`should render`, () => {
  //     const wrapper = mount(<HomeFactory />).find(component);
  //     // console.log(wrapper.debug());
  //     expect(wrapper.length).toBe(1);
  //   });
  // });
});

const AppFactory = () => (
  <App
    sideMenuButtonProps={stubs.defaultLayout.sideMenuButtonProps}
    navBarProps={stubs.defaultLayout.navBarProps}
  />
);
