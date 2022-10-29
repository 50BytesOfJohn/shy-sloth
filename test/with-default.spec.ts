import { withDefault } from "../dist/index.js";

describe("WithDefault", () => {
  test("promise and default value", async () => {
    const defaultValue = "DEFAULT";

    const compose = withDefault(
      async () => undefined,
      () => defaultValue
    );

    const result = await compose();

    expect(result).toBe(defaultValue);
  });
});
