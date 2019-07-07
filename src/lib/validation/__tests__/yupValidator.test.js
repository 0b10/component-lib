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
        const { paramOne: retval } = await validate({
          paramOne,
          paramTwo
        });
        expect(retval).toBe(p1Msg);
      });

      // +++ test message for param 2 +++
      it(`should return the correct error messages for paramTwo: "${p2Msg}"`, async () => {
        const { paramTwo: retval } = await validate({
          paramOne,
          paramTwo
        });
        expect(retval).toBe(p2Msg);
      });
    }
  );

  // +++ check successfully accepts +++
  describe.each`
    paramOne   | paramTwo
    ${"aaa"}   | ${"aaa"}
    ${"aaaa"}  | ${"aaa"}
    ${"aaa"}   | ${"aaaa"}
    ${"aaaa"}  | ${"aaaa"}
    ${"aaaaa"} | ${"aaaaa"}
    ${"aaaa"}  | ${"aaaaa"}
    ${"aaaaa"} | ${"aaaa"}
  `(
    "Valid values: paramOne: $paramOne, paramTwo: $paramTwo",
    ({ paramOne, paramTwo }) => {
      // +++ test is rejected +++
      it("should accept with return value { valid: true }", async () => {
        const result = await validate({ paramOne, paramTwo });
        expect(result.valid).toBe(true);
      });

      it("should have an undefined message for paramOne", async () => {
        const { paramOne: retval } = await validate({ paramOne, paramTwo });
        expect(retval).toBe(undefined);
      });

      it("should have an undefined message for paramTwo", async () => {
        const { paramTwo: retval } = await validate({ paramOne, paramTwo });
        expect(retval).toBe(undefined);
      });
    }
  );
});
