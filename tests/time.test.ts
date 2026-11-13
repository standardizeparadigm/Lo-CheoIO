import { describe, expect, it } from "vitest";
import { fmtCountdown, fmtTime } from "../src/utils/time";

describe("fmtTime", () => {
  it("formats whole minutes and zero-pads the seconds", () => {
    expect(fmtTime(0)).toBe("0:00");
    expect(fmtTime(5)).toBe("0:05");
    expect(fmtTime(59)).toBe("0:59");
    expect(fmtTime(60)).toBe("1:00");
    expect(fmtTime(125)).toBe("2:05");
  });

  it("floors fractional seconds instead of rounding up", () => {
    expect(fmtTime(59.99)).toBe("0:59");
    expect(fmtTime(60.5)).toBe("1:00");
  });

  it("rolls long runs into the minute field (no surprise hour column)", () => {
    expect(fmtTime(3600)).toBe("60:00");
    expect(fmtTime(5400)).toBe("90:00");
  });

  it("never renders a negative or non-finite value", () => {
    for (const bad of [-1, -0.5, NaN, Infinity, -Infinity]) {
      expect(fmtTime(bad)).toBe("0:00");
    }
  });
});

describe("fmtCountdown", () => {
  it("shows bare seconds under a minute", () => {
    expect(fmtCountdown(60)).toBe("1:00");
    expect(fmtCountdown(59)).toBe("59");
    expect(fmtCountdown(0.2)).toBe("1");
  });

  it("ceil-s so the last tick reads 1, not 0, and clamps junk", () => {
    expect(fmtCountdown(0)).toBe("0");
    expect(fmtCountdown(NaN)).toBe("0");
    expect(fmtCountdown(-3)).toBe("0");
  });
});
