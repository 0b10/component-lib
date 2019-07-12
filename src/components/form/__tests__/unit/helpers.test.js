/**
 * Very basic tests for helpers
 */
import { getMockFormProps } from "../../__helpers__/props";
import { schema, yupValidator } from "../../__helpers__/validation";
import { textFields_ as textFields } from "../../__helpers__/props";

describe("The helper", () => {
  // ~~~ getMockProps ~~~
  describe("getMockProps", () => {
    // +++ type +++
    it("should be a function", () => {
      expect(typeof getMockFormProps).toBe("function");
    });

    // +++ return value +++
    it("should return an object", () => {
      const result = getMockFormProps();
      expect(typeof result).toBe("object");
    });

    // +++ returns something expected +++
    it("should return a non-empty object", () => {
      const result = getMockFormProps();
      expect(Object.keys(result).length).toBeGreaterThan(0);
    });
  });
  describe("textFields", () => {
    // +++ type +++
    it("should be an object", () => {
      expect(typeof textFields).toBe("object");
    });

    // +++ isn't empty +++
    it("should not be empty", () => {
      expect(Object.keys(textFields).length).toBeGreaterThan(0);
    });
  });
  describe("schema", () => {
    // +++ type +++
    it("should be a function", () => {
      expect(typeof schema).toBe("object");
    });

    // +++ return something expected +++
    it("should return a non-empty object", () => {
      expect(Object.keys(schema).length).toBeGreaterThan(0);
    });
  });
  describe("yupValidator", () => {
    it("should be a function", () => {
      expect(typeof yupValidator).toBe("function");
    });

    // +++ return value +++
    it("should return a function", () => {
      const result = yupValidator(schema);
      expect(typeof result).toBe("function");
    });

    // +++ returns something expected +++
    it("should return a non-empty object", async () => {
      const result = await yupValidator(schema)({
        username: "testusername",
        password: "testpassword"
      });
      expect(Object.keys(result).length).toBeGreaterThan(0);
    });
  });
});
