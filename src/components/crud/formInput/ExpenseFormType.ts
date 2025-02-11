import { FormField } from "@/hooks/types";

export const ExpenseFormType: FormField[] = [
  {
    name: "userId",
    type: "select",
    label: "Employee",
    placeholder: "Select employee",
    options: [], // This will hold the options for the Select component
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
    type: "date",
    name: "date",
    required: true,
    label: "Date / Time",
    placeholder: "Enter date",
  },sdjff
  {
    rows: 8,
    name: "note",
    type: "textarea",
    label: "Notes",
    required: true,
    placeholder: "Enter notes",
  },
  {
    name: "document",
    label: "Upload Documents",
    type: "file",
  },
];
