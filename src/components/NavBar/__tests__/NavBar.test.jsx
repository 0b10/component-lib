import React from "react";
import { mount } from "enzyme";
// 3rd party
import { Tab } from "@material-ui/core";
// Local
import { NavBar } from "../NavBar";

describe("NavBar...", () => {
  const mockNavItems = Object.freeze([
    { label: "Label One", uri: "/label/one" },
    { label: "Label Two", uri: "/label/two" },
    { label: "Label Two", uri: "/label/two" }
  ]);

  const handleNavItemClick = () => null;

  // >>> NAV ITEM >>>
  describe("navigational items...", () => {
    let nullHandlers = null;
    beforeEach(() => {
      nullHandlers = {
        handleNavItemClick
      };
    });

    // ~~~ Nav item render ~~~
    describe("render...", () => {
      // +++ check breakpoints +++
      [
        { width: "xl", numItems: mockNavItems.length },
        { width: "lg", numItems: mockNavItems.length },
        { width: "md", numItems: mockNavItems.length },
        { width: "sm", numItems: mockNavItems.length },
        { width: "xs", numItems: 0 }
      ].forEach(({ width, numItems }) => {
        it(`should render ${numItems} items for widths <= "${width}"`, () => {
          const wrappers = mount(
            <NavBar
              navItems={mockNavItems}
              {...nullHandlers}
              width={width}
              menuButton={<button />}
            />
          ).find(Tab);
          expect(wrappers.length).toBe(numItems);
        });
      });

      it("should have a state.highlightedTab that reflects the tab clicked", () => {
        const navBar = mount(
          <NavBar
            navItems={mockNavItems}
            {...nullHandlers}
            width="xl"
            menuButton={<button />}
          />
        );
        const tabs = navBar.find(Tab);

        tabs.forEach((tab, index) => {
          tab.simulate("click");
          expect(navBar.state("highlightedTab")).toBe(index);
        });
      });
    });

    // ~~~ Nav Item: Event handlers ~~~
    describe("event handlers", () => {
      // +++ check handler is called +++
      it("should call the relevant event handler when clicked", () => {
        const handlerSpy = jest.fn();
        const wrappers = mount(
          <NavBar
            navItems={mockNavItems}
            handleNavItemClick={handlerSpy}
            width="xl"
            menuButton={<button />}
          />
        ).find(Tab);
        wrappers.forEach(wrapper => {
          wrapper.simulate("click");
        });
        expect(handlerSpy.mock.calls.length).toBe(mockNavItems.length); // each button clicked once
      });

      // +++ check args passed to handler
      it("should call the relevant event handler with the correct arg", () => {
        const handlerSpy = jest.fn();
        const wrappers = mount(
          <NavBar
            navItems={mockNavItems}
            handleNavItemClick={handlerSpy}
            width="xl"
            menuButton={<button />}
          />
        ).find(Tab);

        const firstWrapper = wrappers.at(0);
        firstWrapper.simulate("click");
        expect(handlerSpy.mock.calls[0][0]).toBe(mockNavItems[0].uri);
      });
    });

    // +++ side menu button +++
    it("should render the side menu button", () => {
      const wrapper = mount(
        <NavBar
          navItems={mockNavItems}
          handleNavItemClick={() => null}
          width="xl"
          menuButton={<button id="test-id-eusjey" />}
        />
      ).find("#test-id-eusjey");

      expect(wrapper.length).toBe(1);
    });

    // >>> SNAPSHOT >>>
    it("should render the side menu button", () => {
      const wrapper = mount(
        <NavBar
          navItems={mockNavItems}
          handleNavItemClick={() => null}
          width="xl"
          menuButton={<button id="test-id-eusjey" />}
        />
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
