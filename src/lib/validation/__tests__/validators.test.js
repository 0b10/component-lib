import { yupValidator } from "../validators";

describe("Package: validation", () => {
  describe("Module: validators", () => {
    describe("yupValidator()", () => {
      // +++ test exists +++
      it("should be a callable function", () => {
        expect(typeof yupValidator).toBe("function");
      });
    });
  });
});
