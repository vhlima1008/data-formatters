import { describe, expect, test } from "vitest";
import { formatDateTime } from "../src";

describe("formatDateTime", () => {

  test("formats datetime with default styles", () => {
    const result = formatDateTime("2024-03-09T12:34:00Z", {
      locale: "en-US",
      timeZone: "UTC"
    });

    expect(result).toContain("Mar");
    expect(result).toContain("2024");
    expect(result).toContain("12:34 PM");
  });

  test("accepts custom datetime options", () => {
    const result = formatDateTime("2024-03-09T12:34:00Z", {
      locale: "en-US",
      timeZone: "UTC",
      dateStyle: "short",
      timeStyle: "medium"
    });

    expect(result).toContain("3/9/24");
    expect(result).toContain("12:34:00 PM");
  });

});
