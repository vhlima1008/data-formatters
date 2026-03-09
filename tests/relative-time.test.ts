import { describe, expect, test } from "vitest";
import { formatRelativeTime } from "../src";

describe("formatRelativeTime", () => {

  test("formats past relative time", () => {
    const result = formatRelativeTime(-1, "day", "en-US");

    expect(result).toBe("yesterday");
  });

  test("formats future relative time", () => {
    const result = formatRelativeTime(2, "day", "en-US");

    expect(result).toBe("in 2 days");
  });

  test("uses provided locale", () => {
    const result = formatRelativeTime(-1, "day", "pt-BR");

    expect(result).toContain("ontem");
  });

});
