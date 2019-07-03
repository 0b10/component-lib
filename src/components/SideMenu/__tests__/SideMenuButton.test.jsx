import React from "react";
import { mount, shallow } from "enzyme";
// 3rd party
import { IconButton } from "@material-ui/core";
// Local
import { SideMenu, SideMenuButton } from "../SideMenu";
import * as helpers from "./__helpers__/menu";

describe("Package: SideMenu", () => {
  describe("Component: SideMenuButton", () => {
    let mockPropsCopy;

    beforeEach(() => {
      mockPropsCopy = helpers.mockProps();
      // Remove unused props, these properties represent the state that this component manages
      // all other props are passed through. Hence the imprefect reuse.
      mockPropsCopy.open = undefined;
      mockPropsCopy.closeMenu = undefined;
    });

    // >>> RENDER >>>
    it("should render", () => {
      const wrapper = shallow(<SideMenuButton {...mockPropsCopy} />);
      expect(wrapper.length).toBe(1);
    });

    // >>> INTERACTION >>>
    // +++ initial state +++
    it("should initially have a 'closed' state", () => {
      const wrapper = mount(
        <SideMenuButton {...mockPropsCopy} isAuthed={() => true} />
      );

      // Button
      expect(wrapper.state("open")).toBe(false);
      const child = wrapper.find(SideMenu);

      // Menu
      expect(child.prop("open")).toBe(false);
    });

    // +++ opens menu +++
    it("should open the SideMenu when clicked", () => {
      const wrapper = mount(
        <SideMenuButton {...mockPropsCopy} isAuthed={() => true} />
      );

      wrapper.find(IconButton).simulate("click");

      // ! Wrappers are imutable in enzyme v3+, and you need to refind it to check state
      const child = wrapper.find(SideMenu);

      expect(child.prop("open")).toBe(true);
    });

    // +++ menu closed +++
    it("should go into a 'closed' state when the menu is closed", () => {
      const wrapper = mount(
        <SideMenuButton {...mockPropsCopy} isAuthed={() => true} />
      );

      // Setup
      const openedButton = wrapper
        .find(SideMenuButton)
        .setState({ open: true });
      const openedMenu = wrapper.find(SideMenu);

      // Be defensive - check is open
      expect(openedButton.state("open")).toBe(true);
      expect(openedMenu.prop("open")).toBe(true);

      // Make closed
      openedMenu.props().closeMenu();
      const closedButton = wrapper.find(SideMenuButton);

      // Now test
      expect(closedButton.state("open")).toBe(false);
    });

    // >>> SNAPSHOT >>>
    describe.each`
      open     | status
      ${true}  | ${"opened"}
      ${false} | ${"closed"}
    `("when menu is $status", ({ open }) => {
      it("should match snapshot", () => {
        // There's no real difference in rendering between opened and closed, but test in case.
        const wrapper = mount(
          <SideMenuButton {...mockPropsCopy} isAuthed={() => true} />
        )
          .find(SideMenuButton)
          .setState({ open });

        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
