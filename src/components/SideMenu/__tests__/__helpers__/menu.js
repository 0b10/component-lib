/**
 * Used by both SideMenu and SideMenuButton
 */
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

// >>> ICONS >>>
// Randomly selected for menu items - just to pass tests
// ! If you change the length of this, the icon each test will receive will change
// The index to select an icon is determined with (n % iconList.length), so snapshots
//  may need to be rebuilt after changing the length of this list.
export const iconList = [
  AccessAlarm,
  AccessAlarmTwoTone,
  ExitToApp,
  GolfCourseTwoTone,
  KeyboardTab
];

// >>> HANDLERS >>>
// Login/logout buttons - can be overridden
// ! nested objects are immutable, but you can replace whole top-level objects via args.
export const getAccountActionItems = (login, logout) => ({
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

// >>> CONFIG OBJECTS >>>
/** Generate 'items list' of the given length. Optionally, pass an object with any desired
 *   values - consequently each item will have identical values to the one given. Typically
 *   you'd set length to 1, so only one value is set.
 */
export const getMenuItems = (length = 3, primaryText, uri, icon) =>
  [...Array(length).keys()].map((_, index) => ({
    primaryText: primaryText || `test-primary-text-${index}`,
    uri: uri || `/test/uri/${index}`,
    icon: icon || iconList[index % iconList.length] // deterministically limit index to 0-5
  }));

// The settings button - can be overridden
export const getSettingsItem = (
  primaryText = "test-settings",
  uri = "/test/settings/uri",
  icon = TestSettingsIcon
) => ({
  primaryText,
  uri,
  icon
});

// >>> PROPS >>>
// ! This is what you would use, typically {...mockProps()}
// You can override any of the args. You can use the above functions, or your own.
// The above functions can all be overridden individually, so this mock is fully customisable.
export const mockProps = (
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
