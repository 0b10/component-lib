import React from "react";
import { shallow, mount } from "enzyme";

import { Authed } from "../SideMenu";

describe("Package: SideMenu", () => {
  describe("Component: Authed", () => {
    // >>> RENDER >>>
    [{ authed: true, length: 1 }, { authed: false, length: 0 }].forEach(
      ({ authed, length }) => {
        it(`should ${authed ? "\b" : "not"} render children if ${
          authed ? "\b" : "not"
        } authed`, () => {
          const child = shallow(
            <Authed authed={authed}>
              <div>42</div>
            </Authed>
          ).childAt(0);

          expect(child.length).toBe(length);
        });

        // >>> SNAPSHOT >>>
        it("should match snapshot", () => {
          // Relies upon enzyme-to-json
          const tree = mount(
            <Authed authed={authed}>
              <div>42</div>
            </Authed>
          );
          expect(tree).toMatchSnapshot();
        });
      }
    );
  });
});
