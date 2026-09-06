const compactQuery = window.matchMedia("(max-width: 63.9375rem)");

interface HeaderController {
  destroy(): void;
}

const activeRoots = new Set<HTMLElement>();

function getFocusable(root: HTMLElement): HTMLElement[] {
  return Array.from(
    root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute("hidden"));
}

function syncBackgroundInertness(): void {
  const activeRoot = activeRoots.values().next().value as
    HTMLElement | undefined;

  for (const child of Array.from(document.body.children)) {
    if (child === activeRoot || child.tagName === "SCRIPT") continue;
    (child as HTMLElement).inert = Boolean(activeRoot);
  }
}

function initializeHeader(root: HTMLElement): HeaderController | undefined {
  const trigger = root.querySelector<HTMLButtonElement>(
    "[data-header-trigger]",
  );
  const panel = root.querySelector<HTMLElement>("[data-header-panel]");
  const closeButton = root.querySelector<HTMLButtonElement>(
    "[data-header-close]",
  );
  const title = root.querySelector<HTMLElement>("[data-header-panel-title]");

  if (!trigger || !panel || !closeButton || !title) return undefined;

  let isOpen = false;
  root.dataset.enhanced = "true";

  const open = (): void => {
    if (!compactQuery.matches || isOpen) return;

    isOpen = true;
    panel.hidden = false;
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-modal", "true");
    root.dataset.menuOpen = "true";
    trigger.setAttribute("aria-expanded", "true");
    activeRoots.add(root);
    syncBackgroundInertness();
    title.focus();
  };

  const close = (returnFocus: boolean): void => {
    if (!isOpen) return;

    isOpen = false;
    panel.hidden = true;
    panel.removeAttribute("role");
    panel.removeAttribute("aria-modal");
    delete root.dataset.menuOpen;
    trigger.setAttribute("aria-expanded", "false");
    activeRoots.delete(root);
    syncBackgroundInertness();
    if (returnFocus) trigger.focus();
  };

  const setCompactMode = (): void => {
    if (compactQuery.matches) {
      trigger.hidden = false;
      if (!isOpen) panel.hidden = true;
      return;
    }

    close(false);
    trigger.hidden = true;
    panel.hidden = false;
  };

  const onTriggerClick = (): void => {
    if (isOpen) close(true);
    else open();
  };

  const onCloseClick = (): void => close(true);

  const onKeyDown = (event: KeyboardEvent): void => {
    if (!isOpen) return;
    if (event.key === "Escape") {
      event.preventDefault();
      close(true);
      return;
    }
    if (event.key !== "Tab") return;

    const focusable = getFocusable(panel);
    const first = focusable[0];
    const last = focusable.at(-1);
    if (!first || !last) return;

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const onPointerDown = (event: PointerEvent): void => {
    if (
      isOpen &&
      event.target instanceof Node &&
      !root.contains(event.target)
    ) {
      close(true);
    }
  };

  const onPanelClick = (event: MouseEvent): void => {
    if (event.target instanceof Element && event.target.closest("a[href]")) {
      close(false);
    }
  };

  trigger.addEventListener("click", onTriggerClick);
  closeButton.addEventListener("click", onCloseClick);
  document.addEventListener("keydown", onKeyDown);
  document.addEventListener("pointerdown", onPointerDown, true);
  panel.addEventListener("click", onPanelClick);
  compactQuery.addEventListener("change", setCompactMode);
  setCompactMode();

  return {
    destroy(): void {
      close(false);
      trigger.removeEventListener("click", onTriggerClick);
      closeButton.removeEventListener("click", onCloseClick);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown, true);
      panel.removeEventListener("click", onPanelClick);
      compactQuery.removeEventListener("change", setCompactMode);
      delete root.dataset.enhanced;
    },
  };
}

export function initializeSiteHeaders(): void {
  for (const root of document.querySelectorAll<HTMLElement>(
    "[data-site-header]",
  )) {
    if (root.dataset.controllerInitialized === "true") continue;
    const controller = initializeHeader(root);
    if (controller) root.dataset.controllerInitialized = "true";
  }
}
