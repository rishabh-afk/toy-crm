// import { formatDate } from "@/hooks/general";
import { FormField } from "@/hooks/types";

export const PurchaseFieldsType: FormField[] = [
  {
    name: "warehouseId",
    type: "select",
    required: true,
    label: "Select Warehouse",
    placeholder: "Select Warehouse",
    options: [], // This will hold the options for the Select component
  },
  {
    type: "select",
    name: "vendor",
    required: true,
    label: "Vendor / Supplier",
    placeholder: "Select Vendor / Supplier",
    options: [], // This will hold the options for the Select component
  },
  {
    name: "preparedBy",
    required: true,
    type: "select",
    label: "Prepared By",
    placeholder: "Select user",
    options: [], // This will hold the options for the Select component
  },
  {
    name: "referenceNumber",
    type: "text",
    required: true,
    label: "Reference Number",
    placeholder: "Entern reference Number",
  },
  {
    name: "poNumber",
    type: "text",
    label: "Purchase Order Number",
    placeholder: "Enter Purchase Order Number",
  },
  {
    name: "poDate",
    type: "date",
    label: "Purchase Order Date",
    placeholder: "Provide Purchase Order date",
  },
  {
    type: "date",
    required: true,
    name: "purchaseDate",
    label: "Purchase Date",
    // currentDate: formatDate(new Date()),
    placeholder: "Provide Purchase date",
  },
  {
    type: "select",
    name: "paymentMode",
    required: true,
    label: "Payment Mode",
    placeholder: "Select payment mode",
    options: [
      { label: "Cash", value: "Cash" },
      { label: "Cheque", value: "Cheque" },
      { label: "NEFT", value: "NEFT" },
    ],
  },
  {
    name: "remarks",
    type: "text",
    label: "Remarks",
    placeholder: "Enter remarks",
  },
  {
    options: [],
    widthFull: true,
    name: "purchaseForm",
    type: "purchaseForm",
    label: "Add Product Details",
  },
  {
    name: "total",
    type: "br",
    widthFull: true,
    label: "Total Calculations:",
  },
  {
    min: 0,
    name: "totalQuantity",
    type: "number",
    isDisabled: true,
    label: "Total Quantity",
    placeholder: "0.0",
  },
  {
    name: "totalValue",
    type: "number",
    isDisabled: true,
    label: "Total Value",
    placeholder: "0.0",
    min: 0,
  },
  {
    name: "discountAmount",
    type: "number",
    isDisabled: true,
    label: "Discount Amount",
    placeholder: "0.0",
    min: 0,
  },
  {
    name: "taxableAmount",
    type: "number",
    isDisabled: true,
    label: "Taxable Amount",
    placeholder: "0.0",
    min: 0,
  },
  {
    name: "gstAmount",
    type: "number",
    isDisabled: true,
    label: "GST Amount",
    placeholder: "0.0",
    min: 0,
  },
  {
    name: "netAmount",
    type: "number",
    isDisabled: true,
    label: "Net Amount",
    placeholder: "0.0",
    min: 0,
  },
];
