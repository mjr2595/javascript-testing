import { beforeEach, describe, expect, it } from 'vitest';
import {
  Stack,
  calculateDiscount,
  canDrive,
  fetchData,
  getCoupons,
  isPriceInRange,
  isValidUsername,
  validateUserInput
} from '../src/core';

describe('getCoupons', () => {
  it('should return an array of coupons', () => {
    const coupons = getCoupons();
    expect(Array.isArray(coupons)).toBe(true);
    expect(coupons.length).toBeGreaterThan(0);
  });

  it('should return an array with valid coupon codes', () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty('code');
      expect(typeof coupon.code).toBe('string');
      expect(coupon.code).toBeTruthy();
    });
  });

  it('should return an array with valid discounts', () => {
    const coupons = getCoupons();
    coupons.forEach((coupon) => {
      expect(coupon).toHaveProperty('discount');
      expect(typeof coupon.discount).toBe('number');
      expect(coupon.discount).toBeGreaterThanOrEqual(0);
      expect(coupon.discount).toBeLessThan(1);
    });
  });
});

describe('calculateDiscount', () => {
  it('should return discounted price if given valid code', () => {
    expect(calculateDiscount(10, 'SAVE10')).toBe(9);
    expect(calculateDiscount(10, 'SAVE20')).toBe(8);
  });

  it('should handle non-numberic price', () => {
    expect(calculateDiscount('10', 'SAVE10')).toMatch(/invalid/i);
  });

  it('should handle negative price', () => {
    expect(calculateDiscount(-10, 'SAVE10')).toMatch(/invalid/i);
  });

  it('should handle non-string discount code', () => {
    expect(calculateDiscount(10, 10)).toMatch(/invalid/i);
  });

  it('should handle invalid discount code', () => {
    expect(calculateDiscount(10, 'BLAH20')).toBe(10);
  });
});

describe('validateUserInput', () => {
  it('should return success if given valid input', () => {
    const result = validateUserInput('validusername', 25);
    expect(result).toMatch(/successful/i);
  });

  it('should return an error for non-string usernames', () => {
    const result = validateUserInput(123, 20); // Invalid username (number)
    expect(result).toMatch(/invalid/i);
  });

  it('should return an error for usernames shorter than 3 characters', () => {
    const result = validateUserInput('ab', 20);
    expect(result).toMatch(/invalid/i);
  });

  it('should return an error for usernames longer than 255 characters', () => {
    const result = validateUserInput('a'.repeat(256), 20);
    expect(result).toMatch(/invalid/i);
  });

  it('should return an error for non-number ages', () => {
    const result = validateUserInput('hello', 'twenty'); // Invalid age (string)
    expect(result).toMatch(/invalid/i);
  });

  it('should return an error for ages below 18', () => {
    const result = validateUserInput('john', 17);
    expect(result).toMatch(/invalid/i);
  });

  it('should return an error for ages greater than 150', () => {
    const result = validateUserInput('john', 151);
    expect(result).toMatch(/invalid/i);
  });

  it('should return an error for invalid username and age', () => {
    const result = validateUserInput('x', 10);
    expect(result).toMatch(/invalid username/i);
    expect(result).toMatch(/invalid age/i);
  });
});

describe('isPriceInRange', () => {
  it.each([
    { scenario: 'price < min', price: -10, expected: false },
    { scenario: 'price = min', price: 0, expected: true },
    { scenario: 'price between min and max', price: 50, expected: true },
    { scenario: 'price = max', price: 100, expected: true },
    { scenario: 'price > max', price: 200, expected: false }
  ])('should return $expected when $scenario', ({ price, expected }) => {
    expect(isPriceInRange(price, 0, 100)).toBe(expected);
  });
});

describe('isValidUsername', () => {
  const minLength = 5;
  const maxLength = 15;

  it('should return true username is at the min or max length', () => {
    expect(isValidUsername('x'.repeat(minLength))).toBe(true);
    expect(isValidUsername('x'.repeat(maxLength))).toBe(true);
  });

  it('should return true username is within the length contraints', () => {
    expect(isValidUsername('x'.repeat(minLength + 1))).toBe(true);
    expect(isValidUsername('x'.repeat(maxLength - 1))).toBe(true);
  });

  it('should return true username is outside the length contraints', () => {
    expect(isValidUsername('x'.repeat(minLength - 1))).toBe(false);
    expect(isValidUsername('x'.repeat(maxLength + 1))).toBe(false);
  });

  it('should return false for invalid input types', () => {
    expect(isValidUsername(null)).toBe(false);
    expect(isValidUsername(undefined)).toBe(false);
    expect(isValidUsername(1)).toBe(false);
  });
});

describe('canDrive', () => {
  it('should return error for invalid country code', () => {
    expect(canDrive(16, 'FR')).toMatch(/invalid/i);
  });

  it.each([
    { age: 15, countryCode: 'US', expected: false },
    { age: 16, countryCode: 'US', expected: true },
    { age: 17, countryCode: 'US', expected: true },
    { age: 16, countryCode: 'UK', expected: false },
    { age: 17, countryCode: 'UK', expected: true },
    { age: 18, countryCode: 'UK', expected: true }
  ])(
    'should return $expected for ($age, $countryCode)',
    ({ age, countryCode, expected }) => {
      expect(canDrive(age, countryCode)).toBe(expected);
    }
  );
});

describe('fetchData', () => {
  it('should return a promise that will resolve to an array of numbers', async () => {
    try {
      const result = await fetchData();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
    } catch (error) {
      expect(error).toHaveProperty('reason');
      expect(error.reason).toMatch(/fail/i);
    }
  });
});

describe('Stack', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  it('push should add an item to the Stack', () => {
    stack.push(1);
    expect(stack.size()).toBe(1);
  });

  it('pop should remove the top item from the stack', () => {
    stack.push(1);
    stack.push(2);
    const poppedItem = stack.pop();
    expect(poppedItem).toBe(2);
    expect(stack.size()).toBe(1);
  });

  it('pop should throw an error if the stack is empty', () => {
    expect(() => stack.pop()).toThrow(/empty/i);
  });

  it('peek should return the top item from the stack without removing', () => {
    stack.push(1);
    stack.push(2);
    const topItem = stack.peek();
    expect(topItem).toBe(2);
    expect(stack.size()).toBe(2);
  });

  it('peek should throw an error if the stack is empty', () => {
    expect(() => stack.peek()).toThrow(/empty/i);
  });

  it('isEmpty should return true if the stack is empty', () => {
    expect(stack.isEmpty()).toBe(true);
  });

  it('isEmpty should return false if the stack is not empty', () => {
    stack.push(1);
    expect(stack.isEmpty()).toBe(false);
  });

  it('size should return the number of items in the stack', () => {
    stack.push(1);
    stack.push(2);
    expect(stack.size()).toBe(2);
  });

  it('clear should remove all items from the stack', () => {
    stack.push(1);
    stack.push(2);
    stack.clear();
    expect(stack.size()).toBe(0);
    expect(stack.isEmpty()).toBe(true);
  });
});
