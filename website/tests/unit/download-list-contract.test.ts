import { describe, expect, it } from "vitest";

import {
  approvedDownloadEntries,
  isExternalDownload,
  validateDownloadListProps,
} from "../../src/components/product/DownloadList/download-list-contract";
import type { DownloadListProps } from "../../src/components/product/DownloadList/DownloadList.types";

const approvedDownload = {
  title: "Approved fixture document",
  href: "/fixtures/download-list/fixture-document.txt",
  fileType: "TXT",
  fileSize: "32 B",
  language: "English",
  revisionDate: "2026-09-04",
  publicationStatus: "approved" as const,
  source: { reference: "Component-lab fixture file endpoint" },
};

const validProps = (): DownloadListProps => ({
  title: "Available source files",
  headingLevel: 2,
  downloads: [approvedDownload],
});

describe("DownloadList contract", () => {
  it("preserves approved source order while excluding withheld records and permitting absent input", () => {
    const downloads = [
      approvedDownload,
      {
        ...approvedDownload,
        title: "Draft record",
        publicationStatus: "draft" as const,
      },
      {
        ...approvedDownload,
        title: "Unverified record",
        publicationStatus: "unverified" as const,
      },
    ];

    expect(() =>
      validateDownloadListProps({ ...validProps(), downloads }),
    ).not.toThrow();
    expect(approvedDownloadEntries(downloads)).toEqual([approvedDownload]);
    expect(approvedDownloadEntries(undefined)).toEqual([]);
    expect(() =>
      validateDownloadListProps({ title: "No files", headingLevel: 3 }),
    ).not.toThrow();
    expect(isExternalDownload("https://documents.example.test/file.pdf")).toBe(
      true,
    );
    expect(isExternalDownload("/downloads/file.pdf")).toBe(false);
  });

  it("rejects blank metadata and missing or placeholder file destinations", () => {
    const props = validProps();

    expect(() => validateDownloadListProps({ ...props, title: " " })).toThrow(
      "non-empty title",
    );
    expect(() =>
      validateDownloadListProps({
        ...props,
        downloads: [{ ...approvedDownload, href: "" }],
      }),
    ).toThrow("real internal file path");
    expect(() =>
      validateDownloadListProps({
        ...props,
        downloads: [{ ...approvedDownload, href: "#" }],
      }),
    ).toThrow("placeholder destinations");
    expect(() =>
      validateDownloadListProps({
        ...props,
        downloads: [{ ...approvedDownload, language: " " }],
      }),
    ).toThrow("file type, language");
    expect(() =>
      validateDownloadListProps({
        ...props,
        downloads: [{ ...approvedDownload, fileSize: " " }],
      }),
    ).toThrow("file sizes must be omitted");
  });
});
