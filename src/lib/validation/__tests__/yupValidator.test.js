import * as yup from "yup";

import { yupValidator } from "../validators";

const testSchema = Object.freeze(
  yup.object().shape({
    paramOne: yup
      .string()
      .min(3, "one-min")
      .max(5, "one-max")
      .required("one-required"),
    paramTwo: yup
      .string()
      .min(3, "two-min")
      .max(5, "two-max")
      .required("two-required")
  })
);

const validate = Object.freeze(yupValidator(testSchema));

// ${1}     | ${"abc"} | ${"one-min"}      | ${"one-min"}
//         ${"abc"} | ${1}   | ${"one-min"} | ${"one-min"}

describe("yupValidator()", () => {
  // +++ test exists +++
  it("should be a callable function", () => {
    expect(typeof yupValidator).toBe("function");
  });

  // +++ check successfully rejects +++
  describe.each`
    paramOne | paramTwo | p1Msg             | p2Msg
    ${"a"}   | ${"a"}   | ${"one-min"}      | ${"two-min"}
    ${"aa"}  | ${"aa"}  | ${"one-min"}      | ${"two-min"}
    ${"aab"} | ${"aa"}  | ${undefined}      | ${"two-min"}
    ${"aa"}  | ${"aab"} | ${"one-min"}      | ${undefined}
    ${""}    | ${""}    | ${"one-required"} | ${"two-required"}
    ${"a"}   | ${""}    | ${"one-min"}      | ${"two-required"}
    ${""}    | ${"a"}   | ${"one-required"} | ${"two-min"}
  `(
    "Invalid values: paramOne: $paramOne, paramTwo: $paramTwo",
    ({ paramOne, paramTwo, p1Msg, p2Msg }) => {
      // +++ test is rejected +++
      it("should reject with return value { valid: false }", async () => {
        const result = await validate({ paramOne, paramTwo });
        expect(result.valid).toBe(false);
      });

      // +++ test message for param 1 +++
      it(`should return the correct error messages for paramOne: "${p1Msg}"`, async () => {
        const { paramOne: p1RetVal } = await validate({
          paramOne,
          paramTwo
        });
        expect(p1RetVal).toBe(p1Msg);
      });

      // +++ test message for param 2 +++
      it(`should return the correct error messages for paramTwo: "${p2Msg}"`, async () => {
        const { paramTwo: p2RetVal } = await validate({
          paramOne,
          paramTwo
        });
        expect(p2RetVal).toBe(p2Msg);
      });
    }
  );
});
