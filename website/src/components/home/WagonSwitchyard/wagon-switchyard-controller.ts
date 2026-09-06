interface WagonSwitchyardController {
  destroy(): void;
}

function initializeWagonSwitchyard(
  root: HTMLElement,
): WagonSwitchyardController | undefined {
  const tabs = Array.from(
    root.querySelectorAll<HTMLAnchorElement>("[data-wagon-switchyard-tab]"),
  );
  const panels = Array.from(
    root.querySelectorAll<HTMLElement>("[data-wagon-switchyard-panel]"),
  );
  if (tabs.length !== 5 || panels.length !== 5) return undefined;

  const panelById = new Map(
    panels.map((panel) => [panel.dataset.wagonFamilyId, panel]),
  );
  if (
    panelById.size !== 5 ||
    tabs.some((tab) => !panelById.has(tab.dataset.wagonFamilyId))
  ) {
    return undefined;
  }

  const rail = root.querySelector<HTMLElement>("[data-wagon-switchyard-rail]");
  if (!rail) return undefined;
  root.dataset.enhanced = "true";
  rail.setAttribute("role", "tablist");
  rail.setAttribute(
    "aria-label",
    rail.dataset.wagonSwitchyardRailLabel ?? "Wagon families",
  );
  const cleanup: Array<() => void> = [];

  const select = (id: string, focusTab = false): void => {
    const nextPanel = panelById.get(id);
    if (!nextPanel) return;

    for (const tab of tabs) {
      const selected = tab.dataset.wagonFamilyId === id;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
      tab.classList.toggle("is-selected", selected);
    }
    for (const panel of panels) {
      const selected = panel === nextPanel;
      panel.hidden = !selected;
      panel.classList.toggle("is-selected", selected);
    }
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

  for (const [index, tab] of tabs.entries()) {
    const id = tab.dataset.wagonFamilyId;
    const panel = id ? panelById.get(id) : undefined;
    if (!id || !panel) return undefined;

    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", panel.id);
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tab.id);
    const listItem = tab.parentElement;
    listItem?.setAttribute("role", "presentation");

    const onClick = (event: MouseEvent): void => {
      event.preventDefault();
      select(id, true);
    };
    const onKeyDown = (event: KeyboardEvent): void => {
      const keyToIndex: Record<string, number | undefined> = {
        ArrowLeft: (index + tabs.length - 1) % tabs.length,
        ArrowRight: (index + 1) % tabs.length,
        Home: 0,
        End: tabs.length - 1,
      };
      const nextIndex = keyToIndex[event.key];
      if (nextIndex === undefined) return;
      const next = tabs[nextIndex];
      const nextId = next?.dataset.wagonFamilyId;
      if (!nextId) return;
      event.preventDefault();
      select(nextId, true);
    };

    tab.addEventListener("click", onClick);
    tab.addEventListener("keydown", onKeyDown);
    tab.dataset.controllerInitialized = "true";
    cleanup.push(() => {
      tab.removeEventListener("click", onClick);
      tab.removeEventListener("keydown", onKeyDown);
      delete tab.dataset.controllerInitialized;
      listItem?.removeAttribute("role");
    });
  }

  const activeId = tabs[0]?.dataset.wagonFamilyId;
  if (!activeId) return undefined;
  select(activeId);

  return {
    destroy(): void {
      cleanup.forEach((dispose) => dispose());
      delete root.dataset.enhanced;
    },
  };
}

export function initializeWagonSwitchyards(): void {
  for (const root of document.querySelectorAll<HTMLElement>(
    "[data-wagon-switchyard]",
  )) {
    if (root.dataset.controllerInitialized === "true") continue;
    const controller = initializeWagonSwitchyard(root);
    if (controller) root.dataset.controllerInitialized = "true";
  }
}
