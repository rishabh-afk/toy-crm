"use client";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { endpoints } from "@/data/endpoints";
import DynamicForm from "../common/DynamicForm";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import { warehouseType } from "./formInput/warehouseFormType";
import {
  populateFormData,
  populateFormFields,
  getSelectFormattedData,
} from "@/hooks/general";

interface WarehouseProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const WarehouseForm: React.FC<WarehouseProps> = (props: any) => {
  const data = props.data;
  const formType = props.formType;
  const [submitting, setSubmitting] = useState(false);
  const [fetchingStates, setFetchingState] = useState(true);
  const [formField, setFormField] = useState(
    data?._id ? populateFormFields(warehouseType, data) : warehouseType
  );

  const [formData, setFormData] = useState<any>(
    data?._id ? populateFormData(warehouseType, data) : {}
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
            if (obj.name === "state") return { ...obj, options: selectData };
            return obj;
          });
          setFormField(updatedFormField);
        }
      } catch (error) {
        console.log("State fetch error: ", error);
      } finally {
        setFetchingState(false);
      }
    };
    fetchStates();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchCity = async () => {
      if (formData?.state) {
        try {
          const url = "/api/region/city/";
          const response: any = await Fetch(
            url + formData?.state,
            {},
            5000,
            true,
            false
          );
          if (response?.length > 0) {
            const sortedData = response.sort((a: any, b: any) =>
              a.name.localeCompare(b.name)
            );
            const selectData = getSelectFormattedData(sortedData);
            const updatedFormField = formField.map((obj: any) => {
              if (obj.name === "city") return { ...obj, options: selectData };
              return obj;
            });
            setFormField(updatedFormField);
          }
        } catch (error) {
          console.log("State fetch error: ", error);
        }
      }
    };
    if (!fetchingStates) fetchCity();
    // eslint-disable-next-line
  }, [formData.state, fetchingStates]);

  // useEffect(() => {
  //   const fetchQuotationDetails = async () => {
  //     try {
  //       const url = `/api/quotation/${formData.quotation}`;
  //       const response: any = await Fetch(url, {}, 5000, true, false);
  //       if (response.success && response?.data) {
  //         const fieldUpdates: Record<string, any> = {
  //           packing: { options: response?.data?.products },
  //           customer: {
  //             updateFormData: {
  //               key: "customer",
  //               value: response?.data?.customerName,
  //             },
  //             isDisabled: true,
  //             value: response?.data?.customerName,
  //           },
  //           netPackedQuantity: {
  //             updateFormData: {
  //               value: 0,
  //               key: "netPackedQuantity",
  //             },
  //             value: 0,
  //             isDisabled: true,
  //           },
  //           totalQuantity: {
  //             updateFormData: {
  //               key: "totalQuantity",
  //               value: response?.data?.totalQuantity,
  //             },
  //             isDisabled: true,
  //             value: response?.data?.totalQuantity,
  //           },
  //         };

  //         const updatedFormField = formField.map((field: any) => {
  //           const update = fieldUpdates[field.name];
  //           if (update) {
  //             if (update.updateFormData) {
  //               setFormData((prev: any) => ({
  //                 ...prev,
  //                 [update.updateFormData.key]: update.updateFormData.value,
  //               }));
  //             }
  //             return { ...field, ...update };
  //           }
  //           return field;
  //         });

  //         setFormFields(updatedFormField);
  //       }
  //     } catch (error) {
  //       console.log("Error: ", error);
  //     }
  //   };
  //   if (formData.quotation) fetchQuotationDetails();
  //   // eslint-disable-next-line
  // }, [formData.quotation]);

  const handleStocks = (data: any) => {
    console.log(data);
    // setStock(data);
  };

  return (
    <div>
      {!fetchingStates && (
        <DynamicForm
          returnAs="object"
          fields={formField}
          formData={formData}
          submitting={submitting}
          onClose={props?.onClose}
          setFormData={setFormData}
          makeApiCall={makeApiCall}
          customFunc={handleStocks}
        />
      )}
    </div>
  );
};

export default WarehouseForm;
