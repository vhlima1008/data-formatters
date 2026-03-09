import { describe, expect, test } from "vitest";
import { formatCurrency, formatCompactCurrency } from "../src";

describe("formatCurrency", () => {

  test("formats USD currency", () => {
    const result = formatCurrency(1000, { currency: "USD", locale: "en-US" });

    expect(result).toContain("1,000");
  });

  test("formats decimals correctly", () => {
    const result = formatCurrency(1234.56, { currency: "USD", locale: "en-US" });

    expect(result).toContain("1,234");
  });

  test("formats negative values", () => {
    const result = formatCurrency(-2000, { currency: "USD", locale: "en-US" });

    expect(result).toContain("-");
  });

  test("returns fallback for NaN", () => {
    const result = formatCurrency(NaN, { currency: "USD" });

    expect(result).toBe("—");
  });

});

describe("formatCompactCurrency", () => {

  test("formats compact millions", () => {
    const result = formatCompactCurrency(1200000, {
      currency: "USD",
      locale: "en-US"
    });

    expect(result.toLowerCase()).toMatch(/1\.[23].*m/);
  });

  test("formats small numbers without compact", () => {
    const result = formatCompactCurrency(500, {
      currency: "USD",
      locale: "en-US"
    });

    expect(result).toContain("500");
  });

});