import { describe, expect, test } from "vitest";
import { formatName } from "../src";

describe("formatName", () => {

  test("converts lowercase to title case", () => {
    const result = formatName("victor hugo monteiro");

    expect(result).toBe("Victor Hugo Monteiro");
  });

  test("handles uppercase input", () => {
    const result = formatName("JOHN DOE");

    expect(result).toBe("John Doe");
  });

  test("trims spaces", () => {
    const result = formatName("   jane doe   ");

    expect(result).toBe("Jane Doe");
  });

});