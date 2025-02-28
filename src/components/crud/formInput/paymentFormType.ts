import { FormField } from "@/hooks/types";

export const paymentFormType: FormField[] = [
  {
    type: "select",
    required: true,
    name: "paymentType",
    label: "Payment Type",
    placeholder: "Select type",
    options: [
      { label: "Purchase", value: "Purchase" },
      // { label: "Sale Return", value: "Sale Return" },
    ],
  },
  {
    type: "select",
    name: "ledgerId",
    label: "Customer / Supplier",
    placeholder: "Select Customer / Supplier",
    options: [], // This will hold the options for the Select component
  },
  // {
  //   type: "select",
  //   required: true,
  //   name: "quotationId",
  //   label: "Quatation ID",
  //   placeholder: "Select quotation",
  //   options: [],
  // },
  {
    type: "select",
    name: "purchaseId",
    label: "Purchase ID",
    placeholder: "Select purchase",
    options: [],
  },
  {
    name: "amount",
    maxLength: 10,
    type: "number",
    required: true,
    label: "Amount",
    placeholder: "Enter amount",
  },
  // {
  //   name: "deduction",
  //   maxLength: 10,
  //   type: "number",
  //   label: "Deduction",
  //   placeholder: "Enter deduction",
  // },
  // {
  //   name: "tdsAmount",
  //   maxLength: 10,
  //   type: "number",
  //   label: "TDS Amount",
  //   placeholder: "Enter TDS Amount",
  // },
  // {
  //   name: "netAmount",
  //   maxLength: 10,
  //   type: "number",
  //   label: "Net Amount",
  //   placeholder: "Enter net Amount",
  // },
  {
    name: "paymentMethod",
    type: "select",
    required: true,
    label: "Payment Method",
    placeholder: "Select method",
    options: [
      { label: "Cash", value: "Cash" },
      { label: "Debit Card", value: "Debit Card" },
      { label: "Credit Card", value: "Credit Card" },
      { label: "Bank Transfer", value: "Bank Transfer" },
      { label: "Online Payment", value: "Online Payment" },
    ],
  },
  {
    name: "paymentStatus",
    type: "select",
    required: true,
    label: "Payment status",
    placeholder: "Select status",
    options: [
      // { label: "Failed", value: "Failed" },
      { label: "Pending", value: "Pending" },
      { label: "Completed", value: "Completed" },
    ],
  },
  {
    rows: 1,
    type: "text",
    name: "remarks",
    label: "Remarks",
    placeholder: "Enter remarks",
  },
  {
    type: "date",
    required: true,
    name: "paymentDate",
    label: "Payment Date",
    placeholder: "Select Payment Date",
  },
  {
    name: "document",
    label: "Upload Document (Optional)",
    type: "file",
  },
];
