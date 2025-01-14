"use client";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { endpoints } from "@/data/endpoints";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import {  QuotationFieldsType } from "./formInput/quotationFormType";
import {
  updateFormData,
  populateFormData,
  populateFormFields,
  getSelectFormattedData,
} from "@/hooks/general";
import CustomeForm from "../common/CustomeForm";

interface LedgerProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const QuotationForm: React.FC<LedgerProps> = (props: any) => {
  const data = props.data;
  const formType = props.formType;
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formField, setFormFields] = useState<any>(
    data?._id ? populateFormFields(QuotationFieldsType, data) : QuotationFieldsType
  );
  const [formData, setFormData] = useState<any>(
    data?._id ? populateFormData(QuotationFieldsType, data) : {}
  );

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response: any = await Fetch(
          "/api/user/public-role/Salesperson",
          {},
          5000,
          true,
          false
        );
        if (response.success && response?.data.length > 0) {
          const selectData = getSelectFormattedData(response.data);
          const updatedFormField = formField.map((obj: any) => {
            if (obj.name === "groupBy") return { ...obj, options: selectData };
            return obj;
          });
          setFormFields(updatedFormField);
        }
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoles();
    // eslint-disable-next-line
  }, []);

  const makeApiCall = async (updatedData: any) => {
    try {
      let url = "";
      if (data?._id) url = `${endpoints[formType].update}${data?._id}`;
      else url = `${endpoints[formType].create}`;

      setSubmitting(true);
      const obj = [
        "city",
        "line1",
        "state",
        "street",
        "pinCode",
        "country",
        "landmark",
        "latitude",
        "longitude",
      ];
      const updatedFormData = updateFormData(updatedData, "address", obj, obj);
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

  return (
    <div>
      {!loading && (
        // <DynamicForm
        //   returnAs="object"
        //   fields={formField}
          // formData={formData}
          // submitting={submitting}
          // onClose={props?.onClose}
          // setFormData={setFormData}
          // makeApiCall={makeApiCall}
        // />
        <CustomeForm fields={QuotationFieldsType}   formData={formData}
          submitting={submitting}
          onClose={props?.onClose}
          setFormData={setFormData}
          makeApiCall={makeApiCall}/>
      )}
    </div>
  );
};

export default QuotationForm;