import React from "react";
import { mount, shallow } from "enzyme";
// 3rd party
import { ListItemText } from "@material-ui/core";
// Icons
import LinkIcon from "@material-ui/icons/Link";
import TestIcon from "@material-ui/icons/AccountCircle";
// Local
import { MenuItem } from "../SideMenu";

describe("Package: SideMenu", () => {
  describe("Component: MenuItem", () => {
    // >>> FIXTURES >>>
    const mockMenuItemProps = Object.freeze({
      uri: "/test/uri",
      handleItemClick: () => null,
      primaryText: "test-primary-text"
    });

    const DefaultIcon = LinkIcon;
    const CustomIcon = TestIcon;

    // >>> RENDER >>>
    // +++ basic +++
    it("should render", () => {
      const wrapper = shallow(<MenuItem {...mockMenuItemProps} />);
      expect(wrapper.length).toBe(1);
    });

    // +++ primary text content +++
    it(`should display the primaryText: ${
      mockMenuItemProps.primaryText
    }`, () => {
      const wrapper = mount(<MenuItem {...mockMenuItemProps} />).find(
        ListItemText
      );
      expect(wrapper.text()).toBe(mockMenuItemProps.primaryText);
    });

    // +++ custom icon +++
    it(`should render an icon passed as the icon prop: ${
      CustomIcon.displayName
    }`, () => {
      const wrapper = mount(
        <MenuItem {...mockMenuItemProps} icon={CustomIcon} />
      ).find(CustomIcon);

      expect(wrapper.length).toBe(1);
    });

    // +++ default icon +++
    it(`should render a default icon: ${DefaultIcon.displayName}`, () => {
      const wrapper = mount(<MenuItem {...mockMenuItemProps} />).find(
        DefaultIcon
      );

      expect(wrapper.length).toBe(1);
    });

    // >>> HANDLERS >>>
    // +++ click handler call +++
    it("should call props.handleItemClick when clicked", () => {
      const handlerSpy = jest.fn();
      const mockPropsCopy = { ...mockMenuItemProps };
      mockPropsCopy.handleItemClick = handlerSpy;

      const wrapper = mount(<MenuItem {...mockPropsCopy} />);
      wrapper.simulate("click");
      expect(handlerSpy.mock.calls.length).toBe(1);
    });

    // +++ click handler arg +++
    it(`should call props.handleItemClick with arg: ${
      mockMenuItemProps.uri
    }`, () => {
      const handlerSpy = jest.fn();
      const mockPropsCopy = { ...mockMenuItemProps };
      mockPropsCopy.handleItemClick = handlerSpy;

      const wrapper = mount(<MenuItem {...mockPropsCopy} />);
      wrapper.simulate("click");
      expect(handlerSpy.mock.calls[0][0]).toBe(mockMenuItemProps.uri);
    });

    // >>> SNAPSHOTS >>>
    it("should match existing snapshot", () => {
      // Relies upon enzyme-to-json
      const tree = mount(<MenuItem {...mockMenuItemProps} />);
      expect(tree).toMatchSnapshot();
    });
  });
});
