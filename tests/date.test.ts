import { describe, expect, test } from "vitest";
import { formatDate } from "../src";

describe("formatDate", () => {

  test("formats date with default pattern", () => {
    const result = formatDate("2024-03-09T12:34:56Z", {
      locale: "en-US",
      timeZone: "UTC"
    });

    expect(result).toBe("03/09/2024");
  });

  test("accepts custom date options", () => {
    const result = formatDate("2024-03-09T12:34:56Z", {
      locale: "en-US",
      timeZone: "UTC",
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    expect(result).toBe("Mar 9, 2024");
  });

});
