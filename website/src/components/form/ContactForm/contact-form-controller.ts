type ContactFormServerResponse = {
  readonly status?: "success" | "error";
  readonly message?: string;
  readonly fieldErrors?: Partial<Record<string, string>>;
};

interface ContactFormController {
  destroy(): void;
}

const fieldNames = ["name", "email", "company", "message", "consent"] as const;

const responseMessage = (
  response: ContactFormServerResponse,
  fallback: string,
): string =>
  typeof response.message === "string" && response.message.trim().length > 0
    ? response.message
    : fallback;

function initializeContactForm(
  root: HTMLElement,
): ContactFormController | undefined {
  const form = root.querySelector<HTMLFormElement>("[data-contact-form-form]");
  const status = root.querySelector<HTMLElement>("[data-contact-form-status]");
  const submit = root.querySelector<HTMLButtonElement>(
    'button[type="submit"][data-action="button"]',
  );
  const spamInput = root.querySelector<HTMLInputElement>(
    "[data-contact-form-spam] input",
  );
  if (!form || !status || !submit || !spamInput) return undefined;

  const controls = fieldNames
    .map((name) => form.elements.namedItem(name))
    .filter(
      (element): element is HTMLInputElement | HTMLTextAreaElement =>
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement,
    );
  const errors = new Map(
    fieldNames.map((name) => [
      name,
      root.querySelector<HTMLElement>(`[data-contact-form-error="${name}"]`),
    ]),
  );

  const clearErrors = (): void => {
    for (const control of controls) control.removeAttribute("aria-invalid");
    for (const error of errors.values()) {
      if (!error) continue;
      error.hidden = true;
      error.textContent = "";
    }
  };

  const setPending = (pending: boolean): void => {
    if (pending) root.setAttribute("aria-busy", "true");
    else root.removeAttribute("aria-busy");
    if (pending) root.dataset.contactFormState = "pending";
    for (const control of controls) control.disabled = pending;
    submit.disabled = pending;
  };

  const announce = (
    message: string,
    state: "success" | "error" | "pending",
  ) => {
    status.textContent = message;
    status.dataset.state = state;
    status.hidden = false;
    root.dataset.contactFormState = state;
  };

  const showError = (response: ContactFormServerResponse): void => {
    setPending(false);
    const fieldErrors = response.fieldErrors ?? {};
    const firstError = fieldNames.find(
      (name) =>
        typeof fieldErrors[name] === "string" && fieldErrors[name]?.trim(),
    );
    for (const name of fieldNames) {
      const message = fieldErrors[name];
      const control = form.elements.namedItem(name);
      const error = errors.get(name);
      if (
        typeof message === "string" &&
        message.trim().length > 0 &&
        (control instanceof HTMLInputElement ||
          control instanceof HTMLTextAreaElement) &&
        error
      ) {
        control.setAttribute("aria-invalid", "true");
        error.textContent = message;
        error.hidden = false;
      }
    }
    announce(
      responseMessage(
        response,
        "We could not send your inquiry. Please review the form and try again.",
      ),
      "error",
    );
    const field = firstError ? form.elements.namedItem(firstError) : undefined;
    if (field instanceof HTMLElement) field.focus();
    else status.focus();
  };

  const onSubmit = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();
    clearErrors();
    if (spamInput.value.trim().length > 0) {
      announce("Thank you. Your inquiry has been received.", "success");
      root.dataset.contactFormSpamReceived = "true";
      status.focus();
      return;
    }

    setPending(true);
    announce("Sending your inquiry…", "pending");
    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
        credentials: "same-origin",
      });
      const payload = (await response
        .json()
        .catch(() => ({}))) as ContactFormServerResponse;
      if (!response.ok || payload.status === "error") {
        showError(payload);
      } else {
        form.reset();
        announce(
          responseMessage(
            payload,
            "Thank you. Your inquiry has been received.",
          ),
          "success",
        );
        status.focus();
      }
    } catch {
      showError({
        message:
          "We could not send your inquiry. Please check your connection and try again.",
      });
    } finally {
      setPending(false);
    }
  };

  root.dataset.enhanced = "true";
  root.dataset.contactFormState = "idle";
  form.addEventListener("submit", onSubmit);
  return {
    destroy(): void {
      form.removeEventListener("submit", onSubmit);
      delete root.dataset.enhanced;
      delete root.dataset.contactFormState;
      delete root.dataset.contactFormSpamReceived;
      delete root.dataset.controllerInitialized;
    },
  };
}

/** Initializes each independently rendered form without page-global submission state. */
export function initializeContactForms(): void {
  for (const root of document.querySelectorAll<HTMLElement>(
    "[data-contact-form]",
  )) {
    if (root.dataset.controllerInitialized === "true") continue;
    const controller = initializeContactForm(root);
    if (controller) root.dataset.controllerInitialized = "true";
  }
}
