import { withMappedResult } from "../src/index";

describe("With Mapped Result", () => {
  test("returns mapped value", async () => {
    const compose = withMappedResult(
      async () => "KEY",
      {
        KEY: "VALUE",
      }
    );

    await expect(compose()).resolves.toBe(
      "VALUE"
    );
  });

  test("returns undefined if no value mapped", async () => {
    const compose = withMappedResult(
      async () => "NO_KEY",
      {
        KEY: "VALUE",
      }
    );

    await expect(
      compose()
    ).resolves.toBeUndefined();
  });
});
