import { FormField } from "@/hooks/types";
import { formatDate } from "@/hooks/general";
import { includes } from "@/hooks/polyfills";

const addressFields: FormField[] = [
  {
    name: "line1",
    type: "text",
    label: "Street Name",
    placeholder: "Enter street name",
    customClasses: "",
  },
  {
    name: "street",
    type: "text",
    label: "Street Address",
    placeholder: "Enter street address",
    customClasses: "",
  },
  {
    name: "city",
    type: "text",
    required: true,
    label: "City",
    placeholder: "Enter city",
    customClasses: "",
  },
  {
    name: "state",
    type: "text",
    required: true,
    label: "State",
    placeholder: "Enter state",
    customClasses: "",
  },
  {
    name: "pinCode",
    type: "text",
    required: true,
    label: "Pincode",
    placeholder: "Enter pincode",
    customClasses: "",
  },
  {
    name: "landmark",
    type: "text",
    label: "Landmark",
    placeholder: "Enter landmark",
    customClasses: "",
  },
  {
    name: "country",
    type: "text",
    required: true,
    label: "Country",
    placeholder: "Enter country",
    customClasses: "",
  },
];

const EmployeeaddressFields: FormField[] = [
  {
    name: "EMPline1",
    type: "text",
    label: "Street Name",
    placeholder: "Enter street name",
    customClasses: "",
  },
  {
    name: "EMPstreet",
    type: "text",
    label: "Street Address",
    placeholder: "Enter street address",
    customClasses: "",
  },
  {
    name: "EMPcity",
    type: "text",
    required: true,
    label: "City",
    placeholder: "Enter city",
    customClasses: "",
  },
  {
    name: "EMPstate",
    type: "text",
    required: true,
    label: "State",
    placeholder: "Enter state",
    customClasses: "",
  },
  {
    name: "EMPpinCode",
    type: "text",
    required: true,
    label: "Pincode",
    placeholder: "Enter pincode",
    customClasses: "",
  },
  {
    name: "EMPlandmark",
    type: "text",
    label: "Landmark",
    placeholder: "Enter landmark",
    customClasses: "",
  },
  {
    name: "EMPcountry",
    type: "text",
    required: true,
    label: "Country",
    placeholder: "Enter country",
    customClasses: "",
  },
];

export const LeadFormType: FormField[] = [
  {
    name: "firstName",
    type: "text",
    required: true,
    label: "First Name",
    placeholder: "Enter user name",
    customClasses: "",
  },
  {
    name: "lastName",
    type: "text",
    required: true,
    label: "Last Name",
    placeholder: "Enter user name",
    customClasses: "",
  },
  {
    name: "phone",
    maxLength: 15,
    label: "Phone",
    type: "stringNumeric",
    placeholder: "Enter your mobile number",
    required: true,
    customClasses: "",
  },

  {
    name: "email",
    type: "email",
    label: "Email",
    required: true,
    placeholder: "Enter your email",
    validation: (value) => (includes(value, "@") ? null : "Invalid email"),
    customClasses: "",
  },
  {
    name: "dateOfBirth",
    label: "Date of Birth",
    type: "date",
    required: false,
    maxDate: formatDate(new Date()),
    placeholder: "Enter date of birth",
    customClasses: "",
  },

  {
    name: "gender",
    type: "select",
    required: true,
    label: "Gender",
    placeholder: "Enter your gender",
    customClasses: "",
    options: [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
      { label: "Other", value: "Other" },
    ],
  },
  {
    name: "source",
    type: "text",
    required: true,
    label: "Source",
    placeholder: "Enter source",
    customClasses: "",
  },
  {
    name: "status",
    type: "select",
    required: true,
    label: "Status",
    // placeholder: "Enter pending",
    customClasses: "",
    options: [
      { label: "Pending", value: "Pending" },
      { label: "Contacted", value: "Contacted" },
      { label: "Qualified", value: "Qualified" },
      { label: "Converted", value: "Converted" },
      { label: "Closed", value: "Closed" },
    ],
    value: "Pending",
  },
  {
    name: "priorityLevel",
    type: "select",
    required: true,
    label: "Priority Level",
    placeholder: "Enter pending",
    customClasses: "",
    options: [
      { label: "Low", value: "Low" },
      { label: "Medium", value: "Medium" },
      { label: "High", value: "High" },
      { label: "Urgent", value: "Urgent" },
    ],
  },
  {
    name: "assignedSalesPerson",
    type: "select",
    required: true,
    label: "Assigned Sales Person",
    placeholder: "Enter Assigned Sales Person",
    customClasses: "",
    options: [], // This will hold the options for the Select component
  },

  {
    name: "statusUpdate",
    type: "text",
    required: true,
    label: "Status Update",
    placeholder: "Enter Status",
    customClasses: "",
  },

  ...addressFields,

  {
    name: "label",
    type: "label",
    required: false,
    label: "Company Details",
    placeholder: "Enter company name",
    customClasses: "",
  },

  {
    name: "br",
    type: "br",
    required: false,
    label: "br",
    placeholder: "Enter company name",
    customClasses: "",
  },
  {
    name: "br1",
    type: "br",
    required: false,
    label: "br",
    placeholder: "Enter company name",
    customClasses: "",
  },

  {
    name: "companyName",
    type: "text",
    required: true,
    label: "Company Name",
    placeholder: "Enter company name",
    customClasses: "",
  },

  //

  //

  {
    name: "designation",
    type: "text",
    required: true,
    label: "Designation",
    placeholder: "Enter designation",
    customClasses: "",
  },
  {
    name: "industry",
    type: "text",
    required: true,
    label: "Industry",
    placeholder: "Enter industry",
    customClasses: "",
  },
  {
    name: "website",
    type: "text",
    required: true,
    label: "Website",
    placeholder: "Enter website",
    customClasses: "",
  },
  {
    name: "companyPhoneNo",
    type: "text",
    required: true,
    label: "Company PhoneNo",
    placeholder: "Enter website",
    customClasses: "",
  },

  ...EmployeeaddressFields,
];
