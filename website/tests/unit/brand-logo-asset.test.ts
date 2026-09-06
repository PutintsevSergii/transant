import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

const logoPath = join(process.cwd(), "public", "brand", "transant-logo.png");
const expectedDigest =
  "fc0a30fff3e99c2a7af66ca78d04af82218a035c0926b11c2d5418d14ac0c985";

function readPngDimension(bytes: Buffer, offset: number): number {
  return bytes.readUInt32BE(offset);
}

describe("approved TransANT logo asset", () => {
  it("remains the approved PNG at its recorded digest and intrinsic dimensions", async () => {
    const bytes = await readFile(logoPath);

    expect(bytes.subarray(0, 8)).toEqual(
      Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    );
    expect(createHash("sha256").update(bytes).digest("hex")).toBe(
      expectedDigest,
    );
    expect(readPngDimension(bytes, 16)).toBe(520);
    expect(readPngDimension(bytes, 20)).toBe(114);
  });
});
