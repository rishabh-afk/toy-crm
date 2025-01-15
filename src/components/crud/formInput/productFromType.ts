import { FormField } from "@/hooks/types";

export const ProductFormType: FormField[] = [
  {
    name: "name",
    type: "text",
    label: "Product Name",
    required: true,
    placeholder: "Enter product name",
  },
  {
    name: "productCode",
    type: "text",
    required: true,
    label: "Product Code",
    placeholder: "Enter product code",
  },
  {
    name: "type",
    type: "select",
    label: "Type",
    required: true,
    placeholder: "Select Product type",
    options: [
      { label: "Finished", value: "Finished" },
      { label: "Raw Material", value: "Raw Material" },
    ],
  },
  {
    name: "description",
    type: "textarea",
    required: false,
    widthFull: true,
    label: "Description",
    placeholder: "Enter product description",
  },
  {
    name: "barCode",
    type: "text",
    required: true,
    label: "Bar Code",
    placeholder: "Enter barcode",
  },
  {
    name: "sku",
    type: "text",
    required: true,
    label: "SKU",
    placeholder: "Enter the SKU",
  },
  {
    name: "productSeries",
    type: "text",
    label: "Product Series",
    placeholder: "Enter product series",
  },
  {
    name: "productCategory",
    type: "select",
    required: true,
    label: "Product Category",
    placeholder: "Enter product category",
    options: [],
  },
  {
    name: "brand",
    type: "select",
    label: "Brand",
    required: true,
    placeholder: "Enter Brand Name",
    options: [],
  },
  {
    name: "uom",
    type: "select",
    label: "UOM",
    required: true,
    placeholder: "Select UOM",
    options: [],
  },
  {
    name: "baseQuantity",
    type: "number",
    label: "Base Quantity",
    placeholder: "Enter base quantity",
  },
  {
    type: "br",
    name: "specification",
    label: "Price / Specification Details",
    widthFull: true,
  },
  {
    name: "weight",
    type: "number",
    label: "Weight",
    placeholder: "Enter weight",
  },
  {
    name: "grossWeight",
    type: "number",
    label: "Gross Weight",
    placeholder: "Enter gross weight",
  },
  {
    name: "yob",
    type: "number",
    label: "YOB",
    placeholder: "Enter year of birth or year of product",
  },
  {
    name: "cb",
    type: "number",
    label: "CB",
    placeholder: "Enter CB",
  },
  {
    name: "purchaseRate",
    type: "number",
    label: "Purchase Rate",
    placeholder: "Enter purchase rate",
  },
  {
    name: "ourPrice",
    type: "number",
    label: "Our Price",
    placeholder: "Enter our price",
  },
  {
    name: "mrp",
    type: "number",
    label: "Rate",
    placeholder: "Enter MRP",
  },
  {
    name: "reOrderLevel",
    type: "number",
    label: "Re-order Level",
    placeholder: "Enter re-order level",
  },
  {
    name: "buyerRefNo",
    type: "text",
    label: "Buyer Ref No",
    placeholder: "Enter buyer reference number",
  },
  {
    name: "minLevel",
    type: "number",
    label: "Min Level",
    placeholder: "Enter minimum level",
  },
  {
    name: "maxLevel",
    type: "number",
    label: "Max Level",
    placeholder: "Enter maximum level",
  },
  {
    name: "igst",
    type: "number",
    label: "IGST",
    placeholder: "Enter IGST",
  },
  {
    name: "cgst",
    type: "number",
    label: "CGST",
    placeholder: "Enter CGST",
  },
  {
    name: "sgst",
    type: "number",
    label: "SGST",
    placeholder: "Enter SGST",
  },
  {
    type: "br",
    name: "upload",
    label: "Upload Documents",
    widthFull: true,
  },
  {
    type: "file",
    name: "images",
    multiple: true,
    required: false,
    widthFull: true,
    label: "Product Images",
  },
  {
    name: "coverImage",
    label: "Product Cover Image",
    type: "file",
    required: true,
  },
];

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
