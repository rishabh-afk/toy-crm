import { SiGoogleadmob } from "react-icons/si";
import { MdManageAccounts } from "react-icons/md";
import { RiSeoFill, RiAdminFill } from "react-icons/ri";
import { FaHome, FaQuestionCircle } from "react-icons/fa";

// Define tabs
export const tabs = [
  {
    id: 1,
    tabs: [],
    icon: FaHome,
    label: "Dashboard",
    href: "/dashboard",
    pageTitle: "Overview",
    permission: "Dashboard",
  },
  {
    id: 2,
    tabs: [],
    icon: MdManageAccounts,
    label: "Role Management",
    href: "/dashboard/role-management",
    pageTitle: "Role Management",
    permission: "Role Management",
  },
  {
    id: 3,
    icon: SiGoogleadmob,
    label: "Manage Leads",
    pageTitle: "All Leads",
    href: "/dashboard/leads",
    permission: "Manage Leads",
  },
  {
    id: 4,
    icon: RiAdminFill,
    label: "Manage Admin",
    pageTitle: "All Admins",
    href: "/dashboard/admin",
    permission: "Manage Admin",
  },
  {
    id: 5,
    label: "Contact Us",
    icon: FaQuestionCircle,
    pageTitle: "Contact Us",
    permission: "Contact Us",
    href: "/dashboard/contacts",
  },
  {
    id: 6,
    icon: RiSeoFill,
    label: "Manage SEO",
    href: "/dashboard/seo",
    permission: "Manage SEO",
    pageTitle: "Search Engine Optimization (SEO)",
  },
];
