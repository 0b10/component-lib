import React from "react";
import { mount, shallow } from "enzyme";
// 3rd party
import { ListItemText, ListItem } from "@material-ui/core";
// Icons
// ! These are specific, and set by the component - DO NOT CHANGE unless necessary
import TestDefaultLoginIcon from "@material-ui/icons/AccountBoxSharp";
import TestDefaultLogoutIcon from "@material-ui/icons/PowerSettingsNew";
// These can be anything
import TestCustomLoginIcon from "@material-ui/icons/Link";
import TestCustomLogoutIcon from "@material-ui/icons/AccessAlarmSharp";
// Local
import { AccountAction } from "../SideMenu";

describe("Package: SideMenu", () => {
  const mockProps = Object.freeze({
    // ! Must set "authed" prop (bool) for every test
    handleItemClick: () => null,
    accountActions: {
      login: {
        primaryText: "Test Login",
        uri: "/test/login",
        icon: TestDefaultLoginIcon
      },
      logout: {
        primaryText: "Test Logout",
        uri: "/test/logout",
        icon: TestDefaultLogoutIcon
      }
    }
  });

  const defaultTextWhenAuthed = "Logout";
  const defaultTextWhenNotAuthed = "Login";
  const CustomLoginIcon = TestCustomLoginIcon;
  const CustomLogoutIcon = TestCustomLogoutIcon;

  describe("Component: AccountAction", () => {
    // >>> STATEFUL >>>
    [true, false].forEach(authed => {
      describe(`when ${authed ? "logged in" : "logged out"}`, () => {
        // These variables are state dependent - the user is logged in, or not logged in

        // These are used to assert test results. The component uses one of these objects
        //  depending on the state of 'authed'
        let determinedAccountActions;
        authed
          ? (determinedAccountActions = { ...mockProps.accountActions.logout })
          : (determinedAccountActions = { ...mockProps.accountActions.login });

        // Use this for testing that custom icons are set - one for each state. These are arbitrary
        let CustomIcon;
        authed
          ? (CustomIcon = CustomLogoutIcon)
          : (CustomIcon = CustomLoginIcon);

        // Use this to determine if the component renders a default icon
        // ! These are not arbitrary, these are set by the component - see imports.
        let DefaultIcon;
        authed
          ? (DefaultIcon = TestDefaultLogoutIcon)
          : (DefaultIcon = TestDefaultLoginIcon);

        // ~~~ Render ~~~
        // +++ basic +++
        it("should render", () => {
          const wrapper = shallow(
            <AccountAction authed={authed} {...mockProps} />
          );
          expect(wrapper.length).toBe(1);
        });

        // +++ rendered text +++
        it(`should display the custom text passed via props: "${
          determinedAccountActions.primaryText
        }"`, () => {
          const wrapper = mount(
            <AccountAction authed={authed} {...mockProps} />
          ).find(ListItemText);
          expect(wrapper.text()).toBe(determinedAccountActions.primaryText);
        });

        // +++ rendered default text +++
        it(`should display the default text`, () => {
          let defaultText;
          authed
            ? (defaultText = defaultTextWhenAuthed)
            : (defaultText = defaultTextWhenNotAuthed);

          const accountActions = {
            login: {
              uri: "/test/login",
              icon: TestDefaultLoginIcon
            },
            logout: {
              uri: "/test/logout",
              icon: TestDefaultLogoutIcon
            }
          };

          const wrapper = mount(
            <AccountAction
              authed={authed}
              accountActions={accountActions}
              handleItemClick={() => null}
            />
          ).find(ListItemText);
          expect(wrapper.text()).toBe(defaultText);
        });

        // +++ custom icon +++
        it(`should render an icon passed as the icon prop: ${
          CustomIcon.displayName
        }`, () => {
          const accountActions = {
            login: {
              icon: CustomLoginIcon,
              uri: "/login"
            },
            logout: {
              icon: CustomLogoutIcon,
              uri: "/logout"
            }
          };

          const wrapper = mount(
            <AccountAction
              authed={authed}
              accountActions={accountActions}
              handleItemClick={() => null}
            />
          ).find(CustomIcon);

          expect(wrapper.length).toBe(1);
        });

        // +++ default icon +++
        it(`should render a default icon: ${DefaultIcon.displayName}`, () => {
          const accountActions = {
            login: {
              uri: "/login"
            },
            logout: {
              uri: "/logout"
            }
          };
          const wrapper = mount(
            <AccountAction
              authed={authed}
              accountActions={accountActions}
              handleItemClick={() => null}
            />
          ).find(DefaultIcon);

          expect(wrapper.length).toBe(1);
        });

        // ~~~ Handlers ~~~
        // +++ handleItemClick args +++
        it(`should pass the correct arg to handleItemClick: ${
          determinedAccountActions.uri
        }`, () => {
          const handlerSpy = jest.fn();

          const wrapper = mount(
            <AccountAction
              authed={authed}
              accountActions={mockProps.accountActions}
              handleItemClick={handlerSpy}
            />
          ).find(ListItem);

          wrapper.simulate("click");

          expect(handlerSpy.mock.calls[0][0]).toBe(
            determinedAccountActions.uri
          );
        });

        // ~~~ Snapshot ~~~
        it("should match snapshot", () => {
          // Relies upon enzyme-to-json
          const tree = mount(<AccountAction authed={authed} {...mockProps} />);
          expect(tree).toMatchSnapshot();
        });
      });
    });

    // >>> STATELESS >>>
    // ~~~ Handlers ~~~
    // +++ handleItemClick +++
    it(`should call the passed in handleItemClick function when the item is clicked`, () => {
      const handlerSpy = jest.fn();

      const wrapper = mount(
        <AccountAction
          accountActions={mockProps.accountActions}
          handleItemClick={handlerSpy}
        />
      ).find(ListItem);

      wrapper.simulate("click");

      expect(handlerSpy.mock.calls.length).toBe(1);
    });

    // +++ authed default value +++
    it(`should default to authed=false when authed is not passed as a prop`, () => {
      const wrapper = mount(<AccountAction {...mockProps} />).find(
        ListItemText
      );
      expect(wrapper.text()).toBe(mockProps.accountActions.login.primaryText);
    });
  });
});
