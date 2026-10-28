/**
 * The memorial story and About page copy.
 *
 * TODO: this is a draft written in the family’s voice. Please personalise it:
 * where he taught, for how many years, what subjects, and anything his
 * students remember about him.
 */

export const story = {
  /** Shown on the home page. */
  short: [
    "Mubashir Ahmad Kaleem Sulehri was a school teacher in Pakistan. He spent his working life in classrooms, teaching children, many of whom had very little.",
    "He died of cancer in 2022 and is buried in London. His family started this foundation so that the work he gave his life to carries on in his name.",
  ],

  /** The full About page. */
  life: [
    "Mubashir Ahmad Kaleem Sulehri was a school teacher in Pakistan. To his students he was simply Sir, the name Pakistani children give the teachers they look up to.",
    "A teacher knows, from years in the classroom, which children came to school hungry, which ones stopped coming when the fees were due, and which ones could not see the board but had never had their eyes tested.",
    "He was diagnosed with cancer and died in 2022. He is buried in London.",
  ],

  why: [
    "After he died, we wanted to do something that he would have recognised as his own work. Not a monument, but children fed, in school and well.",
    "The Mubashir Kaleem Foundation raises money in the UK and abroad and spends it on children and families in Pakistan who need it most: orphans, hungry families, and children at risk of leaving school or going without medical care.",
  ],

  promises: [
    "We spend your gift on the cause you choose.",
    "We visit and verify the families we support.",
    "We never use photographs of children without their family’s consent.",
    "We publish what we spend and where.",
  ],

  /** TODO: names and roles of trustees or founding team, if you are happy to publish them. */
  team: [] as { name: string; role: string }[],

  /** TODO: add a portrait to public/images/ and set the path, e.g. "/images/mubashir.jpg". */
  portrait: null as { src: string; alt: string; width: number; height: number } | null,
};
