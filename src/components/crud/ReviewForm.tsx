"use client";

import { toast } from "react-toastify";
import { endpoints } from "@/data/endpoints";
import { Fetch, Put } from "@/hooks/apiUtils";
import { FormEvent, ChangeEvent, useState } from "react";

interface ReviewFormProps {
  onClose?: any;
  formType: any;
  data?: ContactUsState;
  setFilteredData?: any;
}

interface ContactUsState {
  _id: string;
  review: string;
  rating: string;
  isActive: string;
  userName: string;
  therapistName: string;
}

const ReviewForm: React.FC<ReviewFormProps> = (props) => {
  const data = props.data;
  const [form, setForm] = useState({
    _id: data?._id ?? "",
    review: data?.review ?? "",
    rating: data?.rating ?? "",
    userName: data?.userName ?? "",
    isActive: data?.isActive ?? "false",
    therapistName: data?.therapistName ?? "",
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
      const url = currentEndpoint.update;

      const resp: any = await Put(`${url}${form?._id}`, form, 5000);

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
      <div className="flex flex-col gap-5">
        <div className="flex flex-col">
          <label
            htmlFor="therapistName"
            className="mb-2 font-semibold text-gray-700"
          >
            Name
          </label>
          {form?.therapistName}
        </div>
        <div className="flex flex-col">
          <label htmlFor="rating" className="mb-2 font-semibold text-gray-700">
            Rating
          </label>
          {form?.rating}
        </div>
        <div className="flex flex-col col-span-3">
          <label htmlFor="review" className="mb-2 font-semibold text-gray-700">
            review
          </label>
          {form?.review}
        </div>
      </div>

      <div className="flex flex-col mt-5">
        <label htmlFor="isActive" className="mb-2 font-semibold text-gray-700">
          Is Active
        </label>
        <select
          id="isActive"
          name="isActive"
          value={form.isActive}
          onChange={handleChange}
          className="p-2 border border-gray-300 rounded-lg outline-none"
        >
          <option value={"true"}>Active</option>
          <option value={"false"}>Inactive</option>
        </select>
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

export default ReviewForm;
