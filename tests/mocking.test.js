import { describe, expect, it, vi } from "vitest";
import {
  getPriceInCurrency,
  getShippingInfo,
  renderPage,
  submitOrder,
  signUp,
} from "../src/mocking";
import { getExchangeRate } from "../src/libs/currency";
import { getShippingQuote } from "../src/libs/shipping";
import { trackPageView } from "../src/libs/analytics";
import { charge } from "../src/libs/payment";
import { sendEmail } from "../src/libs/email";

vi.mock("../src/libs/currency");
vi.mock("../src/libs/shipping");
vi.mock("../src/libs/analytics");
vi.mock("../src/libs/payment");
vi.mock("../src/libs/email", async (importOriginal) => {
  const originalModule = await importOriginal();
  return {
    ...originalModule,
    sendEmail: vi.fn(),
  };
});

describe("test suite", () => {
  it("test case", () => {
    // Create a mock function
    const sendText = vi.fn();
    sendText.mockReturnValue("ok");

    // Call the mock function
    const result = sendText("message");

    // Assert that the mock function was called
    expect(sendText).toHaveBeenCalled("message");
    // Assert that the mock function returned the correct value
    expect(result).toBe("ok");
  });
});

describe("getPriceInCurrency", () => {
  it("should return price in target currency", () => {
    vi.mocked(getExchangeRate).mockReturnValue(1.5);
    const price = getPriceInCurrency(10, "AUD");
    expect(price).toBe(15);
  });
});

describe("getShippingInfo", () => {
  it("should return shipping unavailable if quote cannot be fetched", () => {
    vi.mocked(getShippingQuote).mockReturnValue(null);
    const result = getShippingInfo("Omashu");
    expect(result).toMatch(/unavailable/i);
  });

  it("should return shipping info if quote can be fetched", () => {
    vi.mocked(getShippingQuote).mockReturnValue({ cost: 10, estimatedDays: 2 });
    const result = getShippingInfo("Omashu");
    // expect(result).toMatch("$10");
    // expect(result).toMatch(/2 days/i);
    expect(result).toMatch(/shipping cost: \$10 \(2 days\)/i);
  });
});

describe("renderPage", () => {
  it("should return correct content", async () => {
    const result = await renderPage();
    expect(result).toMatch(/content/i);
  });

  it("should call analytics", async () => {
    await renderPage();
    expect(trackPageView).toHaveBeenCalledWith("/home");
  });
});

describe("submitOrder", () => {
  const order = { totalAmount: 10 };
  const creditCard = { creditCardNumber: "1234" };

  it("should charge the customer", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "success" });
    await submitOrder(order, creditCard);
    expect(charge).toHaveBeenCalledWith(creditCard, order.totalAmount);
  });

  it("should return success if payment is successful", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "success" });
    const result = await submitOrder(order, creditCard);
    expect(result).toEqual({ success: true });
  });

  it("should return error if payment fails", async () => {
    vi.mocked(charge).mockResolvedValue({ status: "failed" });
    const result = await submitOrder(order, creditCard);
    expect(result).toEqual({ success: false, error: "payment_error" });
  });
});
describe("signUp", () => {
  const email = "testy.mctestyface@emailplace.com";

  it("should return false if email is not valid", async () => {
    const result = await signUp("z");
    expect(result).toBe(false);
  });

  it("should return true if email is valid", async () => {
    const result = await signUp(email);
    expect(result).toBe(true);
  });

  it("should send the welcom email if email is valid", async () => {
    const result = await signUp(email);
    expect(sendEmail).toHaveBeenCalled();
    const args = vi.mocked(sendEmail).mock.calls[0];
    expect(args[0]).toBe(email);
    expect(args[1]).toMatch(/welcome/i);
  });
});
