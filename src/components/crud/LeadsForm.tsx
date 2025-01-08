"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { endpoints } from "@/data/endpoints";
import DynamicForm from "../common/DynamicForm";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import { LeadFormType } from "./formInput/LeadFormType";
import {
  updateFormData,
  populateFormData,
  populateFormFields,
} from "@/hooks/general";

interface LeadFormProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const LeadForm: React.FC<LeadFormProps> = (props: any) => {
  const data = props.data;
  const formType = props.formType;
  const formField = data?._id
    ? populateFormFields(LeadFormType, data)
    : LeadFormType;
  const [formData, setFormData] = useState<any>(
    data?._id ? populateFormData(LeadFormType, data) : {}
  );

  const makeApiCall = async (updatedData: any) => {
    try {
      let url = "";
      if (data?._id) url = `${endpoints[formType].update}${data?._id}`;
      else url = `${endpoints[formType].create}`;

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
    }
  };

  return (
    <div>
      <DynamicForm
        fields={formField}
        formData={formData}
        returnAs="formData"
        setFormData={setFormData}
        makeApiCall={makeApiCall}
      />
    </div>
  );
};

export default LeadForm;
