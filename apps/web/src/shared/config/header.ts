import { paths } from "@/shared/config/paths";

type NavItem = {
  label: string;
  href: string;
  type?: "link" | "button";

  // dodatkowe ścieżki, które też mają zapalać "active"
  activeAlsoFor?: string[];
};

export const header: NavItem[] = [
  { label: "About Us", href: paths.about },
  { label: "Governance", href: paths.governance },
  { label: "Networks", href: paths.networks },
  { label: "Initiatives", href: paths.initiatives },

  // tu jest fix:
  { label: "Events", href: paths.events, activeAlsoFor: [paths.events] },

  { label: "Publications", href: paths.magazine },
  { label: "Get Involved", href: paths.partners },
  { label: "Contact", href: paths.contact, type: "button" },
];
