import { SiGoogleadmob } from "react-icons/si";
import { RiSeoFill, RiAdminFill } from "react-icons/ri";
import { FaBlog, FaHome, FaQuestionCircle } from "react-icons/fa";

// Define tabs
export const tabs = [
  {
    id: 1,
    tabs: [],
    icon: FaHome,
    label: "Dashboard",
    href: "/dashboard",
    pageTitle: "Overview",
    permission: "Dashboard", // Add a permission attribute
  },
  {
    id: 6,
    icon: SiGoogleadmob,
    label: "Manage Leads",
    href: "/dashboard/leads",
    pageTitle: "All Leads",
    permission: "Admin",
  },
  {
    id: 5,
    icon: RiAdminFill,
    label: "Manage Admin",
    href: "/dashboard/admin",
    pageTitle: "All Admins",
    permission: "Admin",
  },
  {
    id: 2,
    icon: FaBlog,
    label: "Manage Blogs",
    href: "/dashboard/blogs",
    pageTitle: "Blogs",
    permission: "Blogs",
  },
  {
    id: 3,
    icon: FaQuestionCircle,
    label: "Contact Us",
    href: "/dashboard/contacts",
    pageTitle: "Contact Us",
    permission: "ContactUs",
  },
  {
    id: 4,
    icon: RiSeoFill,
    label: "Manage SEO",
    href: "/dashboard/seo",
    pageTitle: "Search Engine Optimization (SEO)",
    permission: "SEO",
  },
];
