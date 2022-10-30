import { withCatch } from "../src";

describe("With Catch", () => {
  test("returns resolved value, if no error, withour error handler", async () => {
    const resolvedValue = "RESOLVED";

    const compose = withCatch(
      async () => resolvedValue
    );

    await expect(compose()).resolves.toBe(
      resolvedValue
    );
  });

  test("returns resolved value, if no error", async () => {
    const resolvedValue = "RESOLVED";

    const compose = withCatch(
      async () => resolvedValue,
      async (e) => {
        return e;
      }
    );

    await expect(compose()).resolves.toBe(
      resolvedValue
    );
  });

  test("returns error handler result, if error", async () => {
    const errorHandlerResolvedValue =
      "ERROR_HANDLER";

    const errorHandler = async () => {
      return errorHandlerResolvedValue;
    };

    const compose = withCatch(async () => {
      throw new Error("Error");
    }, errorHandler);

    await expect(compose()).resolves.toBe(
      errorHandlerResolvedValue
    );
  });

  test("default error handler returns undefined", async () => {
    const compose = withCatch(async () => {
      throw new Error("Error");
    });

    await expect(
      compose()
    ).resolves.toBeUndefined();
  });
});
