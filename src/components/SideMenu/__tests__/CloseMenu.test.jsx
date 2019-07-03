import React from "react";
import { mount, shallow } from "enzyme";
// 3rd party
import { ListItemText } from "@material-ui/core";
// Local
import { CloseMenu } from "../SideMenu";

describe("Package: SideMenu", () => {
  describe("Component: CloseMenu", () => {
    // >>> FIXTURES >>>
    const mockCloseMenuProps = Object.freeze({
      handleItemClick: () => null
    });

    const primaryText = "Close Menu";

    // >>> RENDER >>>
    // +++ basic +++
    it("should render", () => {
      const wrapper = shallow(<CloseMenu {...mockCloseMenuProps} />);
      expect(wrapper.length).toBe(1);
    });

    // +++ primary text content +++
    it(`should display the primaryText: ${primaryText}`, () => {
      const wrapper = mount(<CloseMenu {...mockCloseMenuProps} />).find(
        ListItemText
      );
      expect(wrapper.text()).toBe(primaryText);
    });

    // >>> HANDLERS >>>
    // +++ click handler call +++
    it("should call props.handleItemClick when clicked", () => {
      const handlerSpy = jest.fn();
      const mockPropsCopy = { ...mockCloseMenuProps };
      mockPropsCopy.handleItemClick = handlerSpy;

      const wrapper = mount(<CloseMenu {...mockPropsCopy} />);
      wrapper.simulate("click");
      expect(handlerSpy.mock.calls.length).toBe(1);
    });

    // >>> SNAPSHOTS >>>
    it("should match existing snapshot", () => {
      // Relies upon enzyme-to-json
      const tree = mount(<CloseMenu {...mockCloseMenuProps} />);
      expect(tree).toMatchSnapshot();
    });
  });
});
