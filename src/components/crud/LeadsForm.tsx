"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { endpoints } from "@/data/endpoints";
import DynamicForm from "../common/DynamicForm";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import { LeadFormType } from "./formInput/LeadFormType";
import {
  nestFields,
  populateFormData,
  populateFormFields,
  getSelectFormattedData,
  removeSuffixInNestedObject,
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
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formField, setFormField] = useState<any>(
    data?._id ? populateFormFields(LeadFormType, data) : LeadFormType
  );

  const [formData, setFormData] = useState<any>(
    data?._id ? populateFormData(LeadFormType, data) : {}
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
            if (obj.name === "assignedSalesPerson")
              return { ...obj, options: selectData };
            return obj;
          });
          setFormField(updatedFormField);
          console.log("this is the data", selectData);
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
      const nestedObj = nestFields(updatedData, "address", [
        "city",
        "line1",
        "state",
        "street",
        "pinCode",
        "country",
        "landmark",
      ]);
      let nestedObj2 = nestFields(nestedObj, "companyAddress", [
        "cityCompany",
        "line1Company",
        "stateCompany",
        "streetCompany",
        "pinCodeCompany",
        "countryCompany",
        "landmarkCompany",
      ]);

      nestedObj2 = removeSuffixInNestedObject(
        nestedObj2,
        "companyAddress",
        "Company"
      );

      const response: any = data?._id
        ? await Put(url, nestedObj2)
        : await Post(url, nestedObj2);

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
        <DynamicForm
          returnAs="object"
          fields={formField}
          formData={formData}
          submitting={submitting}
          onClose={props?.onClose}
          setFormData={setFormData}
          makeApiCall={makeApiCall}
        />
      )}
    </div>
  );
};

export default LeadForm;
