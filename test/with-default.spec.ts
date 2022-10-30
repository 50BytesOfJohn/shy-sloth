import {
  setProperty,
  withDefault,
} from "../src/index";

describe("WithDefault", () => {
  test("returns default value if promise resolves to undefined", async () => {
    const defaultValue = "DEFAULT";

    const compose = withDefault(
      async () => undefined,
      () => defaultValue
    );

    const result = await compose();

    expect(result).toBe(defaultValue);
  });

  test("returns resolved value if promise resolves to other than undefined", async () => {
    const defaultValue = "DEFAULT";
    const resolvedValue = "RESOLVED";

    const compose = withDefault(
      async () => resolvedValue,
      () => defaultValue
    );

    const result = await compose();

    expect(result).toBe(resolvedValue);
  });
});
