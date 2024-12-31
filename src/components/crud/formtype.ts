export type FieldType =
  | "text"
  | "email"
  | "date"
  | "select"
  | "textarea"
  | "file";

export interface Field {
  name: string;
  label: string;
  options?: any;
  type: FieldType;
  optional?: boolean;
  maxLength?: number;
  multiple?: boolean;
  placeholder?: string;
  accept?: string; // Accept file types (e.g., images)
}

export interface Step {
  step: string;
  title: string;
  fields: Field[];
}

export const steps: Step[] = [
  {
    step: "Step 1",
    title: "Property Details",
    fields: [
      {
        name: "title",
        type: "text",
        label: "Property Title*",
        placeholder: "Enter the property title",
      },
      {
        name: "description",
        type: "textarea",
        label: "Property Description",
        placeholder: "Enter a short description of the property",
      },
      {
        name: "price",
        type: "text",
        label: "Price",
        placeholder: "Enter the property price",
      },
      {
        name: "propertyType",
        type: "select",
        label: "Property Type",
        options: ["India"],
      },
      {
        name: "status",
        type: "select",
        label: "Property Status",
        options: ["For-Sale", "For-Rent", "Sold"],
      },
      {
        name: "yearBuilt",
        type: "text",
        label: "Year Built",
        placeholder: "Enter the year the property was built",
      },
      {
        name: "floors",
        type: "text",
        label: "Number of Floors",
        placeholder: "Enter the number of floors",
      },
      {
        name: "area",
        type: "text",
        label: "Area (sq. ft)",
        placeholder: "Enter the area of the property",
      },
      {
        name: "landArea",
        type: "text",
        label: "Land Area (sq. ft)",
        placeholder: "Enter the land area",
      },
    ],
  },
  {
    step: "Step 2",
    title: "Location Details",
    fields: [
      {
        name: "fullAddress",
        type: "text",
        label: "Full Address",
        placeholder: "Enter your full address",
      },
      {
        name: "city",
        type: "text",
        label: "City",
        placeholder: "Enter the city",
      },
      {
        name: "state",
        type: "text",
        label: "State",
      },
      {
        name: "country",
        type: "select",
        label: "Country",
        options: ["Hungary", "India", "USA", "Canada"],
      },
      {
        name: "pinCode",
        type: "text",
        label: "Pin Code",
        placeholder: "Enter the pin code",
      },
    ],
  },
  {
    step: "Step 3",
    title: "Owner Details",
    fields: [
      {
        name: "ownerName",
        type: "text",
        label: "Owner's Name",
        placeholder: "Enter the owner's name",
      },
      {
        name: "ownerEmail",
        type: "email",
        label: "Owner's Email",
        placeholder: "Enter the owner's email",
      },
      {
        name: "ownerMobile",
        type: "text",
        label: "Owner's Mobile",
        placeholder: "Enter the owner's mobile number",
      },
    ],
  },
  {
    step: "Step 4",
    title: "Amenities and Features",
    fields: [
      {
        name: "amenities",
        type: "select",
        label: "Amenities",
        multiple: true,
        options: ["WiFi", "Air Conditioning", "Furnished", "Security Cameras"],
      },
      {
        name: "bedrooms",
        type: "text",
        label: "Number of Bedrooms",
        placeholder: "Enter the number of bedrooms",
      },
      {
        name: "bathrooms",
        type: "text",
        label: "Number of Bathrooms",
        placeholder: "Enter the number of bathrooms",
      },
    ],
  },
  {
    step: "Step 5",
    title: "Images Upload",
    fields: [
      {
        name: "images",
        type: "file",
        label: "Property Images",
        multiple: true,
        accept: "image/*",
      },
    ],
  },
  {
    step: "Step 6",
    title: "Property Availability",
    fields: [
      {
        name: "availableFrom",
        type: "date",
        label: "Available From",
        placeholder: "Select the date when the property is available",
      },
      {
        name: "availabilityStatus",
        type: "select",
        label: "Availability Status",
        options: ["Available", "Sold", "Pending"],
      },
    ],
  },
];
