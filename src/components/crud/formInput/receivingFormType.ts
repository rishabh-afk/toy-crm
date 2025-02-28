import { FormField } from "@/hooks/types";

export const ReceivingFormType: FormField[] = [
  {
    type: "select",
    required: true,
    name: "receivingType",
    label: "Receiving Type",
    placeholder: "Select type",
    options: [{ label: "Invoice", value: "Invoice" }],
  },
  {
    type: "select",
    name: "ledgerId",
    label: "Customer / Supplier",
    placeholder: "Select Customer / Supplier",
    options: [], // This will hold the options for the Select component
  },
  {
    type: "select",
    name: "invoiceId",
    label: "Invoice ID",
    placeholder: "Select invoice",
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
  {
    name: "receivingMethod",
    type: "select",
    required: true,
    label: "Receiving Method",
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
    name: "receivingStatus",
    type: "select",
    required: true,
    label: "Receiving status",
    placeholder: "Select status",
    options: [
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
    name: "receivingDate",
    label: "Receiving Date",
    placeholder: "Select receiving Date",
  },
  {
    name: "document",
    label: "Upload Document (Optional)",
    type: "file",
  },
];
