import type {
  DownloadListEntry,
  DownloadListProps,
} from "./DownloadList.types";

const isNonEmpty = (value: string): boolean => value.trim().length > 0;

const isRealFileDestination = (href: string): boolean => {
  if (!isNonEmpty(href) || href === "#" || href === "about:blank") {
    return false;
  }

  if (href.startsWith("/")) {
    return !href.startsWith("//") && !/\s/.test(href);
  }

  try {
    return new URL(href).protocol === "https:";
  } catch {
    return false;
  }
};

const validateEntry = (entry: DownloadListEntry): void => {
  if (
    !isNonEmpty(entry.title) ||
    !isNonEmpty(entry.fileType) ||
    !isNonEmpty(entry.language) ||
    !isNonEmpty(entry.source.reference)
  ) {
    throw new Error(
      "DownloadList entries require non-empty title, file type, language, and source reference.",
    );
  }

  if (!isRealFileDestination(entry.href)) {
    throw new Error(
      "DownloadList entries require a real internal file path or HTTPS file URL; placeholder destinations are not supported.",
    );
  }

  if (entry.fileSize !== undefined && !isNonEmpty(entry.fileSize)) {
    throw new Error(
      "DownloadList file sizes must be omitted when unavailable or contain a source-supplied value.",
    );
  }

  if (entry.revisionDate !== undefined && !isNonEmpty(entry.revisionDate)) {
    throw new Error(
      "DownloadList revision dates must be omitted when unavailable or contain a source-supplied value.",
    );
  }
};

/** Fails before render when a caller attempts to expose incomplete file data. */
export const validateDownloadListProps = (props: DownloadListProps): void => {
  if (!isNonEmpty(props.title)) {
    throw new Error("DownloadList requires a non-empty title.");
  }

  if (props.source !== undefined && !isNonEmpty(props.source.reference)) {
    throw new Error(
      "DownloadList collection sources must be omitted or contain a non-empty reference.",
    );
  }

  props.downloads?.forEach(validateEntry);
};

/** Applies the F-002 publication boundary without changing caller-owned records. */
export const approvedDownloadEntries = (
  downloads: DownloadListProps["downloads"],
): readonly DownloadListEntry[] =>
  downloads?.filter((download) => download.publicationStatus === "approved") ??
  [];

/** C-002 receives explicit same-site/external link semantics rather than inferring them. */
export const isExternalDownload = (href: string): boolean =>
  href.startsWith("https://");
