import { FaHome } from "react-icons/fa";
import { SiGoogleadmob } from "react-icons/si";
import { GiBoxUnpacking } from "react-icons/gi";
import { BsChatQuoteFill } from "react-icons/bs";
import { MdManageAccounts } from "react-icons/md";
import { BiSolidPurchaseTagAlt } from "react-icons/bi";
import { RiAdminFill, RiSecurePaymentFill } from "react-icons/ri";
import { FaProductHunt, FaMoneyBillTransfer } from "react-icons/fa6";

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
    icon: RiAdminFill,
    label: "Manage Admin",
    pageTitle: "All Admins",
    href: "/dashboard/admin",
    permission: "Manage Admin",
  },
  {
    id: 4,
    icon: SiGoogleadmob,
    label: "Manage Leads",
    pageTitle: "All Leads",
    href: "/dashboard/leads",
    permission: "Manage Leads",
  },
  {
    id: 5,
    icon: FaProductHunt,
    label: "Manage Products",
    pageTitle: "All Products",
    href: "/dashboard/product",
    permission: "Manage Products",
  },
  {
    id: 6,
    icon: BsChatQuoteFill,
    label: "Manage Quotations",
    pageTitle: "All Quotations",
    href: "/dashboard/quotation",
    permission: "Manage Quotations",
  },
  {
    id: 7,
    icon: GiBoxUnpacking,
    label: "Manage Packing",
    pageTitle: "All Packing",
    href: "/dashboard/packing",
    permission: "Manage Packing",
  },
  {
    id: 8,
    icon: BiSolidPurchaseTagAlt,
    label: "Manage Purchase",
    pageTitle: "All Purchase",
    href: "/dashboard/purchase",
    permission: "Manage Purchase",
  },
  {
    id: 9,
    icon: FaMoneyBillTransfer,
    label: "Manage Billing",
    pageTitle: "All Billing",
    href: "/dashboard/billing",
    permission: "Manage Billing",
  },
  {
    id: 10,
    icon: RiSecurePaymentFill,
    label: "Manage Payment",
    pageTitle: "All Payment",
    href: "/dashboard/payment",
    permission: "Manage Payment",
  },
];
