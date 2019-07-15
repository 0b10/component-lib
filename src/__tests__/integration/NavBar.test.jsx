import React from "react";
// 3rd party
import { mount } from "enzyme";
// Local
import { DefaultLayout } from "../../layouts";
import { navBarStubPropsFactory } from "../../components";
import { sideMenuButtonStubPropsFactory } from "../../components";

describe("Integration Tests: App", () => {
  describe("NavBar", () => {
    it("should pass", () => {
      const wrapper = mount(<DefaultLayoutFactory />);
      expect(true).toBe(true);
    });
  });
});

const DefaultLayoutFactory = () => (
  <DefaultLayout
    navBarProps={navBarStubPropsFactory()}
    sideMenuButtonProps={sideMenuButtonStubPropsFactory()}
  />
);
