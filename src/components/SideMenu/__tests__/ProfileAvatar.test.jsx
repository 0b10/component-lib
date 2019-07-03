import React from "react";
import { mount, shallow } from "enzyme";
// 3rd party
import { Avatar, ListItem, ListItemText } from "@material-ui/core";
// Local
import { ProfileAvatar } from "../SideMenu";

describe("Package: SideMenu", () => {
  describe("Component: ProfileAvatar", () => {
    const mockProps = Object.freeze({
      getProfileDetails: () => ({
        avatarUri: "/test/avatar/uri",
        uri: "/test/profile/uri",
        username: "test-username"
      }),
      handleItemClick: () => null
    });

    // >>> Render >>>
    // +++ basic +++
    it("should render", () => {
      const wrapper = shallow(<ProfileAvatar {...mockProps} />);
      expect(wrapper.length).toBe(1);
    });

    // +++ rendered text +++
    it(`should display the profile username: "${
      mockProps.getProfileDetails().username
    }"`, () => {
      const wrapper = mount(<ProfileAvatar {...mockProps} />).find(
        ListItemText
      );
      expect(wrapper.text()).toBe(mockProps.getProfileDetails().username);
    });

    // +++ render avatar image +++
    it("should pass avatarUri to the MUI:Avatar src prop", () => {
      const avatarSrcProp = mount(<ProfileAvatar {...mockProps} />)
        .find(Avatar)
        .props().src;
      expect(avatarSrcProp).toBe(mockProps.getProfileDetails().avatarUri);
    });

    // >>> HANDLERS >>>
    // +++ handleItemClick +++
    it("should call handleItemClick when it is clicked", () => {
      const handlerSpy = jest.fn();
      const wrapper = mount(
        <ProfileAvatar
          getProfileDetails={mockProps.getProfileDetails}
          handleItemClick={handlerSpy}
        />
      ).find(ListItem);

      wrapper.simulate("click");

      expect(handlerSpy.mock.calls.length).toBe(1);
    });

    // +++ handleItemClick args +++
    it("should call handleItemClick when it is clicked", () => {
      const handlerSpy = jest.fn();
      const wrapper = mount(
        <ProfileAvatar
          getProfileDetails={mockProps.getProfileDetails}
          handleItemClick={handlerSpy}
        />
      ).find(ListItem);

      wrapper.simulate("click");

      expect(handlerSpy.mock.calls[0][0]).toBe(
        mockProps.getProfileDetails().uri
      );
    });

    // >>> SNAPSHOT >>>
    it("should match snapshot", () => {
      // Relies upon enzyme-to-json
      const tree = mount(<ProfileAvatar {...mockProps} />);
      expect(tree).toMatchSnapshot();
    });
  });
});
