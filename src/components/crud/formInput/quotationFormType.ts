import { FormField } from "@/hooks/types";

export const QuotationFieldsType: FormField[] = [
  {
    name: "quotationNo",
    type: "number",
    required: true,
    label: "Quot. No.",
    placeholder: "Provide company name",
  },

  {
    name: "quotationDate",
    type: "date",
    required: true,
    label: "Quot. Date",
    placeholder: "Provide quotation date",
  },
  {
    name: "customer",
    type: "select",
    required: false,
    label: "Customer",
    placeholder: "Select customer",
    options: [
      {
        label: "Customer 1",
        value: "Customer 1",
      },
    ],
  },

  {
    name: "lead",
    type: "select",
    required: false,
    label: "Lead",
    placeholder: "Provide lead source",
    options: [
      {
        label: "Lead 1",
        value: "Lead 1",
      },
    ],
  },

  {
    name: "poNO",
    type: "text",
    required: true,
    label: "PO No.",
    placeholder: "Enter po no",
  },

  //   Address End

  {
    name: "poDate",
    type: "date",
    required: false,
    label: "PO Date",
    placeholder: "Provide po date",
  },
  {
    name: "remarks",
    type: "text",
    required: true,
    label: "Remarks",
    placeholder: "Provide remarks",
  },
  {
    name: "preparedBy",
    type: "select",
    required: true,
    label: "Prepared By",
    placeholder: "Select prepared by",
    options: [
      {
        label: "Prepared By 1",
        value: "Prepared By 1",
      },
    ],
  },

  {
    name: "packing",
    type: "select",
    required: false,
    label: "Packing",
    placeholder: "Select packing",
    options: [
      {
        label: "Packing 1",
        value: "Packing 1",
      },
    ],
  },

  // Product Details Start

  // {
  //   name: "br9",
  //   type: "br",
  //   required: false,
  //   label: ""
  // },
  // {
  //   name: "br10",
  //   type: "br",
  //   required: false,
  //   label: ""
  // },

  {
    name: "productLabel",
    type: "br",
    required: false,
    label: "Product Details",
    placeholder: "",
    options: [
      {
        label: "Product 1",
        value: "Product 1",
      },
    ],
  },

  {
    name: "isTaxed",
    type: "checkbox",
    required: false,
    label: "Tax Details",
    placeholder: "",
    options: [
      {
        label: "Without Tax",
        value: "",
      },
    ],
  },
  {
    name: "br15",
    type: "label",
    required: false,
    label: "",
  },
  {
    name: "product",
    type: "productForm",
    widthFull: true,
    required: false,
    label: "Product Details",
    placeholder: "",
  },

  // Product Details End

  //  Payment Details Start

  {
    name: "paymentTerms",
    type: "text",
    required: false,
    label: "Payment Terms",
    placeholder: "Provide payment terms",
  },
  // Payment Details End

  // Transport Details Start

  {
    name: "transport",
    type: "number",
    required: false,
    label: "Transport",
    placeholder: "Provide transport",
  },

  // Transport Details End

  // Total Cost Start
  {
    name: "total",
    type: "br",
    required: false,
    widthFull:true,
    label: "Total Details:",
    placeholder: "",
  },
  {
    name: "totalQuantity",
    type: "number",
    required: false,
    label: "Total Quantity",
    placeholder: "000.00",
    min: 0,
  },
  {
    name: "totalValue",
    type: "number",
    required: false,
    label: "Total Value",
    placeholder: "000.00",
    min: 0,
  },
  {
    name: "discountAmount",
    type: "number",
    required: false,
    label: "Discount Amount",
    placeholder: "000.00",
    min: 0,
  },
  {
    name: "additionalDiscountPercentage",
    type: "number",
    required: false,
    label: "Additional Discount Percentage",
    placeholder: "000.00",
    min: 0,
  },
  {
    name: "additionalDiscountAmount",
    type: "number",
    required: false,
    label: "Additional Discount Amount",
    placeholder: "000.00",
    min: 0,
  },
  {
    name: "freightAmount",
    type: "number",
    required: false,
    label: "Freight Amount",
    placeholder: "000.00",
    min: 0,
  },

  {
    name: "packingCount",
    type: "number",
    required: false,
    label: "Packing Count",
    placeholder: "000.00",
    min: 0,
  },
  {
    name: "taxableAmount",
    type: "number",
    required: false,
    label: "Taxable Amount",
    placeholder: "000.00",
    min: 0,
  },
  {
    name: "cgstAmount",
    type: "number",
    required: false,
    label: "CGST Amount",
    placeholder: "000.00",
    min: 0,
  },
  {
    name: "sgstAmount",
    type: "number",
    required: false,
    label: "SGST Amount",
    placeholder: "000.00",
    min: 0,
  },
  {
    name: "igstAmount",
    type: "number",
    required: false,
    label: "IGST Amount",
    placeholder: "000.00",
    min: 0,
  },
  {
    name: "netAmount",
    type: "number",
    required: false,
    label: "Net Amount",
    placeholder: "000.00",
    min: 0,
  },
  {
    name: "status",
    type: "select",
    required: true,
    label: "Status",
    placeholder: "Select Status",
    options: [
      {
        label: "Pending",
        value: "Pending",
      },
    ],
  },
];
