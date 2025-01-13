"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { endpoints } from "@/data/endpoints";
import DynamicForm from "../common/DynamicForm";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import { BillingFormType } from "./formInput/BillingFormTypes";
import {
  updateFormData,
  populateFormData,
  populateFormFields,
} from "@/hooks/general";
import TableComponent from "../common/Table";

interface BillingProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

interface TableData {
  slNo: number;
  itemCode: string;
  description: string;
  uom: string;
  quotationQty: number;
  packQty: number;
}
const BillingForm: React.FC<BillingProps> = (props: any) => {
  const data = props.data;

  const formType = props.formType;
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formField, setFormField] = useState<any>(
    data?._id ? populateFormFields(BillingFormType, data) : BillingFormType
  );

  const [formData, setFormData] = useState<any>(
    data?._id ? populateFormData(BillingFormType, data) : {}
  );

  const makeApiCall = async (updatedData: any) => {
    try {
      let url = "";
      if (data?._id) url = `${endpoints[formType].update}${data?._id}`;
      else url = `${endpoints[formType].create}`;

      console.log(url);
      setSubmitting(true);

      const updatedFormData = updateFormData(updatedData, " ", [], []);

      //    let updateFormData(formData: FormData, nestedFieldKey: string, nestedFields: string[], fieldsToRemove: string[]): FormData

      const response: any = data?._id
        ? await Put(url, updatedFormData)
        : await Post(url, updatedFormData);

      if (response.success) {
        const fetchUrl = `${endpoints[formType].fetchAll}`;
        const resp: any = await Fetch(fetchUrl, {}, 5000, true, false);
        if (resp?.success) props?.setFilteredData(resp?.data?.result);
        if (resp?.success && resp?.data?.pagination)
          props?.setPaginate(resp?.data?.pagination);
      } else return toast.error("Something went wrong!");
    } catch (error) {
      console.log("Error: ", error);
      return toast.error("Something went wrong!");
    } finally {
      props.onClose?.();
      setSubmitting(false);
    }
  };

  const [tableData] = useState<TableData[]>([
    {
      slNo: 1,
      itemCode: "A001",
      description: "Item A",
      uom: "pcs",
      quotationQty: 100,
      packQty: 50,
    },
    {
      slNo: 2,
      itemCode: "B002",
      description: "Item B",
      uom: "kg",
      quotationQty: 200,
      packQty: 150,
    },
    {
      slNo: 3,
      itemCode: "C003",
      description: "Item C",
      uom: "box",
      quotationQty: 300,
      packQty: 250,
    },
  ]);

  const [columns] = useState([
    { key: "slNo", label: "Sl.No." },
    { key: "itemCode", label: "Item Code" },
    { key: "description", label: "Description" },
    { key: "uom", label: "UOM" },
    { key: "quotationQty", label: "Quotation Qty." },
    { key: "packQty", label: "Pack Qty." },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch UOM data
        const uomResponse: any = await Fetch(
          "/api/ledger",
          {},
          5000,
          true,
          false
        );

        if (data.shipTo) {
          // Modify the formField for 'quotation' if quotationNo is present
          const updatedFormField = formField.map((obj: any) => {
            if (obj.name === "shipTo") {
              console.log("this is the data", data.quotationNo);
              return {
                ...obj,
                isDisabled: true, // Disable the field
                //   options: [{ label: data.quotationNo, value: data.quotationNo }], // Set UOM options
                value: data.shipTo, // Set the value to data.quotationNo
              };
            }
            return obj;
          });

          setFormField(updatedFormField); // Update the form field with the changes
          console.log(
            "Updated form field with disabled quotation:",
            updatedFormField
          );
        }

        if (uomResponse.success && uomResponse?.data.length > 0) {
          // Transform the UOM API data into select options
          const uomOptions = uomResponse.data.map((item: any) => ({
            label: item._id, // Show shortName in the dropdown
            value: item.companyName, // Use quotationNo as the option's value
          }));

          // Update the formField state with UOM options
          const updatedFormField = formField.map((obj: any) => {
            if (obj.name === "shipTo") {
              return { ...obj, options: uomOptions }; // Set UOM options
            }
            return obj;
          });

          setFormField(updatedFormField); // Set the updated form field with UOM options
          console.log("UOM options:", uomOptions); // Debugging UOM
        }
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Trigger the data fetch process
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {!loading && (
        <>
          <TableComponent
            data={tableData} // Pass tableData to TableComponent
            columns={columns} // Pass columns to TableComponent
            operationsAllowed={undefined}
          />
          <DynamicForm
            fields={formField}
            formData={formData}
            returnAs="formData"
            submitting={submitting}
            onClose={props?.onClose}
            setFormData={setFormData}
            makeApiCall={makeApiCall}
          />
        </>
      )}
    </div>
  );
};

export default BillingForm;
