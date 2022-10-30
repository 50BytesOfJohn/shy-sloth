import { giveUndefined } from "../src";

describe("Give Undefined", () => {
  test("returns undefined", async () => {
    expect(giveUndefined()).toBeUndefined();
  });
});
