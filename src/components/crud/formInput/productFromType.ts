import { FormField } from "@/hooks/types";



export const ProductFormType: FormField[] = [
  {
    name: "productCode",
    type: "text",
    required: true,
    label: "Product Code",
    placeholder: "Provide product code",
    customClasses: undefined,
  },
  {
    name: "type",
    type: "select",
    required: true,

    label: "Type",
    placeholder: "Select type",
    customClasses: undefined,
    options: [
      { label: "Finished", value: "Finished" },
      { label: "Raw Material", value: "Raw Material" },
    ],
  },
  {
    name: "name",
    type: "text",
    required: true,

    label: "Name",
    placeholder: "Provide product name",
    customClasses: undefined,
  },
  {
    name: "barCode",
    type: "text",
    required: true,

    label: "Bar Code",
    placeholder: "Provide barcode",
    customClasses: undefined,
  },
  {
    name: "productSeries",
    type: "text",
    required: true,

    label: "Product Series",
    placeholder: "Provide product series",
    customClasses: undefined,
  },
  {
    name: "productCategory",
    type: "select",
    required: true,

    label: "Product Category",
    placeholder: "Provide product category",
    customClasses: undefined,
    options: [],
  },
  {
    name: "brand",
    type: "select",
    required: true,

    label: "Brand",
    placeholder: "Provide brand",
    customClasses: undefined,
    options: [],
  },
  {
    name: "uom",
    type: "select",
    required: true,

    label: "UOM",
    placeholder: "Select UOM",
    customClasses: undefined,
    options: [],
  },

  {
    name: "baseQuantity",
    type: "number",
    required: true,

    label: "Base Quantity",
    placeholder: "Provide base quantity",
    customClasses: undefined,
  },
  {
    name: "weight",
    type: "number",
    required: true,

    label: "Weight",
    placeholder: "Provide weight",
    customClasses: undefined,
  },
  {
    name: "grossWeight",
    type: "number",
    required: true,

    label: "Gross Weight",
    placeholder: "Provide gross weight",
    customClasses: undefined,
  },
  {
    name: "purchaseRate",
    type: "number",
    required: true,

    label: "Purchase Rate",
    placeholder: "Provide purchase rate",
    customClasses: undefined,
  },
  {
    name: "yob",
    type: "number",
    required: true,

    label: "YOB",
    placeholder: "Provide year of birth or year of product",
    customClasses: undefined,
  },
  {
    name: "cb",
    type: "number",
    required: true,

    label: "CB",
    placeholder: "Provide CB",
    customClasses: undefined,
  },
  {
    name: "ourPrice",
    type: "number",
    required: true,

    label: "Our Price",
    placeholder: "Provide our price",
    customClasses: undefined,
  },
  {
    name: "minLevel",
    type: "number",
    required: true,

    label: "Min Level",
    placeholder: "Provide minimum level",
    customClasses: undefined,
  },
  {
    name: "maxLevel",
    type: "number",
    required: true,

    label: "Max Level",
    placeholder: "Provide maximum level",
    customClasses: undefined,
  },
  {
    name: "mrp",
    type: "number",
    required: true,

    label: "Rate",
    placeholder: "Provide MRP",
    customClasses: undefined,
  },
  {
    name: "reOrderLevel",
    type: "number",
    required: true,

    label: "Re-order Level",
    placeholder: "Provide re-order level",
    customClasses: undefined,
  },
  {
    name: "buyerRefNo",
    type: "text",
    required: true,

    label: "Buyer Ref No",
    placeholder: "Provide buyer reference number",
    customClasses: undefined,
  },

  {
    name: "sku",
    type: "text",
    required: true,

    label: "KU",
    placeholder: "Provide the SKU",
    customClasses: undefined,
  },

  {
    name: "cgst",
    type: "number",
    required: true,

    label: "CGST",
    placeholder: "Provide cgst",
    customClasses: undefined,
  },

  {
    name: "igst",
    type: "number",
    required: true,

    label: "IGST",
    placeholder: "Provide igst",
    customClasses: undefined,
  },

  {
    name: "sgst",
    type: "number",
    required: true,

    label: "SGST",
    placeholder: "Provide SGST",
    customClasses: undefined,
  },
  {
    name: "description",
    type: "textarea",
    required: false,

    label: "Description",
    placeholder: "Provide description",
    customClasses: undefined,
  },

  {
    name: "images",
    type: "file",
    required: false,

    label: "Images",
    placeholder: undefined,
    customClasses: undefined,
  },
];



// Product forms ends here

export const ProductBrandType: FormField[] = [
  {
    name: "name",
    type: "text",
    required: true,
    widthFull: true,
    label: "Brand Name",
    placeholder: "Enter brand name",
    customClasses: undefined
  },
  {
    rows: 5,
    required: true,
    widthFull: true,
    type: "textarea",
    label: "Brand Name",
    name: "description",
    placeholder: "Enter brand description",
    customClasses: undefined
  },
  {
    name: "status",
    label: "Do you want to activate this Brand?",
    type: "choose",
    widthFull: true,
    required: false,
    customClasses: undefined
  },
];

export const ProductCategoryType: FormField[] = [
  {
    name: "name",
    type: "text",
    required: true,
    label: "Category Name",
    placeholder: "Enter category name",
    customClasses: undefined
  },
  {
    rows: 1,
    required: true,
    type: "textarea",
    name: "description",
    label: "Category Description",
    placeholder: "Enter category description",
    customClasses: undefined
  },
  {
    type: "text",
    required: true,
    name: "hsnCode",
    label: "HSN Code",
    placeholder: "Enter category HSN Code",
    customClasses: undefined
  },
  {
    name: "igst",
    maxLength: 2,
    type: "number",
    label: "Integrated Goods and Services Tax (IGST)",
    placeholder: "Enter IGST",
    customClasses: undefined
  },
  {
    name: "cgst",
    maxLength: 2,
    type: "number",
    label: "Central Goods and Services Tax (CGST)",
    placeholder: "Enter CGST",
    customClasses: undefined
  },
  {
    name: "sgst",
    maxLength: 2,
    type: "number",
    label: "State Goods and Services Tax (SGST)",
    placeholder: "Enter SGST",
    customClasses: undefined
  },
  {
    name: "parentCategory",
    label: "Wanna connect to Category (optional) ?",
    type: "select",
    placeholder: "Select category",
    options: [],
    customClasses: undefined
  },
  {
    name: "status",
    label: "Do you want to activate this Category?",
    type: "choose",
    required: false,
    customClasses: undefined
  },
];

export const ProductUOMType: FormField[] = [
  {
    name: "shortName",
    type: "text",
    required: true,
    label: "Unit of Measure Short Name",
    placeholder: "Enter UOM a short name",
    customClasses: undefined
  },
  {
    type: "text",
    required: true,
    name: "longName",
    label: "Unit of Measure Long Name",
    placeholder: "Enter UOM a long name",
    customClasses: undefined
  },
  {
    name: "status",
    label: "Do you want to activate this Unit of Measure (UOM)?",
    type: "choose",
    required: false,
    customClasses: undefined
  },
];
