import { afterEach, describe, expect, it, vi } from "vitest";
import { copyText } from "../src/utils/clipboard";

const original = Object.getOwnPropertyDescriptor(globalThis, "navigator");

function setClipboard(value: unknown) {
  Object.defineProperty(globalThis, "navigator", {
    value,
    configurable: true,
    writable: true,
  });
}

afterEach(() => {
  if (original) Object.defineProperty(globalThis, "navigator", original);
  vi.restoreAllMocks();
});

describe("copyText", () => {
  it("resolves true when the clipboard API accepts the write", async () => {
    const writeText = vi.fn(async () => {});
    setClipboard({ clipboard: { writeText } });
    await expect(copyText("hello")).resolves.toBe(true);
    expect(writeText).toHaveBeenCalledWith("hello");
  });

  it("resolves false when the API is missing (insecure origin / old Safari)", async () => {
    setClipboard({});
    await expect(copyText("hello")).resolves.toBe(false);
  });

  it("resolves false when writeText rejects instead of throwing to the caller", async () => {
    setClipboard({
      clipboard: {
        writeText: vi.fn(async () => {
          throw new Error("NotAllowedError");
        }),
      },
    });
    await expect(copyText("hello")).resolves.toBe(false);
  });
});
