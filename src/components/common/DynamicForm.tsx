import Button from "./Button";
import Date from "../input/Date";
import Text from "../input/Text";
import Email from "../input/Email";
import Radio from "../input/Radio";
import Number from "../input/Number";
import Select from "../input/Select";
import React, { useState } from "react";
import Checkbox from "../input/Checkbox";
import Password from "../input/Password";
import TextArea from "../input/TextArea";
import { FormField } from "@/hooks/types";
import ToggleButton from "../input/Toggle";
import RichTextEditor from "./RichTextEditor";
import NumericStringInput from "../input/NumericString";
import SingleImageUploader from "../input/ImageUploader";
import SingleVideoUploader from "../input/VideoUploader";
import MultipleImageUpload from "../input/MultipleImageUploader";
import MultipleVideoUpload from "../input/MultipleVideoUploader";
import ProductForm from "./ProductForm";

interface DynamicFormProps {
  onClose: any;
  formData?: any;
  makeApiCall?: any;
  setFormData?: any;
  submitting: boolean;
  fields?: FormField[];
  returnAs?: "object" | "formData";
//  onQuotationDataChange :(data:any)=>void
}
interface Item {
  id: number;
  productCode: string;
  uom: string;
  quantity: number;
  listPrice: number;
  value: number;
  discount: number;
  discountAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  gstAmount: number;
  totalAmount: number;
  stockInHand: number;
}
interface ConsolidatedData {
  items: Item[];
  totals: {
    totalValue: number;
    totalDiscountAmount: number;
    totalGstAmount: number;
    totalAmount: number;
  };
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  onClose,
  returnAs,
  formData,
  submitting,
  setFormData,
  makeApiCall,
// onQuotationDataChange
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [productItems,] = useState<ConsolidatedData>(); // State for ProductForm items

  const handleProductDataChange = (data: ConsolidatedData) => {
    console.log(data)
    // onQuotationDataChange(data); // Pass data to QuotationForm
  };

  const handleInputChange = (e: any) => {
    const { name, type, value, checked, options, multiple, files } = e.target;
    if (multiple) {
      const selectedOptions = Array.from(options)
        .filter((option: any) => option.selected)
        .map((option: any) => option.value);
      setFormData((prev: any) => ({ ...prev, [name]: selectedOptions }));
    } else if (type === "file") {
      if (files) {
        const newFiles = Array.from(files);
        setFormData((prev: any) => ({
          ...prev,
          [name]: prev[name] ? [...prev[name], ...newFiles] : newFiles, // Append new files to existing files
        }));
      }
    } else
      setFormData((prev: any) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
  };
  const validateForm = () => {
    let valid = true;
    const newErrors: { [key: string]: string | null } = {};

    if (!fields) return;

    fields.forEach((field) => {
      const value = formData[field.name];
console.log(value)
      if (field.required && !value) {
        newErrors[field.name] = `${field.label} is required`;
        valid = false;
      }

      if (field.validation && value) {
        const error = field.validation(value);
        if (error) {
          newErrors[field.name] = error;
          valid = false;
        }
      }
    });
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const combinedFormData = { ...formData, productItems }; // Combine form data and items
      if (returnAs === "formData") {
        const data = new FormData();
        Object.keys(combinedFormData).forEach((key) => {
          const value = combinedFormData[key];
          if (value instanceof File || Array.isArray(value)) {
            if (Array.isArray(value))
              value.forEach((file) => data.append(key, file));
            else data.append(key, value);
          } else data.append(key, String(value));
        });
        makeApiCall(data);
      } else {
        makeApiCall(combinedFormData);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-5">
      {fields &&
        fields.length > 0 &&
        fields.map((field: FormField) => (
          <div
            key={field.name}
            className={`flex flex-col ${field?.widthFull && "col-span-3"} ${
              field?.type === "textarea" && "col-span-2"
            } ${field?.type === "password" && "col-span-2"}`}
          >
            {field.type === "br" && (
              <h2 className="text-2xl uppercase tracking-tighter my-3 py-2 bg-primary text-white font-bold text-center">
                {field?.label}
              </h2>
            )}

            {field.type === "select" && (
              <Select
                field={{ ...field, value: formData[field?.name] || "" }}
                handleInputChange={handleInputChange}
              />
            )}

            {field.type === "label" && (
              <div key={field.label}>
                <label
                  className="font-semibold text-gray-700"
                  htmlFor={field?.name}
                >
                  {field?.label}
                </label>
              </div>
            )}

            <div className="flex flex-col">
              {field.type === "label" && (
                <label className="block text-lg font-semibold text-gray-700 underline w-full mt-4">
                  {field.label}
                </label>
              )}
            </div>

            {field.type === "radio" && (
              <Radio field={field} handleInputChange={handleInputChange} />
            )}

            {field.type === "checkbox" && (
              <Checkbox field={field} handleInputChange={handleInputChange} />
            )}

            {field.type === "email" && (
              <Email
                field={{ ...field, value: formData[field?.name] || "" }}
                handleInputChange={handleInputChange}
              />
            )}

            {field.type === "text" && (
              <Text
                field={{ ...field, value: formData[field?.name] || "" }}
                handleInputChange={handleInputChange}
              />
            )}

            {field.type === "textarea" && (
              <TextArea
                field={{ ...field, value: formData[field?.name] || "" }}
                handleInputChange={handleInputChange}
              />
            )}

            {field.type === "choose" && (
              <ToggleButton
                field={{ ...field, value: formData[field?.name] || false }}
                setState={setFormData}
              />
            )}

            {field.type === "number" && (
              <Number
                field={{ ...field, value: formData[field?.name] || "" }}
                handleInputChange={handleInputChange}
              />
            )}
            {field.type === "button" && (
              <Button
                text={field.label}
                type="button"
                classes="bg-red-500 w-1/5 text-white rounded-xl hover:bg-red-700"
              />
            )}

            {field.type === "date" && (
              <Date
                field={{ ...field, value: formData[field?.name] || "" }}
                handleInputChange={handleInputChange}
              />
            )}

            {field.type === "stringNumeric" && (
              <NumericStringInput
                field={{ ...field, value: formData[field?.name] || "" }}
                handleInputChange={handleInputChange}
              />
            )}

            {field?.type === "richTextEditor" && (
              <RichTextEditor
                data={formData[field?.name] || ""}
                setData={setFormData}
              />
            )}
            {field.type === "password" && (
              <Password
                field={{ ...field, value: formData[field?.name] || "" }}
                handleInputChange={handleInputChange}
              />
            )}

            {field.type === "file" && !field.multiple && !field?.isVideo && (
              <SingleImageUploader
                field={{ ...field, value: formData[field?.name] || undefined }}
                setFormData={setFormData}
              />
            )}

            {field.type === "file" && field.multiple && !field?.isVideo && (
              <MultipleImageUpload
                setFormData={setFormData}
                field={{ ...field, value: formData[field?.name] }}
              />
            )}

            {field.type === "file" && !field.multiple && field?.isVideo && (
              <SingleVideoUploader field={field} setFormData={setFormData} />
            )}

            {field.type === "file" && field.multiple && field?.isVideo && (
              <MultipleVideoUpload field={field} setFormData={setFormData} />
            )}

            {errors[field.name] && (
              <span className="text-red-500 text-sm mt-1">
                {errors[field.name]}
              </span>
            )}

            {field.type === "productForm" && (
              <ProductForm key={field.name} onProductDataChange={handleProductDataChange} />
            )}
          </div>
        ))}

      <div className="col-span-3 flex justify-end space-x-2">
        <Button
          text="Submit"
          type="submit"
          isLoading={submitting}
          classes="bg-primary w-1/5 py-3 text-white text-xl rounded-xl"
        />
        <Button
          text="Cancel"
          type="button"
          onClick={onClose}
          classes="bg-red-500 w-1/5 py-3 text-white rounded-xl text-xl hover:bg-red-700"
        />
      </div>
    </form>
  );
};

export default DynamicForm;
