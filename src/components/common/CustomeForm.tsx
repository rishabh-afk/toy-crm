import { useState } from "react";
import ProductForm from "./ProductForm";
import { FormField } from "@/hooks/types";

interface CustomFormProps {
  onClose: any;
  formData?: any;
  makeApiCall?: any;
  setFormData?: any;
  submitting: boolean;
  fields?: FormField[];
  returnAs?: "object" | "formData";
}

const CustomForm: React.FC<CustomFormProps> = ({
  fields,
  onClose,
  returnAs,
  formData,
  submitting,
  setFormData,
  makeApiCall,
}) => {
  const [form, setForm] = useState<any>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prevForm: any) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <div className="grid grid-cols-2 gap-4">
        {fields?.map((field) => (
          <div key={field.name} className="flex flex-col">
            <label className="mb-2">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              value={form[field.name] || ""}
              onChange={handleChange}
              className="p-2 border rounded"
            />
          </div>
        ))}
      </div>
      <h3 className="text-xl font-bold mt-4 mb-2">Product Details</h3>
      <ProductForm />
      <h3 className="text-xl font-bold mt-4 mb-2">Total Details</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="mb-2">Subtotal</label>
          <input
            type="number"
            name="subtotal"
            value={form.subtotal || ""}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2">Discount</label>
          <input
            type="number"
            name="totalDiscount"
            value={form.totalDiscount || ""}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2">GST</label>
          <input
            type="number"
            name="totalGST"
            value={form.totalGST || ""}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2">Total Amount</label>
          <input
            type="number"
            name="totalAmount"
            value={form.totalAmount || ""}
            onChange={handleChange}
            className="p-2 border rounded"
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default CustomForm;
