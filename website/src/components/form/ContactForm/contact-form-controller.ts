import { buildContactMailtoHref } from "./contact-form-mailto";

interface ContactFormController {
  destroy(): void;
}

type TextControlName = "name" | "email" | "company" | "message";

function formControlValue(
  form: HTMLFormElement,
  name: TextControlName,
): string {
  const control = form.elements.namedItem(name);
  return control instanceof HTMLInputElement ||
    control instanceof HTMLTextAreaElement
    ? control.value
    : "";
}

function initializeContactForm(
  root: HTMLElement,
): ContactFormController | undefined {
  const form = root.querySelector<HTMLFormElement>("[data-contact-form-form]");
  const status = root.querySelector<HTMLElement>("[data-contact-form-status]");
  const mailto = root.querySelector<HTMLAnchorElement>(
    "[data-contact-form-mailto]",
  );
  const recipient = root.dataset.contactFormRecipient;
  const subject = root.dataset.contactFormSubject;
  const openedMessage = root.dataset.contactFormOpenedMessage;
  if (!form || !status || !mailto || !recipient || !subject || !openedMessage) {
    return undefined;
  }

  const label = (name: TextControlName | "context"): string =>
    form.dataset[`contactForm${name[0]!.toUpperCase()}${name.slice(1)}Label`] ??
    name;

  const onSubmit = (event: SubmitEvent): void => {
    event.preventDefault();
    const contextControl = form.elements.namedItem("context");
    const contextValue =
      contextControl instanceof HTMLInputElement ? contextControl.value : "";

    mailto.href = buildContactMailtoHref({
      recipient,
      subject,
      name: { label: label("name"), value: formControlValue(form, "name") },
      email: {
        label: label("email"),
        value: formControlValue(form, "email"),
      },
      company: {
        label: label("company"),
        value: formControlValue(form, "company"),
      },
      message: {
        label: label("message"),
        value: formControlValue(form, "message"),
      },
      ...(contextValue.trim().length > 0
        ? { context: { label: label("context"), value: contextValue } }
        : {}),
    });

    root.dataset.contactFormState = "prepared";
    status.textContent = openedMessage;
    status.dataset.state = "prepared";
    status.hidden = false;
    mailto.click();
    status.focus();
  };

  root.dataset.enhanced = "true";
  root.dataset.contactFormState = "idle";
  form.addEventListener("submit", onSubmit);
  return {
    destroy(): void {
      form.removeEventListener("submit", onSubmit);
      delete root.dataset.enhanced;
      delete root.dataset.contactFormState;
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
