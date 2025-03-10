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
import { ExpenseFormType } from "./formInput/ExpenseFormType";

interface LedgerProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const ExpenseForm: React.FC<LedgerProps> = (props: any) => {
  const data = props.data;
  const formType = props.formType;
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formField, setFormFields] = useState<any>(
    data?._id ? populateFormFields(ExpenseFormType, data) : ExpenseFormType
  );
  const [formData, setFormData] = useState<any>(
    data?._id ? populateFormData(ExpenseFormType, data) : {}
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "/api/expense/public/base-fields";
        const response: any = await Fetch(url, {}, 5000, true, false);
        const mappings = [{ key: "data", fieldName: "userId" }];
        const updatedFormField = formField.map((field: any) => {
          const mapping = mappings.find((m) => m.fieldName === field.name);
          if (mapping) {
            const dataKey = response.data;
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
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

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
        props.onClose?.();
      } else return toast.error("Something went wrong!");
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {!loading && (
        <DynamicForm
          fields={formField}
          formData={formData}
          returnAs="formData"
          submitting={submitting}
          onClose={props?.onClose}
          setFormData={setFormData}
          makeApiCall={makeApiCall}
        />
      )}
    </div>
  );
};

export default ExpenseForm;
