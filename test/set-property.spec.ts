import { setProperty } from "../src";

describe("Set Property", () => {
  test("sets nested property on object", async () => {
    const newCity = "Warsaw";

    const obj = {
      name: "John",
      address: {
        city: "New York",
      },
    };

    await expect(
      setProperty(obj, "address.city")(newCity)
    ).resolves.toHaveProperty(
      ["address", "city"],
      newCity
    );
  });
});
