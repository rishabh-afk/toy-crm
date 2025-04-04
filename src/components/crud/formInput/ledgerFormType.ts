import { FormField } from "@/hooks/types";
import { includes } from "@/hooks/polyfills";
import { bankNames, countries } from "@/data/data";
import { getSelectFormattedData } from "@/hooks/general";
import { states } from "@/data/states";

export const LedgerType: FormField[] = [
  {
    name: "companyName",
    type: "text",
    required: true,
    label: "Company Name",
    placeholder: "Enter company name",
  },
  {
    type: "text",
    required: true,
    name: "contactPerson",
    label: "Contact Name",
    placeholder: "Enter contact name",
  },
  {
    type: "select",
    required: true,
    name: "ledgerType",
    label: "Ledger type",
    placeholder: "Select type",
    options: [
      { label: "Both", value: "Both" },
      { label: "Customer", value: "Customer" },
      { label: "Supplier", value: "Supplier" },
    ],
  },
  {
    options: [],
    type: "select",
    name: "groupBy",
    placeholder: "Select User",
    label: "Group By (Sales Person)",
  },
  {
    name: "mobileNo",
    maxLength: 15,
    label: "Mobile Number",
    type: "stringNumeric",
    placeholder: "Enter your mobile number",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
    validation: (value) => (includes(value, "@") ? null : "Invalid email"),
  },
  {
    name: "addtionalMobileNumber",
    maxLength: 15,
    label: "Alternate Mobile Number",
    type: "stringNumeric",
    placeholder: "Enter your alt. mobile number",
  },
  {
    type: "email",
    label: "Additional Email",
    name: "additionalEmail",
    placeholder: "Enter your additional email",
    validation: (value) => (includes(value, "@") ? null : "Invalid email"),
  },
  {
    name: "gstNo",
    type: "text",
    label: "Goods and Services Tax Number",
    placeholder: "Enter GST Tax Number",
  },
  {
    name: "panNo",
    type: "text",
    label: "PAN Card Number",
    placeholder: "Enter PAN Card Number",
  },
  {
    name: "creditDays",
    maxLength: 3,
    type: "number",
    label: "Credit Days",
    placeholder: "Enter credit days",
  },
  {
    name: "creditLimit",
    maxLength: 10,
    type: "number",
    label: "Credit Limit",
    placeholder: "Enter credit Limit",
  },
  { type: "br", name: "address", label: "Address Details", widthFull: true },
  {
    type: "text",
    name: "line1",
    label: "Address 1",
    required: true,
    placeholder: "Enter Line 1",
  },
  {
    name: "street",
    type: "text",
    label: "Street Address",
    placeholder: "Enter street address",
  },
  {
    type: "select",
    name: "country",
    label: "Country",
    required: true,
    placeholder: "Select Country",
    options: getSelectFormattedData(countries),
  },
  {
    type: "select",
    name: "state",
    label: "State",
    placeholder: "Select state",
    options: getSelectFormattedData(states),
  },
  {
    type: "select",
    name: "city",
    label: "City",
    placeholder: "Select city",
    options: [],
  },
  {
    name: "pinCode",
    maxLength: 15,
    label: "Pin Code",
    required: true,
    type: "stringNumeric",
    placeholder: "Enter pin code",
  },
  {
    name: "landmark",
    type: "text",
    label: "Landmark",
    placeholder: "Enter landmark",
  },
  { type: "br", name: "bank", label: "Bank Details", widthFull: true },
  {
    name: "accountNo",
    type: "text",
    label: "Account Number",
    placeholder: "Enter account number",
  },
  {
    type: "select",
    name: "bankName",
    label: "Bank Name",
    placeholder: "Select bank",
    options: getSelectFormattedData(bankNames),
  },
  {
    name: "branchAddress",
    type: "text",
    label: "Branch Address",
    placeholder: "Enter branch address",
  },
  {
    name: "ifscCode",
    type: "text",
    label: "IFSC Code",
    placeholder: "Enter IFSC Code",
  },
];
