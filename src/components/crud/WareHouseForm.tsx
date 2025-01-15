"use client";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { endpoints } from "@/data/endpoints";
import DynamicForm from "../common/DynamicForm";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import { warehouseType } from "./formInput/warehouseFormType";
import {
  nestFields,
  populateFormData,
  populateFormFields,
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
  const [stock, setStock] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formField, setFormFields] = useState<any>(
    data?._id ? populateFormFields(warehouseType, data) : warehouseType
  );
  const [formData, setFormData] = useState<any>(
    data?._id ? populateFormData(warehouseType, data) : {}
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = "/api/product/public";
        const response: any = await Fetch(url, {}, 5000, true, false);
        if (response.success && response?.data.length > 0) {
          const updatedFormField = formField.map((obj: any) => {
            if (obj.name === "warehouse" && data?.stock) {
              const resp = response.data.map((dataItem: any) => {
                const stockItem = data.stock[dataItem?._id];
                return {
                  ...dataItem,
                  quantity: stockItem ? stockItem : 0,
                };
              });
              return { ...obj, options: resp };
            } else if (obj.name === "warehouse")
              return { ...obj, options: response?.data };

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
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const makeApiCall = async (updatedData: any) => {
    try {
      let url = "";
      if (data?._id) url = `${endpoints[formType].update}${data?._id}`;
      else url = `${endpoints[formType].create}`;

      setSubmitting(true);
      let nestedObj = nestFields(updatedData, "address", [
        "city",
        "line1",
        "state",
        "street",
        "pinCode",
        "country",
        "landmark",
      ]);

      const stockData = stock.reduce((acc: Record<string, number>, s: any) => {
        acc[s.id] = s.productQuantity;
        return acc;
      }, {});

      nestedObj = { ...nestedObj, stock: stockData };

      const response: any = data?._id
        ? await Put(url, nestedObj)
        : await Post(url, nestedObj);

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

  const handleStocks = (data: any) => {
    setStock(data);
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
          customFunc={handleStocks}
        />
      )}
    </div>
  );
};

export default WarehouseForm;