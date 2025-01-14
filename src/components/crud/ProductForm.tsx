"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { endpoints } from "@/data/endpoints";
import DynamicForm from "../common/DynamicForm";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import { ProductFormType } from "./formInput/productFromType";
// import { ProductFormType } from "./formInput/productFromType";
import {
  updateFormData,
  populateFormData,
  populateFormFields,
} from "@/hooks/general";

interface ProductProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const ProductForm: React.FC<ProductProps> = (props: any) => {
  const data = props.data;
  const formType = props.formType;
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formField, setFormField] = useState<any>(
    data?._id ? populateFormFields(ProductFormType, data) : ProductFormType
  );

  
  const [formData, setFormData] = useState<any>(
    data?._id ? populateFormData(ProductFormType, data) : {}
  );



    useEffect(() => {
      const fetchData = async () => {
        try {
          // Fetch UOM data
          const uomResponse: any = await Fetch(
            "/api/product-uom",
            {},
            5000,
            true,
            false
          );

          if (uomResponse.success && uomResponse?.data.result.length > 0) {
            // Transform the UOM API data into select options
            const uomOptions = uomResponse.data.result.map((item: any) => ({
              label: item._id, // Show shortName in the dropdown
              value: item.shortName, // Use _id as the option's value
            }));

            // Fetch Brand data after UOM is successfully fetched
            const brandResponse: any = await Fetch(
              "/api/brand/public",
              {},
              5000,
              true,
              false
            );

            if (brandResponse.success && brandResponse?.data.length > 0) {
              // Transform the Brand API data into select options
              const brandOptions = brandResponse.data.map((item: any) => ({
                label: item._id, // Show brand name in the dropdown
                value: item.name, // Use _id as the option's value
              }));

              // Fetch Product Category data after Brand is successfully fetched
              const categoryResponse: any = await Fetch(
                "/api/product-category",
                {},
                5000,
                true,
                false
              );

              if (
                categoryResponse.success &&
                categoryResponse?.data.result.length > 0
              ) {
                // Transform the Product Category API data into select options
                const categoryOptions = categoryResponse.data.result.map(
                  (item: any) => ({
                    label: item._id, // Show category name in the dropdown
                    value: item.name, // Use _id as the option's value
                  })
                );

                // Update the formField state with UOM, Brand, and Category options
                const updatedFormField = formField.map((obj: any) => {
                  if (obj.name === "uom") {
                    return { ...obj, options: uomOptions }; // Set UOM options
                  }
                  if (obj.name === "brand") {
                    return { ...obj, options: brandOptions }; // Set Brand options
                  }
                  if (obj.name === "productCategory") {
                    return { ...obj, options: categoryOptions }; // Set Product Category options
                  }
                  return obj;
                });

                setFormField(updatedFormField); // Set the updated form field with options
                console.log("UOM options:", uomOptions); // Debugging UOM
                console.log("Brand options:", brandOptions); // Debugging Brand
                console.log("Category options:", categoryOptions); // Debugging Category
              }
            }
          }
        } catch (error) {
          console.log("Error: ", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData(); // Trigger the data fetch process
      // eslint-disable-next-line
    }, []);


  const makeApiCall = async (updatedData: any) => {
    try {
      let url = "";
      if (data?._id) url = `${endpoints[formType].update}${data?._id}`;
      else url = `${endpoints[formType].create}`;
      console.log(url);
      setSubmitting(true);
      
      
    const updatedFormData = updateFormData(updatedData, " ", [], []);

    //    let updateFormData(formData: FormData, nestedFieldKey: string, nestedFields: string[], fieldsToRemove: string[]): FormData


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

export default ProductForm;
