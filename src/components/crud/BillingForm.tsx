"use client";

import { toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";
import { endpoints } from "@/data/endpoints";
import DynamicForm from "../common/DynamicForm";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import { BillingFormType } from "./formInput/BillingFormTypes";
import {
  getSelectFormattedData,
  populateFormData,
  populateFormFields,
} from "@/hooks/general";

interface BillingProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
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
      return toast.error("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "/api/invoice/public/base-fields";
        const response: any = await Fetch(url, {}, 5000, true, false);
        const mappings = [
          { key: "ledgers", fieldName: "shipTo" },
          { key: "users", fieldName: "preparedBy" },
          { key: "ledgers", fieldName: "invoiceTo" },
          { key: "quotations", fieldName: "quotationId" },
        ];
        const fetchQuotationDetails = () => {
          setFormField((prevFields: any[]) =>
            prevFields.map((field) => {
              if (field.name === "productBillingForm") {
                setFormData((prev: any) => ({
                  ...prev,
                  [field.name]: data?.quotation?.products,
                }));
                return { ...field, options: data?.quotation?.products };
              }
              if (field.name === "quotationId") {
                const dataKey = [
                  { _id: data?.quotationId, name: data?.quotationNo },
                ];
                setFormData((prev: any) => ({
                  ...prev,
                  [field.name]: data?.quotationId,
                }));
                return { ...field, options: getSelectFormattedData(dataKey) };
              }
              return field;
            })
          );
        };
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
        setFormField(updatedFormField);
        if (data?._id) fetchQuotationDetails();
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
    const fetchQuotationDetails = async () => {
      try {
        const url = `/api/quotation/${formData.quotationId}`;
        const response: any = await Fetch(url, {}, 5000, true, false);
        if (response.success && response?.data) {
          const fieldUpdates: Record<string, any> = {
            productBillingForm: { options: response?.data?.products },
            invoiceTo: {
              updateFormData: {
                key: "invoiceTo",
                value: response?.data?.customer,
              },
              isDisabled: true,
              value: response?.data?.customer,
            },
            shipTo: {
              updateFormData: {
                key: "shipTo",
                value: response?.data?.customer,
              },
              isDisabled: true,
              value: response?.data?.customer,
            },
          };
          const updatedFormField = formField.map((field: any) => {
            const update = fieldUpdates[field.name];
            if (update) {
              if (update.updateFormData) {
                console.log(update.updateFormData.value);
                setFormData((prev: any) => ({
                  ...prev,
                  [update.updateFormData.key]: update.updateFormData.value,
                }));
              }
              return { ...field, ...update };
            }
            return field;
          });
          setFormField(updatedFormField);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    if (formData.quotationId && !data?._id) fetchQuotationDetails();
    // eslint-disable-next-line
  }, [formData.quotationId]);

  const customFunc = useCallback((data: any, items?: any) => {
    console.log(items);
    setFormData((prevFormData: any) => {
      const updated = populateFormData(BillingFormType, {
        ...prevFormData,
        ...data,
      });

      if (JSON.stringify(updated) !== JSON.stringify(prevFormData)) {
        return updated;
      }
      return prevFormData;
    });
  }, []);

  return (
    <div>
      {!loading && (
        <>
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
        </>
      )}
    </div>
  );
};

export default BillingForm;
