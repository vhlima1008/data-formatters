import { describe, expect, test } from "vitest";
import { formatPercent, formatCompactPercent } from "../src";

describe("formatPercent", () => {

  test("formats percentage values", () => {
    const result = formatPercent(0.25, { locale: "en-US" });

    expect(result).toContain("25");
  });

  test("formats decimal percent correctly", () => {
    const result = formatPercent(0.1234, { locale: "en-US" });

    expect(result).toContain("12");
  });

  test("handles zero percent", () => {
    const result = formatPercent(0, { locale: "en-US" });

    expect(result).toContain("0");
  });

});

describe("formatCompactPercent", () => {

  test("limits decimals", () => {
    const result = formatCompactPercent(0.12345, { locale: "en-US" });

    expect(result).toContain("12");
  });

});