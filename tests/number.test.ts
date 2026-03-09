import { describe, expect, test } from "vitest";
import { formatNumber, formatCompactNumber } from "../src";

describe("formatNumber", () => {

  test("formats integer numbers", () => {
    const result = formatNumber(1000, { locale: "en-US" });

    expect(result).toBe("1,000");
  });

  test("rounds decimals", () => {
    const result = formatNumber(1234.8, { locale: "en-US" });

    expect(result).toBe("1,235");
  });

  test("handles zero", () => {
    const result = formatNumber(0, { locale: "en-US" });

    expect(result).toBe("0");
  });

});

describe("formatCompactNumber", () => {

  test("formats thousands compactly", () => {
    const result = formatCompactNumber(1500, { locale: "en-US" });

    expect(result.toLowerCase()).toContain("1.5");
  });

  test("formats millions compactly", () => {
    const result = formatCompactNumber(2000000, { locale: "en-US" });

    expect(result.toLowerCase()).toMatch(/2.*m/);
  });

});