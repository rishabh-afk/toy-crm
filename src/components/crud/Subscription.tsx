"use client";

import { toast } from "react-toastify";
import { endpoints } from "@/data/endpoints";
import ToggleButton from "../common/ToggleButton";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import { FormEvent, ChangeEvent, useState } from "react";

interface SubscriptionFormProps {
  onClose?: any;
  formType: any;
  data?: SubscriptionState;
  setFilteredData?: any;
}

interface SubscriptionState {
  _id: string;
  name: string;
  title: string;
  isActive: boolean;
  priceYearly: string;
  description: string;
  priceMonthly: string;
  maxProperties: number;
  priceQuarterly: string;
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = (props) => {
  const data: any = props.data;
  const [form, setForm] = useState({
    _id: data?._id ?? "",
    name: data?.name ?? "",
    title: data?.title ?? "",
    isActive: data?.isActive ?? true,
    description: data?.description ?? "",
    priceYearly: data?.price?.Yearly ?? 0,
    priceMonthly: data?.price?.Monthly ?? 0,
    maxProperties: data?.maxProperties ?? 0,
    priceQuarterly: data?.price?.Quarterly ?? 0,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const currentEndpoint = endpoints[props.formType];
      const url = form?._id ? currentEndpoint.update : currentEndpoint.create;

      const updatedForm = {
        ...form,
        price: {
          Yearly: form?.priceYearly,
          Monthly: form?.priceMonthly,
          Quarterly: form?.priceQuarterly,
        },
      };

      delete updatedForm?._id;
      delete updatedForm?.priceYearly;
      delete updatedForm?.priceMonthly;
      delete updatedForm?.priceQuarterly;

      const resp: any = form?._id
        ? await Put(`${url}${form?._id}`, updatedForm, 5000)
        : await Post(url, updatedForm, 5000);

      if (resp.success) {
        const response: any = await Fetch(currentEndpoint.fetchAll);
        if (response?.success) props.setFilteredData(response?.data?.result);
        else window.location.reload(); // TODO: this should be done in future
      } else return toast.error("Failed to update blog");
    } catch (error: any) {
      console.log("Failed to update blog", error);
    } finally {
      props.onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="flex flex-col col-span-3">
          <label htmlFor="title" className="mb-2 font-semibold text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            value={form.title}
            onChange={handleChange}
            className="p-2 border border-gray-300 !autofill:bg-transparent rounded-lg outline-none"
          />
        </div>
        <div className="flex flex-col col-span-3">
          <label htmlFor="name" className="mb-2 font-semibold text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            className="p-2 border border-gray-300 !autofill:bg-transparent rounded-lg outline-none"
          />
        </div>
        <div className="flex flex-col col-span-2">
          <label
            htmlFor="maxProperties"
            className="mb-2 font-semibold text-gray-700"
          >
            Maximum Property (Allowed to list)
          </label>
          <input
            type="text"
            id="maxProperties"
            name="maxProperties"
            required
            value={form.maxProperties}
            onChange={handleChange}
            className="p-2 border border-gray-300 !autofill:bg-transparent rounded-lg outline-none"
          />
        </div>

        <div className="flex flex-col col-span-1">
          <label
            htmlFor="isActive"
            className="mb-2 font-semibold text-gray-700"
          >
            Do you want to activate this Subscription Plan?
          </label>
          <ToggleButton setState={setForm} data={form.isActive} />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="priceMonthly"
            className="mb-2 font-semibold text-gray-700"
          >
            Price (Monthly)
          </label>
          <input
            type="text"
            id="priceMonthly"
            name="priceMonthly"
            required
            value={form.priceMonthly}
            onChange={handleChange}
            className="p-2 border border-gray-300 !autofill:bg-transparent rounded-lg outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="priceQuarterly"
            className="mb-2 font-semibold text-gray-700"
          >
            Price (Quarterly)
          </label>
          <input
            type="text"
            id="priceQuarterly"
            name="priceQuarterly"
            required
            value={form.priceQuarterly}
            onChange={handleChange}
            className="p-2 border border-gray-300 !autofill:bg-transparent rounded-lg outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="priceYearly"
            className="mb-2 font-semibold text-gray-700"
          >
            Price (Yearly)
          </label>
          <input
            type="text"
            id="priceYearly"
            name="priceYearly"
            required
            value={form.priceYearly}
            onChange={handleChange}
            className="p-2 border border-gray-300 !autofill:bg-transparent rounded-lg outline-none"
          />
        </div>
        <div className="flex flex-col col-span-3">
          <label
            htmlFor="description"
            className="mb-2 font-semibold text-gray-700"
          >
            Description
          </label>
          <input
            type="text"
            required
            id="description"
            name="description"
            onChange={handleChange}
            value={form.description}
            className="p-2 border border-gray-300 !autofill:bg-transparent rounded-lg outline-none"
          />
        </div>
      </div>
      <div className="flex justify-start mt-3 items-center space-x-2">
        <button
          type="submit"
          className="md:col-span-2 mt-2 py-1 bg-primary hover:bg-primary/70 transition-all duration-200 ease-linear text-white rounded-md text-lg w-fit px-3"
        >
          {form._id ? "Update" : "Save"}
          <sup>+</sup>
        </button>
        <button
          type="button"
          onClick={props.onClose}
          className="md:col-span-2 mt-2 py-1 bg-red-600 transition-all duration-200 ease-linear text-white rounded-md text-lg w-fit px-3"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default SubscriptionForm;
