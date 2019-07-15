const navItems_ = [
  { label: "Label One", uri: "/label/one" },
  { label: "Label Two", uri: "/label/two" },
  { label: "Label Three", uri: "/label/three" }
];

/**
 * Stub props for NavBar. Override single params, or both. This function uses destructuring.
 * @param {Object} unnamed - an object whose keys reflect props to override.
 * @param {Object} navItems - Navigational buttons: { label, uri } // Label is the display text
 * @param {function} handleNavItemClick - A call back when a button is clicked: fn(uri)
 * @example fn({ label, uri }, fn)
 */
export const navBarStubPropsFactory = (
  navItems = navItems_,
  handleNavItemClick = () => null
) => ({ navItems, handleNavItemClick });
