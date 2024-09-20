import { templateLiteralToTypeNameString } from "./index.js";

test("templateLiteralToTypeNameString", () => {
  expect(templateLiteralToTypeNameString`${"A"}`).toBe("string");
  expect(templateLiteralToTypeNameString`${{ x: 1 }}`).toBe("object");
  expect(templateLiteralToTypeNameString`${2}`).toBe("number");
  expect(templateLiteralToTypeNameString`${false}`).toBe("boolean");
  expect(templateLiteralToTypeNameString`${() => {}}`).toBe("function");
  expect(
    templateLiteralToTypeNameString`type of A is ${"A"}. type of { x: 1 } is ${{
      x: 1,
    }}.`
  ).toBe("type of A is string. type of { x: 1 } is object.");
});
