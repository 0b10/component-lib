import React from "react";
import { Home } from "../../Home";
import { mount } from "enzyme";

describe("Unit Tests: Home (page)", () => {
  it("should render something, anything", () => {
    const wrapper = mount(<HomeFactory />);
    expect(wrapper.length).toBe(1);
  });

  describe.each`
    component
    ${"NavBar"}
    ${"SideMenuButton"}
    ${"SideMenu"}
  `("$component", ({ component }) => {
    it(`should render`, () => {
      const wrapper = mount(<HomeFactory />).find(component);
      // console.log(wrapper.debug());
      expect(wrapper.length).toBe(1);
    });
  });
});

// ! These tests don't need to pass props, as Pages are essentially "leaf" node in the dependency
// !  graph , and are initialised in the module
const HomeFactory = () => <Home />;
