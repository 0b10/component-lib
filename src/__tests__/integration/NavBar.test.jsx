import React from "react";
// 3rd party
import { mount } from "enzyme";
import { cleanup, fireEvent, render } from "@testing-library/react";
// Local
import { DefaultLayout } from "../../layouts";
import { navBarStubPropsFactory } from "../../components";
import { sideMenuButtonStubPropsFactory } from "../../components";

describe("Integration Tests: App/NavBar", () => {
  const numTabs = () => navBarStubPropsFactory().navItems.length;

  afterEach(cleanup);

  describe("NavBar", () => {
    it(`should have ${numTabs()} tabs`, () => {
      const { getAllByText } = render(<DefaultLayoutFactory />);
      expect(getAllByText(/^NavItem/).length).toBe(numTabs());
    });
  });
});

const DefaultLayoutFactory = () => (
  <DefaultLayout
    navBarProps={navBarStubPropsFactory()}
    sideMenuButtonProps={sideMenuButtonStubPropsFactory()}
  />
);
