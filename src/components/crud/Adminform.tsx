"use client";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { endpoints } from "@/data/endpoints";
import DynamicForm from "../common/DynamicForm";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import { userFormType } from "./formInput/userFormType";
import {
  updateFormData,
  populateFormData,
  populateFormFields,
  getSelectFormattedData,
} from "@/hooks/general";

interface DealerFormProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const UserForm: React.FC<DealerFormProps> = (props: any) => {
  const data = props.data;
  const formType = props.formType;
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [fetchingStates, setFetchingState] = useState(true);
  const [formField, setFormFields] = useState<any>(
    data?._id ? populateFormFields(userFormType, data) : userFormType
  );
  const [formData, setFormData] = useState<any>(
    data?._id ? populateFormData(userFormType, data) : {}
  );

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response: any = await Fetch(
          "/api/role/public",
          {},
          5000,
          true,
          false
        );
        if (response.success && response?.data.length > 0) {
          const selectData = getSelectFormattedData(response.data);
          const updatedFormField = formField.map((obj: any) => {
            if (obj.name === "role") return { ...obj, options: selectData };
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
        props.onClose?.();
      } else return toast.error("Something went wrong!");
    } catch (error) {
      console.log("Error: ", error);
    } finally {
      setSubmitting(false);
    }
  };


  useEffect(() => {
    const fetchStates = async () => {
      try {
        const url = "/api/region/state";
        const response: any = await Fetch(url, {}, 5000, true, false);
        if (response?.length > 0) {
          const sortedData = response.sort((a: any, b: any) =>
            a.name.localeCompare(b.name)
          );
          const selectData = getSelectFormattedData(sortedData);
          const updatedFormField = formField.map((obj: any) => {
            if (obj.name === "state")
              return { ...obj, options: selectData };
            return obj;
          });
          setFormFields(updatedFormField);
        }
      } catch (error) {
        console.log("State fetch error: ", error)
      } finally {
        setFetchingState(false);
      }
    }
    if (!loading) setTimeout(() => { fetchStates(); }, 500);
    // eslint-disable-next-line
  }, [loading]);

  useEffect(() => {
    const fetchCity = async () => {
      if (formData?.state) {
        try {
          const url = "/api/region/city/";
          const response: any = await Fetch(url + formData?.state, {}, 5000, true, false);
          if (response?.length > 0) {
            const sortedData = response.sort((a: any, b: any) =>
              a.name.localeCompare(b.name)
            );
            const selectData = getSelectFormattedData(sortedData);
            const updatedFormField = formField.map((obj: any) => {
              if (obj.name === "city")
                return { ...obj, options: selectData };
              return obj;
            });
            setFormFields(updatedFormField);
          }
        } catch (error) {
          console.log("State fetch error: ", error)
        }
      }
    }
    if (!loading && !fetchingStates) fetchCity();
    // eslint-disable-next-line
  }, [formData.state, loading, fetchingStates])


  return (
    <div>
      {!loading && !fetchingStates && (
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

export default UserForm;
