import { FormField } from "@/hooks/types";
import { formatDate } from "@/hooks/general";

export const BillingFormType: FormField[] = [
  {
    type: "select",
    required: true,
    name: "quotationId",
    label: "Quatation ID",
    placeholder: "Select quotation",
    options: [],
  },
  {
    type: "select",
    required: true,
    name: "preparedBy",
    label: "Invoice Prepared By",
    placeholder: "Select Prepared By",
    options: [],
  },
  {
    type: "date",
    name: "billDate",
    label: "Invoice Date",
    minDate: formatDate(new Date()),
    placeholder: "Select Invoice Date",
  },
  {
    name: "referenceNo",
    type: "text",
    required: true,
    label: "Reference No.",
    placeholder: "Enter Reference No.",
  },
  {
    type: "select",
    required: true,
    name: "invoiceTo",
    label: "Select Ledger / party",
    placeholder: "Select Ledger / party",
    options: [],
  },
  {
    name: "shipTo",
    type: "select",
    required: true,
    label: "Ship To",
    placeholder: "Select Ship To",
    options: [],
  },
  {
    type: "br",
    name: "Transportation",
    label: "Transportation Details",
    widthFull: true,
  },
  {
    name: "vehicleDetails",
    type: "text",
    label: "Vehicle Details",
    placeholder: "Enter Vehicle Details",
  },
  {
    name: "driverName",
    type: "text",
    label: "Driver Name",
    placeholder: "Enter driver name",
  },
  {
    name: "driverPhone",
    type: "text",
    label: "Driver Phone Number",
    placeholder: "Enter driver phone number",
  },
  {
    name: "dispatchMode",
    type: "select",
    label: "Dispatch Mode",
    placeholder: "Select Dispatch Mode",
    options: [
      { label: "Air", value: "Air" },
      { label: "Road", value: "Road" },
      { label: "Rail", value: "Railway" },
      { label: "Sea", value: "Sea / Ocean" },
    ],
  },
  {
    name: "placeOfSupply",
    type: "text",
    label: "Place of Supply",
    placeholder: "Enter Place of Supply",
  },
  {
    name: "transportThrough",
    type: "text",
    label: "Transport Through",
    placeholder: "Enter Transport Details",
  },
  {
    type: "text",
    label: "GR/LR No",
    name: "grOrLrNumber",
    placeholder: "Enter GR/LR Number",
  },
  {
    rows: 1,
    type: "textarea",
    name: "remarks",
    label: "Remarks",
    placeholder: "Enter Remarks",
  },
  {
    options: [],
    widthFull: true,
    name: "productBillingForm",
    type: "productBillingForm",
    label: "Product Details",
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
