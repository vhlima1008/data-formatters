import { describe, expect, test } from "vitest";
import { formatBytes } from "../src";

describe("formatBytes", () => {

  test("formats zero bytes", () => {
    const result = formatBytes(0);

    expect(result).toBe("0 B");
  });

  test("formats kilobytes", () => {
    const result = formatBytes(1024);

    expect(result).toBe("1 KB");
  });

  test("respects decimals option", () => {
    const result = formatBytes(1536, 1);

    expect(result).toBe("1.5 KB");
  });

});
