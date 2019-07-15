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
  const navTabs = () => navBarStubPropsFactory().navItems;

  afterEach(cleanup);

  describe("NavBar", () => {
    // +++ tab quantity +++
    it(`should have ${numTabs()} tabs`, () => {
      const { getAllByText } = render(<DefaultLayoutFactory />);
      expect(getAllByText(/^NavItem/).length).toBe(numTabs());
    });

    // +++ NavItem click response +++
    navTabs().forEach(({ label }, tabNum) => {
      describe(`For tab number ${tabNum}`, () => {
        it("should respond to a click", () => {
          const clickSpy = jest.fn();
          const { getByText } = render(
            <DefaultLayout
              navBarProps={navBarStubPropsFactory(undefined, clickSpy)}
              sideMenuButtonProps={sideMenuButtonStubPropsFactory()}
            />
          );
          fireEvent.click(getByText(label));
          expect(clickSpy.mock.calls.length).toBe(1);
        });
      });
    });

    describe("SideMenuButton", () => {
      it("should be clickable", () => {
        const clickSpy = jest.fn();
        const { getByTestId } = render(
          <DefaultLayout
            navBarProps={navBarStubPropsFactory()}
            sideMenuButtonProps={{
              ...sideMenuButtonStubPropsFactory(),
              openMenuHandler: clickSpy,
              openMenuTestId: "testid-side-menu-button"
            }}
          />
        );
        fireEvent.click(getByTestId("testid-side-menu-button"));
        expect(clickSpy.mock.calls.length).toBe(1);
      });
    });
  });
});

const DefaultLayoutFactory = () => (
  <DefaultLayout
    navBarProps={navBarStubPropsFactory()}
    sideMenuButtonProps={sideMenuButtonStubPropsFactory()}
  />
);
