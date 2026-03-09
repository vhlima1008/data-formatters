import { describe, expect, test } from "vitest";
import { formatCurrency, formatNumber } from "../src";

describe("locale support", () => {

  test("formats pt-BR currency", () => {
    const result = formatCurrency(1000, {
      currency: "BRL",
      locale: "pt-BR"
    });

    expect(result).toContain("1.000");
  });

  test("formats de-DE number", () => {
    const result = formatNumber(1000, { locale: "de-DE" });

    expect(result).toContain("1.000");
  });

  test("formats en-US number", () => {
    const result = formatNumber(1000, { locale: "en-US" });

    expect(result).toContain("1,000");
  });

});