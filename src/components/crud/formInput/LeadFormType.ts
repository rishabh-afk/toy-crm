// import { states } from "@/data/states";
import { FormField } from "@/hooks/types";
import { includes } from "@/hooks/polyfills";
import { formatDate } from "@/hooks/general";

export const LeadFormType: FormField[] = [
  {
    name: "firstName",
    type: "text",
    required: true,
    label: "First Name",
    placeholder: "Enter user name",
  },
  {
    name: "lastName",
    type: "text",
    required: true,
    label: "Last Name",
    placeholder: "Enter user name",
  },
  {
    name: "phone",
    maxLength: 15,
    label: "Phone",
    type: "stringNumeric",
    placeholder: "Enter your mobile number",
    required: true,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Enter your email",
    validation: (value) => (includes(value, "@") ? null : "Invalid email"),
  },
  {
    name: "gender",
    type: "select",
    label: "Gender",
    placeholder: "Enter your gender",
    options: [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
      { label: "Other", value: "Other" },
    ],
  },
  // {
  //   name: "age",
  //   maxLength: 3,
  //   required: true,
  //   type: "stringNumeric",
  //   label: "Lead Age (in Days)",
  //   placeholder: "Enter Lead Age (in Days)",
  // },
  { type: "br", name: "Address", label: "Address Details", widthFull: true },
  {
    type: "text",
    name: "line1",
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
    placeholder: "Select Country",
    options: [{ label: "India", value: "India" }],
  },
  {
    type: "select",
    name: "state",
    label: "State",
    options: [],
    placeholder: "Select state",
  },
  {
    type: "select",
    name: "city",
    label: "City",
    placeholder: "Select city",
    options: [],
  },
  {
    name: "pinCode",
    maxLength: 15,
    label: "Pin Code",
    type: "stringNumeric",
    placeholder: "Enter pin code",
  },
  {
    name: "landmark",
    type: "text",
    label: "Landmark",
    placeholder: "Enter landmark",
  },
  { type: "br", name: "lead", label: "Lead information", widthFull: true },
  {
    name: "source",
    type: "text",
    label: "Source",
    placeholder: "Enter source",
  },
  // {
  //   name: "status",
  //   type: "select",
  //   label: "Status",
  //   placeholder: "Enter lead status",
  //   options: [
  //     { label: "Pending", value: "Pending" },
  //     { label: "Contacted", value: "Contacted" },
  //     { label: "Qualified", value: "Qualified" },
  //     { label: "Converted", value: "Converted" },
  //     { label: "Closed", value: "Closed" },
  //   ],
  // },
  {
    name: "priorityLevel",
    type: "select",
    label: "Priority Level",
    placeholder: "Enter priority level",
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
    label: "Assigned Sales Person",
    required: true,
    placeholder: "Enter Assigned Sales Person",
    options: [], // This will hold the options for the Select component
  },
  {
    name: "leadType",
    type: "select",
    label: "Lead Type",
    required: true,
    placeholder: "Select Sales Type",
    options: [
      { label: "Individual", value: "Individual" },
      { label: "Company", value: "Company" },
    ], // This will hold the options for the Select component
  },
  {
    name: "followUp",
    label: "Follow Up",
    type: "date",
    minDate: formatDate(new Date()),
    placeholder: "Select follow up",
  },
  // {
  //   name: "document",
  //   label: "Upload Documents",
  //   type: "file",
  // },
  {
    rows: 5,
    name: "description",
    label: "Description",
    type: "textarea",
    widthFull: true,
    minDate: formatDate(new Date()),
    placeholder: "Enter Description",
  },
  // {
  //   name: "statusUpdate",
  //   type: "text",
  //   label: "Status Update",
  //   placeholder: "Enter Status",
  // },
  { type: "br", name: "Company", label: "Company Details", widthFull: true },
  {
    name: "companyName",
    type: "text",
    label: "Company Name",
    placeholder: "Enter company name",
  },
  // {
  //   name: "designation",
  //   type: "text",
  //   label: "Designation",
  //   placeholder: "Enter designation",
  // },
  // {
  //   name: "industry",
  //   type: "text",
  //   label: "Industry",
  //   placeholder: "Enter industry",
  // },
  // {
  //   name: "website",
  //   type: "text",
  //   label: "Website",
  //   placeholder: "Enter website",
  // },
  {
    maxLength: 15,
    type: "stringNumeric",
    name: "companyPhoneNo",
    label: "Company PhoneNo",
    placeholder: "Enter phone number",
  },
  // {
  //   type: "br",
  //   name: "Company Address",
  //   label: "Company Address Details",
  //   widthFull: true,
  // },
  // {
  //   type: "text",
  //   name: "line1Company",
  //   label: "Address 1",
  //   required: true,
  //   placeholder: "Enter Line 1",
  // },
  // {
  //   name: "streetCompany",
  //   type: "text",
  //   label: "Street Address",
  //   placeholder: "Enter street address",
  // },
  // {
  //   name: "cityCompany",
  //   type: "text",
  //   label: "City",
  //   required: true,
  //   placeholder: "Enter city",
  // },
  // {
  //   name: "stateCompany",
  //   type: "text",
  //   required: true,
  //   label: "State",
  //   placeholder: "Enter state",
  // },
  // {
  //   name: "pinCodeCompany",
  //   maxLength: 15,
  //   label: "Pin Code",
  //   required: true,
  //   type: "stringNumeric",
  //   placeholder: "Enter pin code",
  // },
  // {
  //   type: "select",
  //   name: "countryCompany",
  //   required: true,
  //   label: "Country",
  //   placeholder: "Select Country",
  //   options: getSelectFormattedData(countries),
  // },
  // {
  //   name: "landmarkCompany",
  //   type: "text",
  //   label: "Landmark",
  //   placeholder: "Enter landmark",
  // },
];
