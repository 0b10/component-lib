import React from "react";
import { mount } from "enzyme";
// Local
import { Form } from "../../Form";
import { getMockFormProps } from "../../__helpers__/props";
// 3rd party
import "@testing-library/jest-dom/extend-expect";

/**
 * Tests to ignore - these are tested in withValidation integration tests:
 *  * handlers
 *  * buttons (existence only, not properties)
 *  * messages
 *  * refs
 *
 * Low priority tests that could be done, but only if they do not test implementation:
 *  * buttons: the different properties that are passed through to the buttons
 *  * containerStyle: test that containers receive, or reflect passed in styles
 */

describe("Unit Test: Form", () => {
  // >>> HELPERS >>>
  const types_ = Object.freeze(["email", "password", "search", "text", "url"]);

  const getRandomTextFields = (length = 1, type, types = types_) => {
    const tf = [];
    for (let i = 0; i < length; i++) {
      const random = Math.random()
        .toString(16)
        .substring(2);

      // Get random input field type
      let index;
      if (type === "random") {
        index = Math.floor(Math.random() * types.length);
      }

      tf.push(
        Object.freeze({
          label: random,
          name: random,
          type: type === "random" ? types[index] : "text",
          refKey: random
        })
      );
    }
    return Object.freeze(tf);
  };

  // >>> TESTS >>>
  // ~~~ Text Fields ~~~
  describe.each`
    textFields                           | length
    ${getRandomTextFields(1, "random")}  | ${1}
    ${getRandomTextFields(2, "random")}  | ${2}
    ${getRandomTextFields(3, "random")}  | ${3}
    ${getRandomTextFields(9, "random")}  | ${9}
    ${getRandomTextFields(10, "random")} | ${10}
  `("for textFields of length $length", ({ textFields, length }) => {
    // +++ field type +++
    it(`each input type should match an expected value`, () => {
      const mockFormProps = getMockFormProps(textFields);
      const wrapper = mount(<Form {...mockFormProps} />);
      for (let i = 0; i < length; i++) {
        expect(
          wrapper
            .find("input")
            .at(i)
            .prop("type")
        ).toBe(textFields[i].type);
      }
    });
  });

  describe.each`
    textFields                 | length
    ${getRandomTextFields(1)}  | ${1}
    ${getRandomTextFields(2)}  | ${2}
    ${getRandomTextFields(3)}  | ${3}
    ${getRandomTextFields(9)}  | ${9}
    ${getRandomTextFields(10)} | ${10}
  `("for textFields of length $length", ({ textFields, length }) => {
    // +++ num of fields +++
    it(`${length} input fields should be displayed`, () => {
      const mockFormProps = getMockFormProps(textFields);
      const wrapper = mount(<Form {...mockFormProps} />);
      expect(wrapper.find("input").length).toBe(length);
    });

    // +++ label text +++
    it(`each label text should match an expected value`, () => {
      const mockFormProps = getMockFormProps(textFields);
      const wrapper = mount(<Form {...mockFormProps} />);
      //   for (let i = 0; i < length; i++) {

      //   }
      wrapper.find("label").forEach((label, index) => {
        expect(label.text()).toBe(textFields[index].label);
      });
    });
  });
});
