import { FormField } from "@/hooks/types";

export const ProductFormType: FormField[] = [];

export const ProductBrandType: FormField[] = [
  {
    name: "name",
    type: "text",
    required: true,
    widthFull: true,
    label: "Brand Name",
    placeholder: "Enter brand name",
  },
  {
    rows: 5,
    required: true,
    widthFull: true,
    type: "textarea",
    label: "Brand Name",
    name: "description",
    placeholder: "Enter brand description",
  },
  {
    name: "status",
    label: "Do you want to activate this Brand?",
    type: "choose",
    widthFull: true,
    required: false,
  },
];

export const ProductCategoryType: FormField[] = [
  {
    name: "name",
    type: "text",
    required: true,
    label: "Category Name",
    placeholder: "Enter category name",
  },
  {
    rows: 1,
    required: true,
    type: "textarea",
    name: "description",
    label: "Category Description",
    placeholder: "Enter category description",
  },
  {
    type: "text",
    required: true,
    name: "hsnCode",
    label: "HSN Code",
    placeholder: "Enter category HSN Code",
  },
  {
    name: "igst",
    maxLength: 2,
    type: "number",
    label: "Integrated Goods and Services Tax (IGST)",
    placeholder: "Enter IGST",
  },
  {
    name: "cgst",
    maxLength: 2,
    type: "number",
    label: "Central Goods and Services Tax (CGST)",
    placeholder: "Enter CGST",
  },
  {
    name: "sgst",
    maxLength: 2,
    type: "number",
    label: "State Goods and Services Tax (SGST)",
    placeholder: "Enter SGST",
  },
  {
    name: "parentCategory",
    label: "Wanna connect to Category (optional) ?",
    type: "select",
    placeholder: "Select category",
    options: [],
  },
  {
    name: "status",
    label: "Do you want to activate this Category?",
    type: "choose",
    required: false,
  },
];

export const ProductUOMType: FormField[] = [
  {
    name: "shortName",
    type: "text",
    required: true,
    label: "Unit of Measure Short Name",
    placeholder: "Enter UOM a short name",
  },
  {
    type: "text",
    required: true,
    name: "longName",
    label: "Unit of Measure Long Name",
    placeholder: "Enter UOM a long name",
  },
  {
    name: "status",
    label: "Do you want to activate this Unit of Measure (UOM)?",
    type: "choose",
    required: false,
  },
];
