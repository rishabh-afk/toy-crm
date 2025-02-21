import { formatDate } from "@/hooks/general";
import { FormField } from "@/hooks/types";

export const QuotationFieldsType: FormField[] = [
  {
    name: "customer",
    type: "select",
    label: "Customer",
    placeholder: "Select customer",
    options: [],
  },
  {
    name: "lead",
    label: "Lead",
    type: "select",
    placeholder: "Enter Lead",
    options: [],
  },
  {
    name: "preparedBy",
    type: "select",
    required: true,
    label: "Prepared By",
    placeholder: "Select prepared by",
    options: [],
  },
  {
    type: "date",
    name: "quotationDate",
    label: "Quotation Date",
    currentDate: formatDate(new Date()),
    placeholder: "Enter quotation date",
  },
  {
    name: "poNo",
    type: "text",
    label: "Purchase Order Number",
    placeholder: "Enter post Office Number",
  },
  {
    type: "date",
    name: "poDate",
    label: "Purchase Order Date",
    currentDate: formatDate(new Date()),
    placeholder: "Provide post office date",
  },
  // {
  //   name: "isTaxed",
  //   label: "Do you want to include tax?",
  //   type: "choose",
  //   value: true,
  //   required: true,
  // },
  {
    type: "text",
    name: "transport",
    label: "Transport",
    placeholder: "Enter transport",
  },
  {
    rows: 1,
    name: "remarks",
    type: "textarea",
    label: "Remarks",
    placeholder: "Enter remarks",
  },
  {
    rows: 5,
    name: "paymentTerms",
    type: "textarea",
    widthFull: true,
    label: "Payment Terms",
    placeholder: "Enter payment terms",
  },
  {
    options: [],
    widthFull: true,
    name: "productForm",
    type: "productForm",
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
