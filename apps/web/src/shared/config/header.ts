import { paths } from "@/shared/config/paths";

type NavChild = {
  label: string;
  href: string;
};

type NavItem = {
  label: string;
  href: string;
  type?: "link" | "button";
  activeAlsoFor?: string[];
  children?: NavChild[];
};

export const header: NavItem[] = [
  {
    label: "About Us",
    href: paths.about,
    children: [
      { label: "Who We Are", href: paths.about },
      { label: "Our Project", href: paths.about },
      { label: "GCED Innovative Mindset", href: paths.about },
    ],
  },
  {
    label: "Governance",
    href: paths.governance,
    children: [
      { label: "Reflect", href: paths.governance },
      { label: "Value", href: paths.governance },
      { label: "Develop", href: paths.governance },
    ],
  },
  {
    label: "Networks",
    href: paths.networks,
    children: [
      { label: "Knowledge", href: paths.networks },
      { label: "Socio-Emotional", href: paths.networks },
      { label: "Behavioral", href: paths.networks },
    ],
  },
  {
    label: "Initiatives",
    href: paths.initiatives,
    children: [
      { label: "Explore", href: paths.initiatives },
      { label: "Learn", href: paths.initiatives },
      { label: "Enhance", href: paths.initiatives },
    ],
  },
  {
    label: "Events",
    href: paths.events,
    activeAlsoFor: [paths.events],
    children: [
      { label: "Upcoming Events", href: paths.events },
      { label: "All Events", href: paths.events },
      { label: "Popular Topics", href: paths.events },
    ],
  },
  { label: "Publications", href: paths.magazine },
  { label: "Get Involved", href: paths.partners },
  { label: "Contact", href: paths.contact, type: "button" },
];
