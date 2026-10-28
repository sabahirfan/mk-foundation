/**
 * The four areas of work. Each becomes a page at /causes/<slug>/.
 *
 * TODO: the giving amounts below are first estimates based on typical costs in
 * Pakistan. Confirm them with the people delivering the work before launch.
 */

export type GivingLevel = {
  amount: string;
  buys: string;
};

export type Cause = {
  slug: "orphans" | "food" | "education" | "medical";
  title: string;
  /** One line for lists and cards. */
  summary: string;
  /** What search engines show: a title that names Pakistan, and a description under ~155 characters. */
  seo: { title: string; description: string };
  /** Short handwritten note shown in the page margin. */
  marginNote: string;
  /** Reference donors add to a bank transfer so the gift goes to this work. */
  reference: string;
  need: string[];
  whatWeDo: string[];
  giving: GivingLevel[];
};

export const causes: Cause[] = [
  {
    slug: "orphans",
    title: "Caring for orphans",
    summary:
      "Food, schooling and a steady adult in the life of a child who has lost a parent.",
    seo: {
      title: "Support orphans in Pakistan",
      description:
        "Help orphaned children in Pakistan stay with their families, in school and fed. Your gift pays for food, school fees, books and uniforms.",
    },
    marginNote: "every child needs someone",
    reference: "MKF-ORPHAN",
    need: [
      "In Pakistan, a child who loses a parent often loses their place in school too. Older children leave class to earn, and younger ones go without.",
      "Extended families do their best, but many are already stretched.",
    ],
    whatWeDo: [
      "Support named children living with their own relatives, so they can stay in their family and community.",
      "Cover school fees, books and uniform, and check in on attendance.",
      "Provide a monthly food allowance for the household.",
    ],
    giving: [
      { amount: "£30 a month", buys: "food, schooling and care for one orphaned child" },
      { amount: "£360", buys: "a full year of support for one child" },
    ],
  },
  {
    slug: "food",
    title: "Feeding the hungry",
    summary:
      "Monthly food packs for families who cannot afford the basics, with extra help in Ramadan and winter.",
    seo: {
      title: "Feed hungry families in Pakistan",
      description:
        "Monthly food packs of flour, rice, oil and lentils for families in Pakistan who cannot afford the basics, with extra help in Ramadan and winter.",
    },
    marginNote: "no one learns hungry",
    reference: "MKF-FOOD",
    need: [
      "Rising prices for flour, rice, oil and lentils have pushed many working families below the point where they can eat properly every day.",
      "Widows, daily-wage workers and the elderly are hit first.",
    ],
    whatWeDo: [
      "Buy staples locally and pack them for families we have visited and verified.",
      "Hand packs over in person, with dignity, never for photographs.",
      "Run extra distributions in Ramadan and through the winter months.",
    ],
    giving: [
      { amount: "£35", buys: "a month’s food pack for a family of six" },
      { amount: "£10", buys: "a hot meal for ten people" },
    ],
  },
  {
    slug: "education",
    title: "Keeping children in school",
    summary:
      "Fees, books, uniforms and stationery so that cost is never the reason a child leaves school.",
    seo: {
      title: "Help children in Pakistan stay in school",
      description:
        "School fees, books, uniforms and stationery for children in Pakistan, paid directly to schools, so cost is never the reason a child leaves school.",
    },
    marginNote: "his life’s work",
    reference: "MKF-EDU",
    need: [
      "Even where schooling is free, uniforms, books, transport and exam fees keep many children out of class.",
      "Girls are often the first to be taken out of school when money runs short.",
    ],
    whatWeDo: [
      "Pay school costs directly to schools, not in cash to families.",
      "Supply books, bags, uniforms and stationery at the start of each school year.",
      "Work with teachers to follow each child’s attendance and progress.",
    ],
    giving: [
      { amount: "£60", buys: "a year of books, uniform and stationery for one child" },
      { amount: "£15", buys: "a school bag and stationery set" },
    ],
  },
  {
    slug: "medical",
    title: "Basic medical care for children",
    summary:
      "Check-ups, medicine and simple treatment for children whose families cannot pay for a doctor.",
    seo: {
      title: "Medical care for children in Pakistan",
      description:
        "Doctor’s visits, medicine, eye tests and glasses for children in Pakistan whose families cannot afford them, with help to reach hospital when needed.",
    },
    marginNote: "health before homework",
    reference: "MKF-HEALTH",
    need: [
      "For poor families, a doctor’s visit and a course of medicine can cost several days' wages, so treatable illnesses are left to get worse.",
      "Untreated eyesight problems, infections and poor nutrition keep children from learning.",
    ],
    whatWeDo: [
      "Pay for doctor’s visits and prescribed medicine for children we support.",
      "Arrange free check-up days with local doctors, including eye tests.",
      "Refer serious cases to hospital and help with travel costs.",
    ],
    giving: [
      { amount: "£15", buys: "a doctor’s check-up and medicine for one child" },
      { amount: "£25", buys: "an eye test and glasses for one child" },
    ],
  },
];

export function getCause(slug: string) {
  return causes.find((cause) => cause.slug === slug);
}

/** For gifts that can go wherever the need is greatest. */
export const generalFund = {
  title: "Where most needed",
  reference: "MKF-GENERAL",
};
