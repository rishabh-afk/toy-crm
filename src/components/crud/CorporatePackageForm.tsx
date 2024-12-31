"use client";

import { toast } from "react-toastify";
import { endpoints } from "@/data/endpoints";
import ToggleButton from "../common/ToggleButton";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import { FormEvent, ChangeEvent, useState, useEffect } from "react";

interface CorporatePackageProps {
  onClose?: any;
  formType: any;
  data?: BlogState;
  setFilteredData?: any;
}

interface BlogState {
  _id: string;
  price: string;
  currency: string;
  isActive: boolean;
  TotalSession: string;
  organizationId: string;
  specializationId: string;
}

const CorporatePackageForm: React.FC<CorporatePackageProps> = (props) => {
  const data = props.data;
  const [categories, setCategories] = useState([]);
  const [organization, setOrganizations] = useState([]);
  const [form, setForm] = useState<any>({
    _id: data?._id ?? "",
    price: data?.price ?? "",
    currency: data?.currency ?? "",
    isActive: data?.isActive ?? true,
    TotalSession: data?.TotalSession ?? "",
    organizationId: data?.organizationId ?? "",
    specializationId: data?.specializationId ?? "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const resp: any = await Fetch("public/specialization/all");
      if (resp.success) return setCategories(resp?.data?.result);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchOrganisation = async () => {
      const resp: any = await Fetch("public/get-organization-list");
      if (resp.success) return setOrganizations(resp?.data.list);
    };
    fetchOrganisation();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setForm((prev: any) => ({ ...prev, [name]: checked }));
    } else setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const currentEndpoint = endpoints[props.formType];
      const url = form?._id ? currentEndpoint.update : currentEndpoint.create;

      if (!form._id) delete form._id;

      const resp: any = form?._id
        ? await Put(`${url}${form?._id}`, form, 5000)
        : await Post(url, form, 5000);

      if (resp.success) {
        const response: any = await Fetch(currentEndpoint.fetchAll);
        if (response?.success) props.setFilteredData(response?.data?.result);
        else window.location.reload();
      } else return toast.error("Failed to update");
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
      console.log("Failed to update blog", error);
    } finally {
      props.onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="flex flex-col">
          <label
            htmlFor="organizationId"
            className="mb-2 font-semibold text-gray-700"
          >
            Company
          </label>
          <select
            id="organizationId"
            name="organizationId"
            value={form.organizationId}
            onChange={handleChange}
            disabled={data?.organizationId ? true : false}
            className="p-2 border border-gray-300 rounded-lg outline-none"
          >
            <option value="">Select Company</option>
            {organization &&
              organization.map((cat: { _id: string; name: string }) => {
                return (
                  <option key={cat?._id} value={cat?._id}>
                    {cat?.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="category"
            className="mb-2 font-semibold text-gray-700"
          >
            Category
          </label>
          <select
            id="specializationId"
            name="specializationId"
            value={form.specializationId}
            onChange={handleChange}
            disabled={data?.specializationId ? true : false}
            className="p-2 border border-gray-300 rounded-lg outline-none"
          >
            <option value="">Select Category</option>
            {categories &&
              categories.map((cat: { _id: string; name: string }) => {
                return (
                  <option key={cat?._id} value={cat?._id}>
                    {cat?.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="category"
            className="mb-2 font-semibold text-gray-700"
          >
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            value={form.currency}
            onChange={handleChange}
            disabled={data?.currency ? true : false}
            className="p-2 border border-gray-300 rounded-lg outline-none"
          >
            <option value="">Select Currency</option>
            <option value="INR">INR</option>
            <option value="USD">USD</option>
          </select>
        </div>
        <div className="flex flex-col col-span-1">
          <label
            htmlFor="TotalSession"
            className="mb-2 font-semibold text-gray-700"
          >
            Total Sessions
          </label>
          <input
            type="text"
            id="TotalSession"
            name="TotalSession"
            onChange={handleChange}
            value={form.TotalSession}
            className="p-2 border border-gray-300 !autofill:bg-transparent rounded-lg outline-none"
          />
        </div>
        <div className="flex flex-col col-span-1">
          <label htmlFor="price" className="mb-2 font-semibold text-gray-700">
            Price (Just to remember)
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="p-2 border border-gray-300 !autofill:bg-transparent rounded-lg outline-none"
          />
        </div>
        <div className="flex flex-col col-span-1">
          <label
            htmlFor="isActive"
            className="mb-2 font-semibold text-gray-700"
          >
            Do you want to activate this Package?
          </label>
          <ToggleButton setState={setForm} data={form.isActive} />
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

export default CorporatePackageForm;
