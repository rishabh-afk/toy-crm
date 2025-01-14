import { bankNames, countries, states } from "@/data/data";
import { FormField } from "@/hooks/types";

export const LedgerType: FormField[] = [
  {
    name: "companyName",
    type: "text",
    required: true,
    label: "Company Name",
    placeholder: "Enter company name",
  },

  {
    name: "contactPerson",
    type: "text",
    required: true,
    label: "Contact Person",
    placeholder: "Enter contact person",
  },
  {
    name: "ledgerType",
    type: "select",
    required: true,
    label: "Ledger Type",
    placeholder: "Enter ledger type",
    options: [
      { label: "Customer", value: "Customer" },
      { label: "Supplier", value: "Supplier" },
      { label: "Both", value: "Both" },
    ],
  },

  {
    name: "groupBy",
    type: "select",
    required: false,
    label: "Group By",
    placeholder: "Enter group by name",
  },

  {
    name: "gstNO",
    type: "text",
    required: false,
    label: "GST No",
    placeholder: "Enter gst no",
  },

  //   Address End

  {
    name: "panNo",
    type: "text",
    required: false,
    label: "PAN No",
    placeholder: "Enter pan no",
  },
  {
    name: "creditDays",
    type: "number",
    required: false,
    label: "Credit Days",
    placeholder: "Enter credit days",
  },
  {
    name: "creditLimit",
    type: "number",
    required: false,
    label: "Credit Limit",
    placeholder: "Enter credit limit",
  },

  {
    name: "mobileNo",
    type: "number",
    required: false,
    label: "Mobile No",
    placeholder: "Enter mobile no",
  },
  {
    name: "email",
    type: "email",
    required: false,
    label: "Email Id",
    placeholder: "Enter email id",
  },
  {
    name: "addtionalMobileNumber",
    type: "number",
    required: false,
    label: "Additional Mobile No",
    placeholder: "Enter additional mobile no",
  },
  {
    name: "additionalEmail",
    type: "email",
    required: false,
    label: "Additional Email Id",
    placeholder: "Enter additional email id",
  },
  {
    name: "bankDetails",
    type: "label",
    required: false,
    label: "Bank Details:",
    placeholder: "Enter bank details",
  },
  {
    name: "br1",
    type: "br",
    required: false,
    label: "br1",
    placeholder: "",
  },
  {
    name: "br2",
    type: "br",
    required: false,
    label: "br2",
    placeholder: "",
  },
  {
    name: "accountNo",
    type: "number",
    required: false,
    label: "A/C No",
    placeholder: "Enter account no",
  },
  {
    name: "bankName",
    type: "select",
    required: false,
    label: "Bank Name",
    placeholder: "Enter bank name",
    options: bankNames
      .filter((bank) => {
        return bank;
      })
      .map((bank) => {
        return { label: bank?.name, value: bank?.name };
      }),
  },
  {
    name: "branchAddress",
    type: "text",
    required: false,
    label: "Branch Address",
    placeholder: "Enter branch address",
  },
  {
    name: "ifscCode",
    type: "text",
    required: false,
    label: "IFSC Code",
    placeholder: "Enter ifsc code",
  },

  //   Address Start

  {
    name: "br3",
    type: "br",
    required: false,
    label: "br3",
    placeholder: "",
  },
  {
    name: "br4",
    type: "br",
    required: false,
    label: "br4",
    placeholder: "",
  },
  {
    name: "line1",
    type: "text",
    required: true,
    label: "Billing Address 1",
    placeholder: "Enter billing address 1",
  },
  {
    name: "landmark",
    type: "text",
    required: false,
    label: "Landmark",
    placeholder: "Enter landmark",
  },
  {
    name: "street",
    type: "text",
    required: false,
    label: "Street",
    placeholder: "Enter Street",
  },
  {
    name: "city",
    type: "text",
    required: true,
    label: "city",
    placeholder: "Enter city",
  },

  {
    name: "state",
    type: "select",
    required: true,
    label: "State",
    placeholder: "Enter state",
    options: states
      .filter((state) => {
        return state;
      })
      .map((state) => {
        return { label: state?.name, value: state?.name };
      }),
  },

  {
    name: "country",
    type: "select",
    required: true,
    label: "Country",
    placeholder: "Enter Country",
    options: countries
      .filter((country) => {
        return country;
      })
      .map((country) => {
        return { label: country?.name, value: country?.name };
      }),
  },

  {
    name: "pincode",
    type: "number",
    required: true,
    label: "Pin Code",
    placeholder: "Enter pin code",
  },

  {
    name: "br5",
    type: "br",
    required: false,
    label: "br5",
    placeholder: "",
  },
  {
    name: "br6",
    type: "br",
    required: false,
    label: "br6",
    placeholder: "",
  },

  {
    name: "EMPline",
    type: "text",
    required: false,
    label: "Billing Address 2",
    placeholder: "Enter billing address 2",
  },
  {
    name: "EMPlandmark",
    type: "text",
    required: false,
    label: "Landmark",
    placeholder: "Enter landmark",
  },
  {
    name: "EMPstreet",
    type: "text",
    required: false,
    label: "Street",
    placeholder: "Enter street",
  },
  {
    name: "EMPcity2",
    type: "text",
    required: false,
    label: "city",
    placeholder: "Enter city",
  },

  {
    name: "EMPstate",
    type: "select",
    required: false,
    label: "State",
    placeholder: "Enter state",
    options: states
      .filter((state) => {
        return state;
      })
      .map((state) => {
        return { label: state?.name, value: state?.name };
      }),
  },

  {
    name: "EMPcountry",
    type: "select",
    required: false,
    label: "Country",
    placeholder: "Enter Country",
    options: countries
      .filter((country) => {
        return country;
      })
      .map((country) => {
        return { label: country?.name, value: country?.name };
      }),
  },
  {
    name: "EMPpincode",
    type: "number",
    required: false,
    label: "Pin Code",
    placeholder: "Enter pin code",
  },
];
