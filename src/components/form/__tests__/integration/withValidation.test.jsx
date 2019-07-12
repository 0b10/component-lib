/**
 * These tests cover withValidation(Form)
 */
import React from "react";
import { shallow } from "enzyme";
// Local
import { Form } from "../../Form";
import { getMockFormProps } from "../../__helpers__/props";
import {
  schema,
  validationMessages,
  yupValidator
} from "../../__helpers__/validation";
import { textFields_ } from "../../__helpers__/props";
// 3rd party
import "@testing-library/jest-dom/extend-expect";
import {
  cleanup,
  fireEvent,
  render,
  waitForDomChange
} from "@testing-library/react";
import { withValidation } from "../../withValidation";

describe("Integration Test: withValidation(Form)", () => {
  // >>> CONFIG >>>
  const submitButtonText = "Submit";
  const resetButtontext = "Reset";
  // Validation messages
  const usernameRequiredMsg = validationMessages.username.required.message;
  const usernameMinMsg = validationMessages.username.min.message;
  const usernameMaxMsg = validationMessages.username.max.message;
  const passwordRequiredMsg = validationMessages.password.required.message;
  const passwordMinMsg = validationMessages.password.min.message;
  const passwordMaxMsg = validationMessages.password.max.message;

  afterEach(cleanup);

  // +++ check renders +++
  it("should render", () => {
    const wrapper = shallow(getValidatingForm().component);
    expect(wrapper.length).toBe(1);
  });

  // >>> SUBMISSION VALIDATION >>>
  describe("submission validation", () => {
    // ~~~ Produces Something ~~~
    for (let i = 0; i < textFields_.length; i++) {
      describe(`for validation message field ${i}`, () => {
        // +++ no initial message +++
        it("shouldn't display any message initially", async () => {
          const { getByTestId } = render(getValidatingForm().component);

          expect(getByTestId(`validation-message-${i}`)).toContainHTML(
            "&nbsp;"
          );
        });

        // +++ validation error +++
        it("should display a validation message on error", async () => {
          // Just test that a validation message is displayed.

          const { getByText, getByTestId } = render(
            getValidatingForm().component
          );

          getByTestId(`input-field-${i}`).value = "a";

          fireEvent.submit(getByText("Submit"));
          // handleEvent relies upon async validator
          await waitForDomChange(() => getByTestId(`validation-message-${i}`));
          expect(getByTestId(`validation-message-${i}`)).toHaveTextContent(
            "Must "
          );

          // Then reset
          fireEvent.click(getByText(resetButtontext));
          expect(getByTestId(`validation-message-${i}`)).toContainHTML(
            "&nbsp;"
          );
        });

        // +++ reset +++
        it("should display no message after a reset", async () => {
          const { getByText, getByTestId } = render(
            getValidatingForm().component
          );

          // Make initial message
          fireEvent.submit(getByText("Submit"));
          // handleEvent relies upon async validator
          await waitForDomChange(() => getByTestId(`validation-message-${i}`));
          expect(getByTestId(`validation-message-${i}`)).toHaveTextContent(
            /^Required$/
          );

          // Then reset
          fireEvent.click(getByText(resetButtontext));
          expect(getByTestId(`validation-message-${i}`)).toContainHTML(
            "&nbsp;"
          );
        });
      });
    }

    // ~~~ Produces Expected Values ~~~
    describe("validation message", () => {
      describe.each`
        fieldNumber | fieldType     | input                                | expected
        ${0}        | ${"username"} | ${""}                                | ${usernameRequiredMsg}
        ${0}        | ${"username"} | ${"a"}                               | ${usernameMinMsg}
        ${0}        | ${"username"} | ${"aa"}                              | ${usernameMinMsg}
        ${0}        | ${"username"} | ${"aaa"}                             | ${""}
        ${0}        | ${"username"} | ${"15charsHHHkkkkk"}                 | ${""}
        ${0}        | ${"username"} | ${"16charsHHHkkkkkP"}                | ${usernameMaxMsg}
        ${1}        | ${"password"} | ${""}                                | ${passwordRequiredMsg}
        ${1}        | ${"password"} | ${"a"}                               | ${passwordMinMsg}
        ${1}        | ${"password"} | ${"7_chars"}                         | ${passwordMinMsg}
        ${1}        | ${"password"} | ${"8_chars_"}                        | ${""}
        ${1}        | ${"password"} | ${"30_chars__DDDDDaaaaaBBBBBddddd"}  | ${""}
        ${1}        | ${"password"} | ${"31_chars__BBBBBdddddAAAAAcccccL"} | ${passwordMaxMsg}
      `(
        "for the $fieldType field (@ position $fieldNumber), submitting the value: '$input'",
        ({ fieldNumber, input, expected }) => {
          // +++ test expected messages for each field +++
          it(`should display: ${
            expected ? expected : "(nothing)"
          }`, async () => {
            const { getByText, getByTestId } = render(
              getValidatingForm().component
            );

            getByTestId(`input-field-${fieldNumber}`).value = input;

            fireEvent.submit(getByText(submitButtonText));
            await waitForDomChange(
              getByTestId(`validation-message-${fieldNumber}`)
            );

            expect(
              getByTestId(`validation-message-${fieldNumber}`)
            ).toHaveTextContent(expected);
          });
        }
      );
    });
  });

  // >>> ONCHANGE VALIDATION >>>
  describe("onChange validation", () => {
    // ! a blank input causes waitForDomChange to hang. Not worth figuring out why.
    describe.each`
      position | fieldName     | input                                | expected
      ${0}     | ${"username"} | ${"a"}                               | ${usernameMinMsg}
      ${0}     | ${"username"} | ${"abc"}                             | ${""}
      ${0}     | ${"username"} | ${"16_chars__HHHHHu"}                | ${usernameMaxMsg}
      ${1}     | ${"username"} | ${"a"}                               | ${passwordMinMsg}
      ${1}     | ${"username"} | ${"8_chars_"}                        | ${""}
      ${1}     | ${"username"} | ${"31_chars__HHHHHnnnnnEEEEEtttttP"} | ${passwordMaxMsg}
    `(
      "for $fieldName (@ position $position), given: $input",
      ({ position, input, expected }) => {
        // +++ correct message onChange +++
        it(`should display: ${expected ? expected : "(nothing)"}`, async () => {
          const { getByTestId } = render(getValidatingForm().component);

          // Input
          fireEvent.change(getByTestId(`input-field-${position}`), {
            target: { value: input }
          });
          await waitForDomChange(getByTestId(`validation-message-${position}`));

          // Test
          expect(
            getByTestId(`validation-message-${position}`)
          ).toHaveTextContent(expected);
        });
      }
    );
  });
});

const getForm = () => withValidation(yupValidator(schema))(Form);

//** Return { component, props }, where props is the props.form passed to the validating form */
const getValidatingForm = () => {
  const ValidatingForm = getForm();
  const mockFormProps = getMockFormProps();
  return {
    component: <ValidatingForm form={{ ...mockFormProps }} />,
    props: mockFormProps
  };
};
