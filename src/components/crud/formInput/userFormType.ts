import { FormField } from "@/hooks/types";
import { formatDate } from "@/hooks/general";
import { includes } from "@/hooks/polyfills";

export const userFormType: FormField[] = [
  {
    name: "name",
    type: "text",
    required: true,
    label: "User Name",
    placeholder: "Enter user name",
    customClasses: undefined
  },
  {
    name: "mobileNo",
    maxLength: 15,
    label: "Mobile Number",
    type: "stringNumeric",
    placeholder: "Enter your mobile number",
    required: true,
    customClasses: undefined
  },
  {
    name: "altMobileNo",
    maxLength: 15,
    label: "Alternate Mobile Number",
    type: "stringNumeric",
    placeholder: "Enter your alternate mobile number",
    customClasses: undefined
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    required: true,
    placeholder: "Enter your email",
    validation: (value) => (includes(value, "@") ? null : "Invalid email"),
    customClasses: undefined
  },
  {
    name: "birthDate",
    label: "Date of Birth",
    type: "date",
    required: false,
    maxDate: formatDate(new Date()),
    placeholder: "Enter date of birth",
    customClasses: undefined
  },
  {
    name: "joiningDate",
    label: "Joining Date",
    type: "date",
    required: false,
    placeholder: "Enter join date",
    customClasses: undefined
  },
  {
    name: "leavingDate",
    label: "Leaving Date",
    type: "date",
    required: false,
    placeholder: "Enter date of leaving",
    customClasses: undefined
  },
  {
    type: "text",
    name: "qualification",
    label: "User's Qualification",
    placeholder: "Enter user's Qualification",
    customClasses: undefined
  },
  {
    name: "panNo",
    type: "text",
    label: "User's PAN Number",
    placeholder: "Enter user's PAN Number",
    customClasses: undefined
  },
  {
    name: "aadhaarNo",
    type: "text",
    label: "User's Aadhar Number",
    placeholder: "Enter user's Aadhar Number",
    customClasses: undefined
  },
  {
    name: "familyRefInfo",
    type: "text",
    label: "User's Family Reference Information",
    placeholder: "Enter user's Family Reference Information",
    customClasses: undefined
  },
  {
    name: "basic",
    maxLength: 10,
    type: "number",
    label: "Basic Salary",
    placeholder: "Enter basic Salary",
    customClasses: undefined
  },
  {
    name: "hra",
    maxLength: 10,
    type: "number",
    label: "Home Rental Allowance",
    placeholder: "Enter Home Rental Allowance",
    customClasses: undefined
  },
  {
    name: "conveyance",
    maxLength: 10,
    type: "number",
    label: "Conveyance",
    placeholder: "Enter conveyance",
    customClasses: undefined
  },
  {
    name: "role",
    label: "User Role",
    type: "select",
    required: true,
    placeholder: "Select user role",
    options: [],
    customClasses: undefined
  },
  {
    name: "line1",
    type: "text",
    required: true,
    label: "Address Line 1",
    placeholder: "Enter address line 1",
    customClasses: undefined
  },
  {
    name: "street",
    type: "text",
    label: "Street Name",
    placeholder: "Enter street name",
    customClasses: undefined
  },
  {
    name: "landmark",
    type: "text",
    label: "Landmark",
    placeholder: "Enter landmark",
    customClasses: undefined
  },
  {
    name: "country",
    type: "text",
    required: true,
    label: "Country",
    placeholder: "Enter country",
    customClasses: undefined
  },
  {
    name: "state",
    type: "text",
    required: true,
    label: "State",
    placeholder: "Enter state",
    customClasses: undefined
  },
  {
    name: "city",
    type: "text",
    required: true,
    label: "City",
    placeholder: "Enter city",
    customClasses: undefined
  },
  {
    name: "pinCode",
    type: "text",
    required: true,
    label: "Pincode",
    placeholder: "Enter pincode",
    customClasses: undefined
  },
  {
    name: "latitude",
    type: "text",
    label: "Latitude",
    placeholder: "Enter latitude",
    customClasses: undefined
  },
  {
    name: "longitude",
    type: "text",
    label: "Longitude",
    placeholder: "Enter longitude",
    customClasses: undefined
  },
  {
    name: "status",
    label: "Do you want to activate this user?",
    type: "choose",
    required: false,
    customClasses: undefined
  },
  {
    name: "profilePic",
    label: "Profile Image",
    type: "file",
    required: true,
    customClasses: undefined
  },
  {
    name: "panCardDoc",
    label: "Pan Card Image",
    type: "file",
    customClasses: undefined
  },
  {
    name: "aadhaarCardDoc",
    label: "Aadhar Card Image",
    type: "file",
    customClasses: undefined
  },
  {
    name: "otherDoc",
    label: "Other Documents Image",
    type: "file",
    customClasses: undefined
  },
];
