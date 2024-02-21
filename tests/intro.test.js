import { describe, test, it, expect } from "vitest";
import { max, fizzBuzz } from "../src/intro";

describe("max", () => {
  it("should return the first argument if it is greater", () => {
    // Arrange
    // const a = 2;
    // const b = 1;

    // Act
    // const result = max(a, b);

    // Assert
    // expect(result).toBe(2);

    expect(max(2, 1)).toBe(2);
  });

  it("should return the second argument if it is greater", () => {
    expect(max(1, 2)).toBe(2);
  });

  it("should return the first argument if arguments are equal", () => {
    expect(max(1, 1)).toBe(1);
  });
});

describe("fizzBuzz", () => {
  it("should return 'FizzBuzz' if the number is divisible by 3 and 5", () => {
    expect(fizzBuzz(15)).toBe("FizzBuzz");
  });

  it("should return 'Fizz' if the number is divisible by 3", () => {
    expect(fizzBuzz(3)).toBe("Fizz");
  });

  it("should return 'Buzz' if the number is divisible by 5", () => {
    expect(fizzBuzz(5)).toBe("Buzz");
  });

  it("should return the number as a string if it is not divisible by 3 or 5", () => {
    expect(fizzBuzz(1)).toBe("1");
  });
});
