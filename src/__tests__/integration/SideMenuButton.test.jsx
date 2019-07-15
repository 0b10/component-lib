import React from "react";
// 3rd party
import { cleanup, fireEvent, render } from "@testing-library/react";
// Local
import { DefaultLayout } from "../../layouts";
import { navBarStubPropsFactory } from "../../components";
import { sideMenuButtonStubPropsFactory } from "../../components";

describe("Integration Tests: App", () => {
  afterEach(cleanup);

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
