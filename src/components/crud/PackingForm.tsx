"use client";

import { toast } from "react-toastify";
import { endpoints } from "@/data/endpoints";
import DynamicForm from "../common/DynamicForm";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import { useCallback, useEffect, useState } from "react";
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

const isDisabledFields = [
  "packedBy",
  "quotationId",
  "warehouseId",
  "customerName",
  "totalQuantity",
];

const updateProductsWithMaxQuantity = (
  products: any,
  quantityObj: Record<string, number>
): any => {
  return products.map((product: any) => {
    if (quantityObj[product._id] !== undefined) {
      return { ...product, maxQuantity: quantityObj[product._id] };
    }
    return product;
  });
};

const PackingForm: React.FC<PackingProps> = (props: any) => {
  const data = props.data;

  const formType = props.formType;
  const [baseFields, setBaseFields] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [loading2, setLoading2] = useState(data?._id ? true : false);

  const [formField, setFormField] = useState<any>(
    data?._id
      ? populateFormFields(PackingFormType, data, isDisabledFields)
      : PackingFormType
  );

  const [formData, setFormData] = useState<any>(
    data?._id ? populateFormData(PackingFormType, data) : {}
  );
  const [stock, setStock] = useState<any>([]);

  const makeApiCall = async (updatedData: any) => {
    try {
      let url = "";
      if (data?._id) url = `${endpoints[formType].update}${data?._id}`;
      else url = `${endpoints[formType].create}`;

      setSubmitting(true);

      const productData = stock.reduce(
        (acc: Record<string, number>, s: any) => {
          const key = s.id || s.product;
          if (key) acc[key] = s.quantity;
          return acc;
        },
        {}
      );

      const totalQuantity = stock.reduce(
        (sum: any, item: any) => sum + item.quantity,
        0
      );

      updatedData = {
        ...updatedData,
        products: productData,
        netPackedQuantity: totalQuantity,
      };
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
    const fetchQuotationDetails = async () => {
      try {
        const url = `/api/quotation/${formData.quotationId}`;
        const response: any = await Fetch(url, {}, 5000, true, false);
        if (response.success && response?.data) {
          const fieldUpdates: Record<string, any> = {
            customerName: {
              updateFormData: {
                key: "customerName",
                value: response?.data?.customerName,
              },
              isDisabled: true,
              value: response?.data?.customerName,
            },
            netPackedQuantity: {
              updateFormData: {
                key: "netPackedQuantity",
                value: response?.data?.netPackedQuantity,
              },
              isDisabled: true,
              value: response?.data?.netPackedQuantity,
            },
            totalQuantity: {
              updateFormData: {
                key: "totalQuantity",
                value: response?.data?.totalQuantity,
              },
              isDisabled: true,
              value: response?.data?.totalQuantity,
            },
          };
          const updatedFormField = formField.map((field: any) => {
            const update = fieldUpdates[field.name];
            if (update) {
              if (update.updateFormData) {
                setFormData((prev: any) => ({
                  ...prev,
                  [update.updateFormData.key]: update.updateFormData.value,
                }));
              }
              return { ...field, ...update };
            }
            return field;
          });
          await fetchDetails(
            formData.quotationId,
            data?._id ? data?.products : response?.data?.products,
            updatedFormField
          );
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    if (formData.quotationId && baseFields) fetchQuotationDetails();
    // eslint-disable-next-line
  }, [formData.quotationId, baseFields]);

  const fetchDetails = useCallback(
    async (quotationId?: string, stock?: any, formField?: any) => {
      try {
        const url = `/api/packing/get-max-quantity`;
        const params = {
          packingId: data?._id ?? "",
          quotationId: formData.quotationId || quotationId,
        };
        const response: any = await Fetch(url, params, 5000, true, false);
        if (response.success && response?.data) {
          const data = updateProductsWithMaxQuantity(stock, response.data);
          const updatedStock = data.map((item: any) => ({
            ...item,
            quantity: item.maxQuantity <= item.quantity ? 0 : item.quantity,
          }));
          const updatedFormField = formField.map((field: any) => {
            if (field.name === "packing")
              return { ...field, options: updatedStock };
            return field;
          });
          setStock(updatedStock);
          setFormField(updatedFormField);
        }
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setLoading2(false);
      }
    },
    // eslint-disable-next-line
    []
  );

  // useEffect(() => {
  //   if (data?._id && formData.quotationId) fetchDetails();
  // }, [fetchDetails, formData.quotationId, data?._id]);

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
          if (mapping) {
            if (
              Array.isArray(response.data[mapping.key]) &&
              response.data[mapping.key].length > 0
            ) {
              const selectData = getSelectFormattedData(
                response.data[mapping.key]
              );
              return { ...field, options: selectData };
            }
          }
          return field;
        });
        setFormField(updatedFormField);
      } catch (error) {
        console.log("Error: ", error);
      } finally {
        setBaseFields(true);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handlePackaging = useCallback((data: any) => {
    setStock(data);
    const totalQuantity = data.reduce(
      (total: number, item: any) => total + (item?.quantity || 0),
      0
    );
    if (totalQuantity > 0) {
      setFormData((prev: any) => {
        if (prev.netPackedQuantity !== totalQuantity) {
          return { ...prev, netPackedQuantity: totalQuantity };
        }
        return prev;
      });
    }
  }, []);

  return (
    <div>
      {baseFields && !loading2 && (
        <>
          <DynamicForm
            returnAs="object"
            fields={formField}
            formData={formData}
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
