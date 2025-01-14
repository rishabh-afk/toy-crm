import { FormField } from "@/hooks/types";



export const PackingFormType: FormField[] = [
  {
    name: "packingNo",
    type: "text",
    required: true,
    label: "Packing No.",
    placeholder: "Enter Packing No.",
    customClasses: undefined,
    isDisabled: true,
  },
  {
    name: "packingDate",
    type: "date",
    required: true,
    label: "Packing Date",
    placeholder: "Select Packing Date",
    customClasses: undefined,
  },
  {
    name: "customer",
    type: "text",
    required: true,
    label: "Customer",
    placeholder: "Enter Customer Name",
    customClasses: undefined,
    isDisabled: true,
  },
  {
    name: "enquiryDate",
    type: "date",
    required: false,
    label: "Enq. Date",
    placeholder: "Select Enquiry Date",
    customClasses: undefined,
  },
  {
    name: "nagPacking",
    type: "text",
    required: false,
    label: "Nag Packing",
    placeholder: "Enter Nag Packing Details",
    customClasses: undefined,
  },
  {
    name: "quotation",
    type: "select",
    required: true,

    label: "Select Quotation",
    placeholder: "Select quotation",
    customClasses: undefined,
    options: [],
  },

  {
    name: "packedBy",
    type: "text",
    required: true,
    label: "Packed By",
    placeholder: "Enter Packed By Name",
    customClasses: undefined,
  },
  {
    name: "transport",
    type: "text",
    required: false,
    label: "Transport",
    placeholder: "Enter Transport Details",
    customClasses: undefined,
  },
  {
    name: "remarks",
    type: "textarea",
    required: false,
    label: "Remarks",
    placeholder: "Enter Remarks",
    customClasses: undefined,
  },
];
