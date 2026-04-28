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
    href: paths.team,
    children: [
      { label: "Who We Are", href: paths.whoweare },
      { label: "Our Project", href: paths.search },
      { label: "Our Team", href: paths.team },
    ],
  },
  /*{
    label: "Governance",
    href: paths.governance,
    children: [
      { label: "Reflect", href: paths.governance },
      { label: "Value", href: paths.governance },
      { label: "Develop", href: paths.governance },
    ],
  },*/
  {
    label: "Networks",
    href: paths.education,
  },
  {
    label: "Initiatives",
    href: paths.initiatives,
  },
  {
    label: "Events",
    href: paths.events,
    activeAlsoFor: [paths.events],
  },
  { label: "Publications", href: paths.magazine },
  { label: "Get Involved", href: paths.partners },
  { label: "Contact", href: paths.contact, type: "button" },
];
