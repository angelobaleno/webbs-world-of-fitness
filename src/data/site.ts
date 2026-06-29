export const site = {
  name: "Webb's World of Fitness",
  owners: "Linda & Monty Webb",
  tagline: "Build a Body That Lasts.",
  phone: "412-798-2800",
  phoneHref: "tel:+14127982800",
  email: "webbsfitness@gmail.com",
  emailHref: "mailto:webbsfitness@gmail.com",
  address: {
    street: "101 Cypress Hill Drive",
    city: "Pittsburgh",
    state: "PA",
    zip: "15235",
    full: "101 Cypress Hill Drive, Pittsburgh, PA 15235",
  },
  hours: [
    { days: "Mon – Thu", time: "5:00 AM – 10:00 PM" },
    { days: "Friday", time: "5:00 AM – 9:00 PM" },
    { days: "Saturday", time: "7:00 AM – 5:00 PM" },
    { days: "Sunday", time: "7:00 AM – 4:00 PM" },
  ],
  mapEmbed:
    "https://www.google.com/maps?q=101+Cypress+Hill+Drive,+Pittsburgh,+PA+15235&output=embed",
  // Annual contract, billed monthly. No initiation or enrollment fees.
  // Source: webbsworldoffitness.com/membership.
  plans: [
    {
      name: "Single",
      price: "$39",
      cadence: "/mo",
      features: ["Full gym & equipment access", "Cardio theater", "Group exercise classes"],
      highlight: false,
    },
    {
      name: "Couple",
      price: "$65",
      cadence: "/mo",
      features: ["Everything in Single, for two", "Both partners full access"],
      highlight: false,
    },
    {
      name: "Family",
      price: "$85",
      cadence: "/mo",
      features: ["Everything in Single, your whole household", "Most value per person"],
      highlight: false,
    },
  ],
  // No-contract passes for a set period of time.
  shortTermPasses: [
    { label: "Day Pass", price: "$10" },
    { label: "One Week", price: "$25" },
    { label: "One Month", price: "$56" },
  ],
  // Discounted rates for seniors and students.
  discountRates: [
    { label: "Senior (65+) — One Month", price: "$35" },
    { label: "Student — One Month", price: "$38" },
    { label: "Student — Three Months", price: "$108" },
  ],
};

export type Site = typeof site;
