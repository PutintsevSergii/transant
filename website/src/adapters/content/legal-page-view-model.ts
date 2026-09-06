import type { ContactFormProps } from "../../components/form/ContactForm/ContactForm.types";
import type { LegalDocumentProps } from "../../components/legal/LegalDocument/LegalDocument.types";
import type { PageHeroProps } from "../../components/editorial/PageHero/PageHero.types";
import type { BaseLayoutProps } from "../../layouts/BaseLayout.types";
import { createSiteLayout } from "./site-shell-view-model";

export interface ContactPageViewModel {
  readonly layout: BaseLayoutProps;
  readonly hero: PageHeroProps;
  readonly form: ContactFormProps;
  readonly addressLines: readonly [string, ...string[]];
  readonly phone: string;
  readonly email: string;
}

export interface LegalPageViewModel {
  readonly layout: BaseLayoutProps;
  readonly hero: PageHeroProps;
  readonly document: LegalDocumentProps;
}

export interface NotFoundPageViewModel {
  readonly layout: BaseLayoutProps;
  readonly title: string;
  readonly description: string;
  readonly recoveryLinks: readonly [
    { readonly label: string; readonly href: string },
    ...{ readonly label: string; readonly href: string }[],
  ];
}

const contactEmail = "office@transant.com";

export const contactPageViewModel: ContactPageViewModel = {
  layout: createSiteLayout(
    "Contact TransANT",
    "Contact TransANT about a freight wagon solution tailored to your transport requirements.",
    "/contact/",
  ),
  hero: {
    eyebrow: "Contact",
    title: "Let’s discuss your transport requirements",
    description:
      "Tell us about the freight wagon solution you need. We look forward to discussing it with you.",
    headingLevel: 1,
    theme: "light",
  },
  form: {
    recipient: contactEmail,
    subject: "Freight wagon enquiry from the TransANT website",
    fields: {
      name: { label: "Name", placeholder: "Your name" },
      email: {
        label: "Business email",
        help: "Use an address where TransANT can respond to this enquiry.",
        placeholder: "name@company.com",
      },
      company: { label: "Company", placeholder: "Your organisation" },
      message: {
        label: "Transport requirement",
        help: "Include the cargo, route, operating constraints, and relevant wagon context.",
        placeholder: "Tell us what you are planning.",
      },
      consent: {
        label: "I have read the privacy information.",
      },
    },
    privacyNotice: { label: "Privacy information", href: "/privacy/" },
    submitLabel: "Continue in email",
    labels: {
      privacyPrefix: "Your details are handled according to our",
      mailClientHint:
        "This opens your email application with the enquiry prepared. Review and send it from there.",
      mailClientOpened:
        "Your email application should open with the enquiry prepared. Review it and send it from there.",
    },
  },
  addressLines: ["TransAnt GmbH", "voestalpine-Straße 3", "4020 Linz, Austria"],
  phone: "+43 664 88324966",
  email: contactEmail,
};

// Source authority for the legal copy below:
// https://www.transant.com/Impressum
// https://www.transant.com/Impressum/Datenschutz
// https://www.transant.com/en/About-us/DataProtection
// The German Impressum controls where its old English rendering conflicts with
// the source company form. Service-specific text is limited to what this build
// actually deploys: Vercel hosting, contact handling, and no analytics.
const legalPageViewModels = {
  privacy: {
    layout: createSiteLayout(
      "Privacy information",
      "How TransAnt GmbH handles personal data when you visit this website or contact the company.",
      "/privacy/",
    ),
    hero: {
      eyebrow: "Privacy",
      title: "Privacy information",
      description:
        "How TransAnt GmbH processes and protects personal data connected with this website and business enquiries.",
      headingLevel: 1,
      theme: "light",
    },
    document: {
      introduction:
        "Protecting personal data is important to TransAnt GmbH. This information describes the data used to provide the website and respond to business enquiries.",
      sections: [
        {
          title: "Controller and contact",
          paragraphs: [
            "TransAnt GmbH, voestalpine-Straße 3, 4020 Linz, Austria, is responsible for the processing described here.",
            "You can contact us at office@transant.com or by telephone on +43 664 88324966.",
          ],
        },
        {
          title: "Personal data",
          paragraphs: [
            "Personal data is information relating to an identified or identifiable individual, such as a name, email address, telephone number or IP address.",
          ],
        },
        {
          title: "Contacting us",
          paragraphs: [
            "When you contact us by email or telephone, we process the information you provide, such as your name, business contact details, company, enquiry and related project information, so that we can respond and, where applicable, take steps before entering into a contract. The website contact form only prepares this information in your chosen email application; the website does not send or store the enquiry.",
            "The processing is based on Article 6(1)(b) GDPR where it is necessary for contractual or pre-contractual steps and Article 6(1)(f) GDPR where it supports our legitimate interest in answering and managing business enquiries.",
          ],
        },
        {
          title: "Website hosting and technical operation",
          paragraphs: [
            "This website is hosted on Vercel. When the site is requested, technical connection data such as the IP address and request information may be processed as necessary to deliver, secure and operate the website.",
            "Service providers acting for us are required to handle personal data in accordance with applicable data-protection obligations. Where data is transferred outside the European Economic Area, a legally recognised transfer mechanism and appropriate safeguards must apply.",
          ],
        },
        {
          title: "Cookies and analytics",
          paragraphs: [
            "This version of the website does not use Google Analytics, marketing trackers or social-media plugins and does not intentionally set non-essential cookies.",
            "If the services used by the website change, this privacy information will be updated before additional tracking or consent-dependent technology is enabled.",
          ],
        },
        {
          title: "Retention",
          paragraphs: [
            "Personal data is deleted when it is no longer needed for the purpose for which it was collected, unless statutory retention duties or the establishment, exercise or defence of legal claims require it to be kept for longer.",
          ],
        },
        {
          title: "Your rights",
          paragraphs: [
            "Subject to the conditions of the GDPR, you may request access to, correction or erasure of your personal data, restriction of processing, data portability, or object to processing. Where processing is based on consent, you may withdraw that consent at any time without affecting processing that was lawful before withdrawal.",
            "To exercise your rights, email office@transant.com. You also have the right to lodge a complaint with the competent data-protection supervisory authority.",
          ],
        },
        {
          title: "Data security",
          paragraphs: [
            "We use organisational and technical measures intended to protect personal data against loss, misuse, unauthorised access, alteration and disclosure. Access is limited to people and service providers who require it for the relevant purpose.",
          ],
        },
      ],
    },
  },
  imprint: {
    layout: createSiteLayout(
      "Imprint",
      "Legal and company information for TransAnt GmbH.",
      "/imprint/",
    ),
    hero: {
      eyebrow: "Imprint",
      title: "TransAnt GmbH company information",
      description: "Official legal and contact information for TransAnt GmbH.",
      headingLevel: 1,
      theme: "light",
    },
    document: {
      introduction:
        "Legal and contact information for TransAnt GmbH, translated from the company’s official German Impressum.",
      sections: [
        {
          title: "Company and register information",
          paragraphs: [
            "TransAnt GmbH is an Austrian limited liability company (Gesellschaft mit beschränkter Haftung).",
            "Company register court: Commercial Court of Linz (Handelsgericht Linz). Company register number: FN 544665 d.",
            "VAT identification number: ATU76434529.",
          ],
        },
        {
          title: "Contact information",
          paragraphs: [
            "TransAnt GmbH, voestalpine-Straße 3, 4020 Linz, Austria.",
            "Telephone: +43 664 88324966. Email: office@transant.com.",
          ],
        },
        {
          title: "Copyright and permitted use",
          paragraphs: [
            "Content on this website may be protected by ownership and copyright rights, including logos, images, audio and video. Downloading, printing or storing website files is permitted for private use only; any other use requires the express permission of TransAnt GmbH.",
          ],
        },
        {
          title: "Liability and external links",
          paragraphs: [
            "To the extent permitted by law, TransAnt GmbH accepts no liability for direct, indirect or other loss resulting from the use or unavailability of information on this website.",
            "TransAnt GmbH is not responsible for the content of external websites reached through links from this site.",
          ],
        },
        {
          title: "Language",
          paragraphs: [
            "References to people are intended to include all genders, even where a particular grammatical form is used for readability.",
          ],
        },
      ],
    },
  },
} as const satisfies Record<string, LegalPageViewModel>;

export const legalPageSlugs = ["privacy", "imprint"] as const;

export function legalPageViewModel(slug: string): LegalPageViewModel {
  const page = legalPageViewModels[slug as keyof typeof legalPageViewModels];
  if (!page) {
    throw new Error(`Unknown legal page: ${slug}.`);
  }
  return page;
}

export const notFoundPageViewModel: NotFoundPageViewModel = {
  layout: createSiteLayout(
    "Page not found",
    "The requested TransANT page is not available. Return to the homepage or browse the wagon catalogue.",
    "/404/",
  ),
  title: "Page not found",
  description:
    "Return to the homepage, explore the wagon catalogue, or contact TransANT.",
  recoveryLinks: [
    { label: "Go to the homepage", href: "/" },
    { label: "Browse wagon families", href: "/wagons/" },
    { label: "Contact TransANT", href: "/contact/" },
  ],
};
