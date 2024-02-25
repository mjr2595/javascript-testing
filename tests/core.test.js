import { it, expect, describe } from "vitest";
import { getCoupons } from "../src/core";

describe("test suite", () => {
  it("test case", () => {
    const result = { name: "Michael" };
    expect(result).toEqual({ name: "Michael" });
  });

  it("test case", () => {
    const result = "The requested file was NOT found.";
    expect(result).toMatch(/not found/i);
  });

  it("test case", () => {
    const result = [3, 1, 2];
    expect(result).toEqual(expect.arrayContaining([1, 2, 3]));
  });
});
