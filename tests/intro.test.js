import { describe, test, it, expect } from 'vitest';
import { max, fizzBuzz, calculateAverage, factorial } from '../src/intro';

describe('max', () => {
  it('should return the first argument if it is greater', () => {
    // Arrange
    // const a = 2;
    // const b = 1;

    // Act
    // const result = max(a, b);

    // Assert
    // expect(result).toBe(2);

    expect(max(2, 1)).toBe(2);
  });

  it('should return the second argument if it is greater', () => {
    expect(max(1, 2)).toBe(2);
  });

  it('should return the first argument if arguments are equal', () => {
    expect(max(1, 1)).toBe(1);
  });
});

describe('fizzBuzz', () => {
  it("should return 'FizzBuzz' if the number is divisible by 3 and 5", () => {
    expect(fizzBuzz(15)).toBe('FizzBuzz');
  });

  it("should return 'Fizz' if the number is divisible by 3", () => {
    expect(fizzBuzz(3)).toBe('Fizz');
  });

  it("should return 'Buzz' if the number is divisible by 5", () => {
    expect(fizzBuzz(5)).toBe('Buzz');
  });

  it('should return the number as a string if it is not divisible by 3 or 5', () => {
    expect(fizzBuzz(1)).toBe('1');
  });
});

describe('calculateAverage', () => {
  it('should return NaN if given an empty array', () => {
    expect(calculateAverage([])).toBe(NaN);
  });

  it('should calculate the average of an array with a single element', () => {
    expect(calculateAverage([1])).toBe(1);
  });

  it('should calculate the average of an array with two elements', () => {
    expect(calculateAverage([1, 2])).toBe(1.5);
  });

  it('should calculate the average of an array with multiple elements', () => {
    expect(calculateAverage([1, 2, 3, 4, 5])).toBe(3);
  });
});

describe('factorial', () => {
  it('should return 1 when given 0', () => {
    expect(factorial(0)).toBe(1);
  });

  it('should return 1 when given 1', () => {
    expect(factorial(1)).toBe(1);
  });

  it('should return 2 when given 2', () => {
    expect(factorial(2)).toBe(2);
  });

  it('should calculate the factorial of a positive number', () => {
    expect(factorial(5)).toBe(120);
  });

  it('should return undefined when given a negative number', () => {
    expect(factorial(-1)).toBeUndefined();
  });
});
