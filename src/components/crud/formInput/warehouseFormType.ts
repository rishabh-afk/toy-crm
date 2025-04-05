// import { countries } from "@/data/data";
import { FormField } from "@/hooks/types";
// import { getSelectFormattedData } from "@/hooks/general";
// import { states } from "@/data/states";

export const warehouseType: FormField[] = [
  {
    name: "name",
    type: "text",
    required: true,
    label: "Warehouse Name",
    placeholder: "Enter warehouse name",
  },
  {
    type: "text",
    name: "line1",
    required: true,
    label: "Address 1",
    placeholder: "Enter Line 1",
  },
  {
    name: "street",
    type: "text",
    label: "Street Address",
    placeholder: "Enter street address",
  },
  {
    type: "select",
    value: "India",
    name: "country",
    label: "Country",
    required: true,
    placeholder: "Select Country",
    options: [{ label: "India", value: "India" }],
  },
  {
    type: "select",
    name: "state",
    label: "State",
    options: [],
    required: true,
    placeholder: "Select state",
  },
  {
    type: "select",
    name: "city",
    label: "City",
    required: true,
    placeholder: "Select city",
    options: [],
  },
  {
    name: "pinCode",
    maxLength: 15,
    label: "Pin Code",
    required: true,
    type: "stringNumeric",
    placeholder: "Enter pin code",
  },
  {
    name: "landmark",
    type: "text",
    label: "Landmark",
    placeholder: "Enter landmark",
  },
  // { type: "br", name: "stock", label: "Stock Management", widthFull: true },
  // {
  //   name: "warehouse",
  //   type: "warehouse",
  //   widthFull: true,
  //   label: "Stock Management",
  //   options: [],
  // },
];
