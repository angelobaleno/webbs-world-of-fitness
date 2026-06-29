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
  // Placeholder pricing — confirm real numbers with the gym before launch.
  plans: [
    {
      name: "Monthly",
      price: "$39",
      cadence: "/mo",
      features: ["Full gym & equipment access", "Cardio theater", "Group exercise classes"],
      highlight: false,
    },
    {
      name: "Annual",
      price: "$399",
      cadence: "/yr",
      features: [
        "Everything in Monthly",
        "4 free personal training sessions",
        "Best value — two months free",
      ],
      highlight: true,
    },
    {
      name: "Student",
      price: "$29",
      cadence: "/mo",
      features: ["Full gym & equipment access", "Valid student ID required"],
      highlight: false,
    },
  ],
};

export type Site = typeof site;
