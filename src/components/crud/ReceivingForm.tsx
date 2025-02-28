"use client";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { endpoints } from "@/data/endpoints";
import DynamicForm from "../common/DynamicForm";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import {
  populateFormData,
  populateFormFields,
  getSelectFormattedData,
} from "@/hooks/general";
import { ReceivingFormType } from "./formInput/receivingFormType";

interface LedgerProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const ReceivingForm: React.FC<LedgerProps> = (props: any) => {
  const data = props.data;
  const formType = props.formType;
  const [submitting, setSubmitting] = useState(false);
  const [formField, setFormFields] = useState<any>(
    data?._id ? populateFormFields(ReceivingFormType, data) : ReceivingFormType
  );
  const [formData, setFormData] = useState<any>(
    data?._id ? populateFormData(ReceivingFormType, data) : {}
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "/api/receiving/public/base-fields";
        const param = { type: formData?.receivingType };
        const response: any = await Fetch(url, param, 5000, true, false);
        const mappings = [
          { key: "ledger", fieldName: "ledgerId" },
          { key: "invoices", fieldName: "invoiceId" },
        ];
        const updatedFormField = formField.map((field: any) => {
          const mapping = mappings.find((m) => m.fieldName === field.name);
          if (mapping) {
            const dataKey = response.data[mapping.key] || data?.[mapping.key];
            if (Array.isArray(dataKey) && dataKey.length > 0) {
              const selectData = getSelectFormattedData(dataKey);
              return { ...field, options: selectData };
            }
          }
          return field;
        });
        setFormFields(updatedFormField);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    if (formData?.receivingType) fetchData();
    // eslint-disable-next-line
  }, [formData.receivingType]);

  const makeApiCall = async (updatedData: any) => {
    try {
      let url = "";
      if (data?._id) url = `${endpoints[formType].update}${data?._id}`;
      else url = `${endpoints[formType].create}`;

      setSubmitting(true);

      const response: any = data?._id
        ? await Put(url, updatedData)
        : await Post(url, updatedData);

      if (response.success) {
        const fetchUrl = `${endpoints[formType].fetchAll}`;
        const resp: any = await Fetch(fetchUrl, {}, 5000, true, false);
        if (resp?.success) props?.setFilteredData(resp?.data?.result);
        if (resp?.success && resp?.data?.pagination)
          props?.setPaginate(resp?.data?.pagination);
      } else return toast.error("Something went wrong!");
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      props.onClose?.();
      setSubmitting(false);
    }
  };

  return (
    <div>
      <DynamicForm
        returnAs="object"
        fields={formField}
        formData={formData}
        submitting={submitting}
        onClose={props?.onClose}
        setFormData={setFormData}
        makeApiCall={makeApiCall}
      />
    </div>
  );
};

export default ReceivingForm;
