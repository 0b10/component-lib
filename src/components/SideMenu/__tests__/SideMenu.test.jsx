import React from "react";
import { mount, shallow } from "enzyme";
// 3rd Party
import { ListItemText, ListItem } from "@material-ui/core";
// Icons
import {
  AccessAlarm,
  AccessAlarmTwoTone,
  ExitToApp,
  GifOutlined as TestLoginIcon,
  GolfCourseTwoTone,
  HighQuality as TestLogoutIcon,
  KeyboardTab,
  Settings as TestSettingsIcon
} from "@material-ui/icons";
// Local
import { AccountAction, CloseMenu, ProfileAvatar, SideMenu } from "../SideMenu";

describe("Package: SideMenu", () => {
  describe("Component: SideMenu", () => {
    // >>> FIXTURES >>>
    // Randomly selected for menu items - just to pass tests
    // ! If you change the length of this, the icon each test will receive will change
    // The index to select an icon is determined with (n % iconList.length), so snapshots
    //  may need to be rebuilt after changing the length of this list.
    const iconList = [
      AccessAlarm,
      AccessAlarmTwoTone,
      ExitToApp,
      GolfCourseTwoTone,
      KeyboardTab
    ];

    // ~~~ Helpers ~~~
    /** Generate 'items list' of the given length. Optionally, pass an object with any desired
     *   values - consequently each item will have identical values to the one given. Typically
     *   you'd set length to 1, so only one value is set.
     */
    const getMenuItems = (length = 3, primaryText, uri, icon) =>
      [...Array(length).keys()].map((_, index) => ({
        primaryText: primaryText || `test-primary-text-${index}`,
        uri: uri || `/test/uri/${index}`,
        icon: icon || iconList[index % iconList.length] // deterministically limit index to 0-5
      }));

    // The settings button - can be overridden
    const getSettingsItem = (
      primaryText = "test-settings",
      uri = "/test/settings/uri",
      icon = TestSettingsIcon
    ) => ({
      primaryText,
      uri,
      icon
    });

    // Login/logout buttons - can be overridden
    // ! nested objects are immutable, but you can replace whole toplevel objects via args.
    const getAccountActionItems = (login, logout) => ({
      login:
        login ||
        Object.freeze({
          icon: TestLoginIcon,
          primaryText: "test-login-text",
          uri: "/test/login/uri"
        }),
      logout:
        logout ||
        Object.freeze({
          icon: TestLogoutIcon,
          primaryText: "test-logout-text",
          uri: "/test/logout/uri"
        })
    });

    // ~~~ Props ~~~
    // ! This is what you would use, typically {...mockProps()}
    // You can override any of the args. You can use the above functions, or your own.
    // The above functions can all be overridden individually, so this mock is fully customisable.
    const mockProps = (
      open = true,
      handleItemClick = jest.fn(),
      getProfileDetails = () => ({
        username: "test-username",
        uri: "/test/profile/uri"
      }),
      menuItems = getMenuItems(),
      settings = getSettingsItem(),
      accountActions = getAccountActionItems(),
      closeMenu = jest.fn()
    ) => ({
      accountActions,
      closeMenu,
      getProfileDetails,
      handleItemClick,
      menuItems,
      open,
      settings
    });

    // >>> RENDER >>>
    // ~~~ authed and !authed ~~~
    describe.each`
      authed   | status
      ${true}  | ${"logged in"}
      ${false} | ${"logged out"}
    `("when $status", ({ authed }) => {
      // +++ basic +++
      it("should render itself", () => {
        const wrapper = shallow(
          <SideMenu isAuthed={() => authed} {...mockProps()} />
        );
        expect(wrapper.length).toBe(1);
      });

      // +++ ProfileAvatar +++
      it(`should ${authed ? "\b" : "not"} render ProfileAvatar`, () => {
        const wrapper = mount(
          <SideMenu isAuthed={() => authed} {...mockProps()} />
        ).find(ProfileAvatar);
        let wrapperLen;
        authed ? (wrapperLen = 1) : (wrapperLen = 0);
        expect(wrapper.length).toBe(wrapperLen);
      });

      // +++ AccountAction render +++
      it(`should render AccountAction`, () => {
        const wrapper = mount(
          <SideMenu isAuthed={() => authed} {...mockProps()} />
        ).find(AccountAction);

        expect(wrapper.length).toBe(1); // Should always render
      });

      // +++ AccountAction type +++
      it(`should render AccountAction as the ${
        authed ? "'logout'" : "'login'"
      } type`, () => {
        const mockPropsCopy = mockProps();

        const wrapper = mount(
          <SideMenu isAuthed={() => authed} {...mockPropsCopy} />
        )
          .find(AccountAction)
          .find(ListItemText);

        let expected;
        const { login, logout } = mockPropsCopy.accountActions;
        authed
          ? (expected = logout.primaryText)
          : (expected = login.primaryText);

        expect(wrapper.text()).toBe(expected);
      });

      // +++ CloseMenu render +++
      it(`should render CloseMenu`, () => {
        const wrapper = mount(
          <SideMenu isAuthed={() => authed} {...mockProps()} />
        ).find(CloseMenu);

        expect(wrapper.length).toBe(1); // Should always render
      });

      // +++ MenuItem(s) render +++
      it(`should render MenuItem(s)`, () => {
        const mockPropsCopy = mockProps();
        const wrapper = mount(
          <SideMenu isAuthed={() => authed} {...mockPropsCopy} />
        )
          .find("#sideMenuItems")
          .children();

        expect(wrapper.length).toBe(mockPropsCopy.menuItems.length); // Should always render
      });

      // +++ settings MenuItem render +++
      it(`should render settings MenuItem`, () => {
        const mockPropsCopy = mockProps();
        const wrapper = mount(
          <SideMenu isAuthed={() => authed} {...mockPropsCopy} />
        )
          .find("#sideMenuSettings")
          .children();

        expect(wrapper.length).toBe(1); // Should always render
      });
    });

    // ~~~ opend/closed ~~~
    describe.each`
      open     | status
      ${true}  | ${"open"}
      ${false} | ${"closed"}
    `("when the SideMenu is $status", ({ open }) => {
      // +++ basic +++
      it("should render", () => {
        const mockPropsCopy = mockProps();
        mockPropsCopy.open = open;

        const wrapper = shallow(
          <SideMenu isAuthed={() => true} {...mockPropsCopy} />
        );
        expect(wrapper.length).toBe(1);
      });

      describe.each`
        authed   | status
        ${true}  | ${"logged in"}
        ${false} | ${"logged out"}
      `("and the the user is $status", ({ authed }) => {
        it(`should match the snapshot`, () => {
          const mockPropsCopy = mockProps(open);
          const tree = mount(
            <SideMenu isAuthed={() => authed} {...mockPropsCopy} />
          );
          expect(tree).toMatchSnapshot();
        });
      });
    });

    // >>> HANDLERS >>>
    // ! Don't test for arg values - because unit tests for individual components do this.
    describe("the handler", () => {
      describe.each`
        parent                 | child       | name                     | handlerName
        ${ProfileAvatar}       | ${ListItem} | ${"ProfileAvatar"}       | ${"handleItemClick"}
        ${"#sideMenuSettings"} | ${ListItem} | ${"the 'settings' item"} | ${"handleItemClick"}
        ${AccountAction}       | ${ListItem} | ${"AccountAction"}       | ${"handleItemClick"}
        ${CloseMenu}           | ${ListItem} | ${"CloseMenu"}           | ${"closeMenu"}
      `(
        "'$handlerName', when $name is clicked",
        ({ parent, child, handlerName }) => {
          // +++ check called +++
          it("should be called", () => {
            const mockPropsCopy = mockProps();

            mount(<SideMenu isAuthed={() => true} {...mockPropsCopy} />)
              .find(parent)
              .find(child)
              .simulate("click");

            expect(mockPropsCopy[handlerName].mock.calls.length).toBe(1);
          });

          // +++ check args length +++
          it("should be passed only one arg", () => {
            const mockPropsCopy = mockProps();

            mount(<SideMenu isAuthed={() => true} {...mockPropsCopy} />)
              .find(parent)
              .find(child)
              .simulate("click");

            expect(mockPropsCopy[handlerName].mock.calls[0].length).toBe(1);
          });
        }
      );

      describe("'handleItemClick', when clicking...", () => {
        getMenuItems().forEach((_, index) => {
          describe(`...the 'typical' menu item #${index}`, () => {
            // +++ check called +++
            it(`should be called`, () => {
              // ! Don't alter the length of the menu items array here, the outer-loop depends on it
              // Alter it at the source if necessary
              const mockPropsCopy = mockProps();

              mount(<SideMenu isAuthed={() => true} {...mockPropsCopy} />)
                .find("#sideMenuItems")
                .childAt(index)
                .simulate("click");

              expect(mockPropsCopy.handleItemClick.mock.calls.length).toBe(1);
            });

            // +++ check args length +++
            it(`should be passed only one arg`, () => {
              // ! Don't alter the length of the menu items array here, the outer-loop depends on it
              // Alter it at the source if necessary
              const mockPropsCopy = mockProps();

              mount(<SideMenu isAuthed={() => true} {...mockPropsCopy} />)
                .find("#sideMenuItems")
                .childAt(index)
                .simulate("click");

              expect(mockPropsCopy.handleItemClick.mock.calls[0].length).toBe(
                1
              );
            });
          });
        });
      });
    });
  });
});
