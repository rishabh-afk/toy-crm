"use client";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { endpoints } from "@/data/endpoints";
import DynamicForm from "../common/DynamicForm";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import { PackingFormType } from "./formInput/PackingFormType";
import {
  populateFormData,
  populateFormFields,
  getSelectFormattedData,
} from "@/hooks/general";

interface PackingProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const PackingForm: React.FC<PackingProps> = (props: any) => {
  const data = props.data;

  const formType = props.formType;
  const [stock, setStock] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [formField, setFormField] = useState<any>(
    data?._id ? populateFormFields(PackingFormType, data) : PackingFormType
  );

  const [formData, setFormData] = useState<any>(
    data?._id ? populateFormData(PackingFormType, data) : {}
  );

  const makeApiCall = async (updatedData: any) => {
    try {
      let url = "";
      if (data?._id) url = `${endpoints[formType].update}${data?._id}`;
      else url = `${endpoints[formType].create}`;

      setSubmitting(true);

      const productData = stock.reduce(
        (acc: Record<string, number>, s: any) => {
          acc[s.id] = s.productQuantity;
          return acc;
        },
        {}
      );

      updatedData = { ...updatedData, products: productData };

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
      return toast.error("Something went wrong!");
    } finally {
      props.onClose?.();
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchQuotationDetails = async () => {
      try {
        const url = `/api/quotation/${formData.quotationId}`;
        const response: any = await Fetch(url, {}, 5000, true, false);
        if (response.success && response?.data) {
          const updatedFormField = formField.map((obj: any) => {
            if (obj.name === "packing")
              return { ...obj, options: response?.data?.products };
            return obj;
          });
          setFormField(updatedFormField);
        }
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    if (formData.quotationId) fetchQuotationDetails();
    // eslint-disable-next-line
  }, [formData.quotationId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "/api/packing/public/base-fields";
        const response: any = await Fetch(url, {}, 5000, true, false);
        const mappings = [
          { key: "packedBy", fieldName: "packedBy" },
          { key: "warehouse", fieldName: "warehouseId" },
          { key: "quotation", fieldName: "quotationId" },
        ];
        const updatedFormField = formField.map((field: any) => {
          const mapping = mappings.find((m) => m.fieldName === field.name);
          if (
            mapping &&
            Array.isArray(response.data[mapping.key]) &&
            response.data[mapping.key].length > 0
          ) {
            const selectData = getSelectFormattedData(
              response.data[mapping.key]
            );
            return { ...field, options: selectData };
          }
          return field;
        });
        setFormField(updatedFormField);
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handlePackaging = (data: any) => {
    setStock(data);
  };

  return (
    <div>
      {!loading && (
        <>
          <DynamicForm
            fields={formField}
            formData={formData}
            returnAs="formData"
            submitting={submitting}
            onClose={props?.onClose}
            setFormData={setFormData}
            makeApiCall={makeApiCall}
            customFunc={handlePackaging}
          />
        </>
      )}
    </div>
  );
};

export default PackingForm;
