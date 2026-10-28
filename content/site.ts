/**
 * Everything about the foundation that changes over time lives here.
 * Fields set to `null` are hidden on the site until they are filled in,
 * so the site never shows placeholder bank or payment details.
 */

export type BankDetails = {
  accountName: string;
  bankName: string;
  sortCode: string;
  accountNumber: string;
  /** Optional, for donors paying from outside the UK. */
  iban?: string;
  bic?: string;
};

export type RegistrationStatus =
  | { kind: "in-progress" }
  | { kind: "registered"; charityNumber: string; regulator: string };

export const site = {
  name: "Mubashir Kaleem Foundation",
  shortName: "MK Foundation",
  memorialOf: "Mubashir Ahmad Kaleem Sulehri",
  tagline: "A teacher’s work, carried on for the children of Pakistan.",
  description:
    "The Mubashir Kaleem Foundation feeds hungry families, cares for orphans, and helps children in Pakistan stay in school and in good health. Founded in memory of a Pakistani school teacher.",

  /** What search engines show for the home page. Keep the title under ~60 characters and the description under ~155. */
  seo: {
    title: "Mubashir Kaleem Foundation | Charity for children in Pakistan",
    description:
      "In memory of a Pakistani school teacher, we feed hungry families, support orphans and keep children in school and healthy in Pakistan. Give from the UK.",
  },

  // The live domain. NEXT_PUBLIC_SITE_URL overrides it at build time.
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://mubashirkaleem.foundation",

  registration: { kind: "in-progress" } as RegistrationStatus,

  contact: {
    // TODO: the foundation’s email address.
    email: null as string | null,
    // TODO: WhatsApp number in international format without "+" or spaces, e.g. "447700900123".
    whatsapp: null as string | null,
    /** Where the foundation is run from. */
    baseLocation: "London, United Kingdom",
  },

  donate: {
    // TODO: a dedicated bank account in the foundation’s name.
    bank: null as BankDetails | null,
    // TODO: PayPal "Donate" button link, e.g. "https://www.paypal.com/donate/?hosted_button_id=XXXX".
    paypalUrl: null as string | null,
    /** Show the Zakat and Sadaqah section only once a separate Zakat fund is in place. */
    acceptsZakat: false,
  },

  /** TODO: full URLs of the foundation’s social profiles (Facebook, Instagram, X, YouTube…). They help search engines connect them to this site. */
  social: [] as string[],

  /**
   * TODO: verification codes from Google Search Console and Bing Webmaster Tools
   * (the "HTML tag" method: copy only the content="…" value).
   */
  verification: {
    google: null as string | null,
    bing: null as string | null,
  },

  forms: {
    // TODO: a free Web3Forms access key (https://web3forms.com). Without it, the
    // contact page shows email and WhatsApp only.
    web3formsKey: null as string | null,
  },
} as const;

export const registrationLine =
  site.registration.kind === "registered"
    ? `Registered charity number ${site.registration.charityNumber} (${site.registration.regulator})`
    : "Charity registration in progress. We are not yet a registered charity, so we cannot claim Gift Aid.";

export const nav = [
  { href: "/about/", label: "His story" },
  { href: "/causes/", label: "Our work" },
  { href: "/transparency/", label: "Where money goes" },
  { href: "/contact/", label: "Contact" },
] as const;
