import { routes } from "@/lib/routes";

export const footerContent = [
  {
    title: "Company",
    links: [
      {
        title: "About",
        href: routes.about,
      },
    ],
  },
  {
    title: "Legal",
    links: [
      {
        title: "Terms of Service",
        href: routes.terms,
      },
      {
        title: "Privacy Policy",
        href: routes.terms,
      },
    ],
  },
];
