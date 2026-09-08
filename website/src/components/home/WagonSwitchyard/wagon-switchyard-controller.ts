interface WagonSwitchyardController {
  destroy(): void;
}

interface NetworkInformationLike extends EventTarget {
  readonly saveData?: boolean;
}

const desktopPreviewQuery = "(min-width: 64rem) and (pointer: fine)";
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const previewIntervalMs = 5_000;

export function initializeWagonSwitchyard(
  root: HTMLElement,
): WagonSwitchyardController | undefined {
  const tabs = Array.from(
    root.querySelectorAll<HTMLAnchorElement>("[data-wagon-switchyard-tab]"),
  );
  const panels = Array.from(
    root.querySelectorAll<HTMLElement>("[data-wagon-switchyard-panel]"),
  );
  const rail = root.querySelector<HTMLElement>("[data-wagon-switchyard-rail]");
  const railItems = Array.from(rail?.children ?? []).filter(
    (child): child is HTMLLIElement => child instanceof HTMLLIElement,
  );

  if (
    !rail ||
    tabs.length !== 5 ||
    panels.length !== 5 ||
    railItems.length !== 5
  ) {
    return undefined;
  }

  const panelById = new Map(
    panels.map((panel) => [panel.dataset.wagonFamilyId, panel]),
  );

  if (
    tabs.some(
      (tab) =>
        !tab.dataset.wagonFamilyId || !panelById.has(tab.dataset.wagonFamilyId),
    )
  ) {
    return undefined;
  }

  const desktopQuery = window.matchMedia(desktopPreviewQuery);
  const reducedMotion = window.matchMedia(reducedMotionQuery);
  const connection = (
    navigator as Navigator & { connection?: NetworkInformationLike }
  ).connection;
  const cleanup: Array<() => void> = [];
  let timer: number | undefined;
  let isIntersecting = false;
  let previewIndex = 0;

  root.dataset.enhanced = "true";
  rail.setAttribute("role", "tablist");
  rail.setAttribute("aria-label", "Wagon family selector");
  railItems.forEach((item) => item.setAttribute("role", "presentation"));

  const clearPreviewTimer = () => {
    if (timer !== undefined) {
      window.clearTimeout(timer);
      timer = undefined;
    }
  };

  const hasReducedContext = () =>
    reducedMotion.matches || connection?.saveData === true;
  const isPreviewEligible = () =>
    desktopQuery.matches &&
    !hasReducedContext() &&
    isIntersecting &&
    !document.hidden;

  const updatePreviewState = (state: "active" | "paused") => {
    root.dataset.previewState = state;
  };

  const select = (id: string, focusTab = false, manual = false) => {
    if (manual) {
      previewIndex = tabs.findIndex((tab) => tab.dataset.wagonFamilyId === id);
    }

    tabs.forEach((tab) => {
      const selected = tab.dataset.wagonFamilyId === id;
      tab.setAttribute("aria-selected", String(selected));
      tab.toggleAttribute("aria-current", selected);
      tab.tabIndex = selected ? 0 : -1;
      tab.toggleAttribute("data-selected", selected);
      tab.classList.toggle("is-selected", selected);
    });

    panels.forEach((panel) => {
      const selected = panel.dataset.wagonFamilyId === id;
      panel.hidden = !selected;
      panel.classList.toggle("is-selected", selected);
    });

    root.dataset.activeFamily = id;
    root.dispatchEvent(
      new CustomEvent("wagon-family-change", {
        bubbles: true,
        detail: { id },
      }),
    );

    if (focusTab) {
      tabs.find((tab) => tab.dataset.wagonFamilyId === id)?.focus();
    }
  };

  const advancePreview = () => {
    if (!isPreviewEligible()) {
      clearPreviewTimer();
      return;
    }

    previewIndex = (previewIndex + 1) % tabs.length;
    const nextTab = tabs[previewIndex];

    if (!nextTab?.dataset.wagonFamilyId) {
      clearPreviewTimer();
      return;
    }

    select(nextTab.dataset.wagonFamilyId);
    timer = window.setTimeout(advancePreview, previewIntervalMs);
  };

  const startPreview = () => {
    if (!isPreviewEligible() || timer !== undefined) {
      return;
    }

    updatePreviewState("active");
    timer = window.setTimeout(advancePreview, previewIntervalMs);
  };

  const syncPreview = () => {
    if (!desktopQuery.matches || hasReducedContext()) {
      clearPreviewTimer();
      delete root.dataset.previewState;
      return;
    }

    if (!isPreviewEligible()) {
      clearPreviewTimer();
      updatePreviewState("paused");
      return;
    }

    if (timer === undefined) {
      startPreview();
    }
  };

  const defaultTab = tabs[0];

  if (!defaultTab?.dataset.wagonFamilyId) {
    return undefined;
  }

  tabs.forEach((tab) => {
    tab.setAttribute("role", "tab");
    tab.setAttribute(
      "aria-controls",
      `${root.id}-panel-${tab.dataset.wagonFamilyId}`,
    );
    tab.addEventListener("click", (event) => {
      event.preventDefault();
      select(tab.dataset.wagonFamilyId!, true, true);
    });
  });

  panels.forEach((panel) => {
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute(
      "aria-labelledby",
      `${root.id}-tab-${panel.dataset.wagonFamilyId}`,
    );
  });

  const onKeyDown = (event: KeyboardEvent) => {
    const currentIndex = tabs.findIndex(
      (tab) => tab.dataset.wagonFamilyId === root.dataset.activeFamily,
    );
    let targetIndex: number | undefined;

    if (event.key === "ArrowRight")
      targetIndex = (currentIndex + 1) % tabs.length;
    if (event.key === "ArrowLeft")
      targetIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") targetIndex = 0;
    if (event.key === "End") targetIndex = tabs.length - 1;

    if (targetIndex === undefined) return;

    event.preventDefault();
    const target = tabs[targetIndex];
    if (target?.dataset.wagonFamilyId) {
      select(target.dataset.wagonFamilyId, true, true);
    }
  };

  rail.addEventListener("keydown", onKeyDown);
  cleanup.push(() => rail.removeEventListener("keydown", onKeyDown));

  const observer = new IntersectionObserver(
    (entries) => {
      isIntersecting = entries.some(
        (entry) => entry.isIntersecting && entry.intersectionRatio >= 0.7,
      );
      syncPreview();
    },
    { threshold: [0, 0.7] },
  );
  observer.observe(root);
  cleanup.push(() => observer.disconnect());

  const onVisibilityChange = () => syncPreview();

  document.addEventListener("visibilitychange", onVisibilityChange);
  desktopQuery.addEventListener("change", syncPreview);
  reducedMotion.addEventListener("change", syncPreview);
  connection?.addEventListener("change", syncPreview);
  cleanup.push(
    () => document.removeEventListener("visibilitychange", onVisibilityChange),
    () => desktopQuery.removeEventListener("change", syncPreview),
    () => reducedMotion.removeEventListener("change", syncPreview),
    () => connection?.removeEventListener("change", syncPreview),
    () => railItems.forEach((item) => item.removeAttribute("role")),
  );

  select(defaultTab.dataset.wagonFamilyId);
  syncPreview();

  return {
    destroy() {
      clearPreviewTimer();
      cleanup.forEach((remove) => remove());
      delete root.dataset.enhanced;
      delete root.dataset.previewState;
    },
  };
}

/** Progressively enhance each independently rendered switchyard root. */
export function initializeWagonSwitchyards(): void {
  document
    .querySelectorAll<HTMLElement>("[data-wagon-switchyard]")
    .forEach((root) => initializeWagonSwitchyard(root));
}
