import { describe, expect, it } from "vitest";
import {
  calculateDiscount,
  canDrive,
  getCoupons,
  isPriceInRange,
  isValidUsername,
  validateUserInput,
} from "../src/core";

describe("getCoupons", () => {
  it("should return an array of coupons", () => {
    const coupons = getCoupons();
    expect(Array.isArray(coupons)).toBe(true);
    expect(coupons.length).toBeGreaterThan(0);
  });

  it("should return an array with valid coupon codes", () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("code");
      expect(typeof coupon.code).toBe("string");
      expect(coupon.code).toBeTruthy();
    });
  });

  it("should return an array with valid discounts", () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty("discount");
      expect(typeof coupon.discount).toBe("number");
      expect(coupon.discount).toBeGreaterThanOrEqual(0);
      expect(coupon.discount).toBeLessThan(1);
    });
  });
});

describe("calculateDiscount", () => {
  it("should return discounted price if given valid code", () => {
    expect(calculateDiscount(10, "SAVE10")).toBe(9);
    expect(calculateDiscount(10, "SAVE20")).toBe(8);
  });

  it("should handle non-numberic price", () => {
    expect(calculateDiscount("10", "SAVE10")).toMatch(/invalid/i);
  });

  it("should handle negative price", () => {
    expect(calculateDiscount(-10, "SAVE10")).toMatch(/invalid/i);
  });

  it("should handle non-string discount code", () => {
    expect(calculateDiscount(10, 10)).toMatch(/invalid/i);
  });

  it("should handle invalid discount code", () => {
    expect(calculateDiscount(10, "BLAH20")).toBe(10);
  });
});

describe("validateUserInput", () => {
  it("should return success if given valid input", () => {
    const result = validateUserInput("validusername", 25);
    expect(result).toMatch(/successful/i);
  });

  it("should return an error for non-string usernames", () => {
    const result = validateUserInput(123, 20); // Invalid username (number)
    expect(result).toMatch(/invalid/i);
  });

  it("should return an error for usernames shorter than 3 characters", () => {
    const result = validateUserInput("ab", 20);
    expect(result).toMatch(/invalid/i);
  });

  it("should return an error for usernames longer than 255 characters", () => {
    const result = validateUserInput("a".repeat(256), 20);
    expect(result).toMatch(/invalid/i);
  });

  it("should return an error for non-number ages", () => {
    const result = validateUserInput("hello", "twenty"); // Invalid age (string)
    expect(result).toMatch(/invalid/i);
  });

  it("should return an error for ages below 18", () => {
    const result = validateUserInput("john", 17);
    expect(result).toMatch(/invalid/i);
  });

  it("should return an error for ages greater than 150", () => {
    const result = validateUserInput("john", 151);
    expect(result).toMatch(/invalid/i);
  });

  it("should return an error for invalid username and age", () => {
    const result = validateUserInput("x", 10);
    expect(result).toMatch(/invalid username/i);
    expect(result).toMatch(/invalid age/i);
  });
});

describe("isPriceInRange", () => {
  it("should return true if price is within range", () => {
    expect(isPriceInRange(50, 0, 100)).toBe(true);
  });

  it("should return false if price is outside the range", () => {
    expect(isPriceInRange(-10, 0, 100)).toBe(false);
    expect(isPriceInRange(200, 0, 100)).toBe(false);
  });

  it("should return true if price is equal to the min or max", () => {
    expect(isPriceInRange(0, 0, 100)).toBe(true);
    expect(isPriceInRange(100, 0, 100)).toBe(true);
  });
});

describe("isValidUsername", () => {
  const minLength = 5;
  const maxLength = 15;

  it("should return true username is at the min or max length", () => {
    expect(isValidUsername("x".repeat(minLength))).toBe(true);
    expect(isValidUsername("x".repeat(maxLength))).toBe(true);
  });

  it("should return true username is within the length contraints", () => {
    expect(isValidUsername("x".repeat(minLength + 1))).toBe(true);
    expect(isValidUsername("x".repeat(maxLength - 1))).toBe(true);
  });

  it("should return true username is outside the length contraints", () => {
    expect(isValidUsername("x".repeat(minLength - 1))).toBe(false);
    expect(isValidUsername("x".repeat(maxLength + 1))).toBe(false);
  });

  it("should return false for invalid input types", () => {
    expect(isValidUsername(null)).toBe(false);
    expect(isValidUsername(undefined)).toBe(false);
    expect(isValidUsername(1)).toBe(false);
  });
});

describe("canDrive", () => {
  it("should return error for invalid country code", () => {
    expect(canDrive(16, "FR")).toMatch(/invalid/i);
  });

  it("should return false for underage", () => {
    expect(canDrive(15, "US")).toBe(false);
    expect(canDrive(16, "UK")).toBe(false);
  });

  it("should return true for min age", () => {
    expect(canDrive(16, "US")).toBe(true);
    expect(canDrive(17, "UK")).toBe(true);
  });

  it("should return true for eligible age", () => {
    expect(canDrive(18, "US")).toBe(true);
    expect(canDrive(18, "UK")).toBe(true);
  });
});
