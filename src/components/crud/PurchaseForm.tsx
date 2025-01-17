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
import { PurchaseFieldsType } from "./formInput/purchaseFormType";

interface LedgerProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const isDisabledFields = ["lead", "customer", "preparedBy"];

const PurchaseForm: React.FC<LedgerProps> = (props: any) => {
  const data = props.data;
  const formType = props.formType;
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [formField, setFormFields] = useState<any>(
    data?._id
      ? populateFormFields(
          PurchaseFieldsType,
          { ...data, lead: data?.lead ?? "" },
          isDisabledFields
        )
      : PurchaseFieldsType
  );
  const [formData, setFormData] = useState<any>(
    data?._id ? populateFormData(PurchaseFieldsType, data) : {}
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "/api/quotation/public/base-fields";
        const response: any = await Fetch(url, {}, 5000, true, false);
        const mappings = [
          { key: "leads", fieldName: "lead" },
          { key: "customers", fieldName: "customer" },
          { key: "products", fieldName: "productForm" },
          { key: "preparedBy", fieldName: "preparedBy" },
        ];
        const updatedFormField = formField.map((field: any) => {
          const mapping = mappings.find((m) => m.fieldName === field.name);
          if (mapping) {
            const dataKey = response.data[mapping.key] || data?.[mapping.key];
            if (Array.isArray(dataKey) && dataKey.length > 0) {
              if (mapping.key === "products")
                return { ...field, options: dataKey };
              else {
                const selectData = getSelectFormattedData(dataKey);
                return { ...field, options: selectData };
              }
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

  useEffect(() => {
    if (!loading) {
      const updatedFields = formField.map((field: any) => {
        if (formData.customer && field.name === "lead")
          return { ...field, isDisabled: true, value: "" };
        else if (formData.lead && field.name === "customer")
          return { ...field, isDisabled: true, value: "" };
        else if (field.name === "customer" || field.name === "lead")
          return { ...field, isDisabled: false };
        return field;
      });
      setFormFields(updatedFields);
    }
    // eslint-disable-next-line
  }, [formData.customer, formData.lead, loading]);

  const makeApiCall = async (updatedData: any) => {
    try {
      let url = "";
      if (data?._id) url = `${endpoints[formType].update}${data?._id}`;
      else url = `${endpoints[formType].create}`;

      setSubmitting(true);
      const updated = { products: products, ...updatedData };

      const response: any = data?._id
        ? await Put(url, updated)
        : await Post(url, updated);

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

  const customFunc = (data: any, items?: any) => {
    const updated = populateFormData(PurchaseFieldsType, {
      ...formData,
      ...data,
    });
    setFormData(updated);
    setProducts(items);
  };

  return (
    <div>
      {!loading && (
        <DynamicForm
          returnAs="object"
          fields={formField}
          formData={formData}
          submitting={submitting}
          customFunc={customFunc}
          onClose={props?.onClose}
          setFormData={setFormData}
          makeApiCall={makeApiCall}
        />
      )}
    </div>
  );
};

export default PurchaseForm;
