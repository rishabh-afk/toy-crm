"use client";

import { toast } from "react-toastify";
import { endpoints } from "@/data/endpoints";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import { FormEvent, ChangeEvent, useState } from "react";

interface MetaDataFormProps {
  onClose?: any;
  formType: any;
  data?: BlogState;
  setFilteredData?: any;
}

interface BlogState {
  _id: string;
  slug: string;
  title: string;
  keyword: string;
  noIndex: string;
  descriptions: string;
}

const MetaDataForm: React.FC<MetaDataFormProps> = (props) => {
  const data = props.data;
  const [form, setForm] = useState({
    _id: data?._id ?? "",
    slug: data?.slug ?? "",
    title: data?.title ?? "",
    keyword: data?.keyword ?? "",
    noIndex: data?.noIndex ?? "false",
    descriptions: data?.descriptions ?? "",
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

      const resp: any = form?._id
        ? await Put(`${url}${form?._id}`, form, 5000)
        : await Post(url, form, 5000);

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
            value={form.title}
            onChange={handleChange}
            className="p-2 border border-gray-300 !autofill:bg-transparent rounded-lg outline-none"
          />
        </div>
        <div className="flex flex-col col-span-2">
          <label htmlFor="slug" className="mb-2 font-semibold text-gray-700">
            Define Page Slug
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            className="p-2 border border-gray-300 !autofill:bg-transparent rounded-lg outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="noIndex" className="mb-2 font-semibold text-gray-700">
            Is this page No Index?
          </label>
          <input
            type="text"
            id="noIndex"
            name="noIndex"
            value={form.noIndex}
            onChange={handleChange}
            className="p-2 border border-gray-300 !autofill:bg-transparent rounded-lg outline-none"
          />
        </div>
        <div className="flex flex-col col-span-3">
          <label htmlFor="keyword" className="mb-2 font-semibold text-gray-700">
            Keyword
          </label>
          <input
            type="text"
            id="keyword"
            name="keyword"
            value={form.keyword}
            onChange={handleChange}
            className="p-2 border border-gray-300 !autofill:bg-transparent rounded-lg outline-none"
          />
        </div>
        <div className="flex flex-col col-span-3">
          <label
            htmlFor="descriptions"
            className="mb-2 font-semibold text-gray-700"
          >
            Description
          </label>
          <input
            type="text"
            id="descriptions"
            name="descriptions"
            value={form.descriptions}
            onChange={handleChange}
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

export default MetaDataForm;
