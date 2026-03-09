import { describe, expect, test } from "vitest";
import { formatDuration } from "../src";

describe("formatDuration", () => {

  test("formats only seconds", () => {
    const result = formatDuration(59);

    expect(result).toBe("59s");
  });

  test("formats minutes and seconds", () => {
    const result = formatDuration(125);

    expect(result).toBe("2m 5s");
  });

  test("formats hours, minutes and seconds", () => {
    const result = formatDuration(3661);

    expect(result).toBe("1h 1m 1s");
  });

  test("handles zero duration", () => {
    const result = formatDuration(0);

    expect(result).toBe("0s");
  });

});
