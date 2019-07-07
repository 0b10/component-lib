import React from "react";
import { mount, shallow } from "enzyme";
// Local
import { FieldSet } from "../FieldSet";

describe("Package: form", () => {
  describe("Component: FieldSet", () => {
    it("should render something", () => {
      const wrapper = shallow(
        <FieldSet legend="test-legend">
          <div>test</div>
        </FieldSet>
      );
      expect(wrapper.length).toBe(1);
    });
    describe.each`
      legend
      ${undefined}
      ${"test-legend"}
    `("The <legend/> tag", ({ legend }) => {
      it(`should render ${
        legend ? legend : "an empty string"
      } (props.legend)`, () => {
        const wrapper = shallow(
          <FieldSet legend={legend}>
            <div>test</div>
          </FieldSet>
        ).find("legend");
        expect(wrapper.text()).toBe(legend ? legend : "");
      });
    });
  });
});
