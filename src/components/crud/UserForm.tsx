"use client";

import { toast } from "react-toastify";
import { countries } from "@/data/data";
import { endpoints } from "@/data/endpoints";
import ToggleButton from "../common/ToggleButton";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import { useState, FormEvent, ChangeEvent } from "react";

const UserDataForm = (props: any) => {
  const data = props.data;
  const formType = props.formType;
  const setFilteredData = props.setFilteredData;

  const [form, setForm] = useState({
    password: "",
    _id: data?._id ?? "",
    mobile: data?.mobile ?? "",
    role: data?.role ?? "user",
    email: data?.email ?? "",
    gender: data?.gender ?? "male",
    city: data?.city ?? "",
    state: data?.state ?? "",
    country: data?.country ?? "India",
    lastName: data?.lastName ?? "",
    isActive: data?.isActive ?? true,
    firstName: data?.firstName ?? "",
    profileImage: data?.profileImage ?? "",
    dateOfBirth: (data?.dateOfBirth && data?.dateOfBirth.slice(0, 10)) ?? "",
  });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    if (!form._id) delete form._id;
    Object.entries(form).forEach(([key, value]) => {
      if (Array.isArray(value))
        value.forEach((item) => {
          formData.append(`${key}[]`, item);
        });
      else formData.append(key, value as any);
    });

    try {
      const currentEndpoint = endpoints[formType];
      const url = form?._id ? currentEndpoint.update : currentEndpoint.create;

      const resp: any = form?._id
        ? await Put(`${url}${form?._id}`, formData)
        : await Post(url, formData);

      if (resp.success) {
        const response: any = await Fetch(currentEndpoint.fetchAll);
        if (response?.success) setFilteredData(response?.data?.result);
        else window.location.reload();
      } else toast.error("Failed to update user");
    } catch (error) {
      console.error("Failed to update user", error);
    } finally {
      props.onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="flex flex-col">
          <label
            htmlFor="firstName"
            className="mb-2 font-semibold text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="lastName"
            className="mb-2 font-semibold text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 font-semibold text-gray-700">
            Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="mobile" className="mb-2 font-semibold text-gray-700">
            Mobile Number
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            maxLength={20}
            value={form.mobile}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="mb-2 font-semibold text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="dateOfBirth"
            className="mb-2 font-semibold text-gray-700"
          >
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="gender" className="mb-2 font-semibold text-gray-700">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg outline-none"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="role" className="mb-2 font-semibold text-gray-700">
            Role
          </label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg outline-none"
          >
            <option value="user">User</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="country" className="mb-2 font-semibold text-gray-700">
            Country*
          </label>
          <select
            required
            id="country"
            name="country"
            value={form.country}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg outline-none"
          >
            <option value="">Select Country</option>
            {countries.map((country: any, index: number) => {
              const value = country.name.toLowerCase();
              return (
                <option key={index} value={value}>
                  {country?.name}
                </option>
              );
            })}
          </select>
        </div>
        {/* <div className="flex flex-col">
          <label htmlFor="state" className="mb-2 font-semibold text-gray-700">
            State*
          </label>
          <select
            required
            id="state"
            name="state"
            value={form.state}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-lg outline-none"
          >
            <option value="">Select State</option>
            {states.map((state: any) => {
              return (
                <option key={state.id} value={state.name}>
                  {state.name}
                </option>
              );
            })}
          </select>
        </div> */}
        <div className="flex flex-col">
          <label htmlFor="state" className="mb-2 font-semibold text-gray-700">
            State*
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={form?.state}
            onChange={handleChange}
            placeholder="Enter your state"
            className="p-2 border border-gray-300 !autofill:bg-transparent rounded-lg outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="city" className="mb-2 font-semibold text-gray-700">
            City*
          </label>
          <input
            type="text"
            id="city"
            name="city"
            required
            value={form?.city}
            onChange={handleChange}
            placeholder="Enter your city"
            className="p-2 border border-gray-300 !autofill:bg-transparent rounded-lg outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="isActive"
            className="mb-2 font-semibold text-gray-700"
          >
            Is Active
          </label>
          <ToggleButton setState={setForm} data={form.isActive} />
        </div>
      </div>

      <div className="flex justify-start mt-3 items-center space-x-2">
        <button
          type="submit"
          className="md:col-span-2 mt-2 py-1 bg-primary hover:bg-primary/70 transition-all duration-200 ease-linear text-white rounded-md text-lg w-fit px-3"
        >
          {form.mobile ? "Update" : "Save"}
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

export default UserDataForm;
