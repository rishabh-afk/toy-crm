"use client";

import { toast } from "react-toastify";
import { endpoints } from "@/data/endpoints";
import ImageUpload from "../common/ImageUpload";
import ToggleButton from "../common/ToggleButton";
import { Fetch, Post, Put } from "@/hooks/apiUtils";
import { useState, FormEvent, ChangeEvent } from "react";

interface DealerFormProps {
  data?: any;
  onClose?: any;
  formType: any;
  setPaginate?: any;
  setFilteredData?: any;
}

const UserForm: React.FC<DealerFormProps> = (props: any) => {
  const data = props.data;
  const formType = props.formType;

  const [form, setForm] = useState({
    password: "",
    _id: data?._id ?? "",
    name: data?.name ?? "",
    email: data?.email ?? "",
    mobile: data?.mobile ?? "",
    role: data?.role ?? "admin",
    avatarUrl: data?.avatarUrl ?? "",
    isActive: data?.isActive ?? true,
    permissions: data?.permissions ?? [],
    isEmailVerified: data?.isEmailVerified ?? true,
    isMobileVerified: data?.isMobileVerified ?? true,
  });
  const permissionsList = [
    "Dashboard",
    "Admin",
    "Blogs",
    "ContactUs",
    "Lead",
    "Reviews",
    "SEO",
    "Transaction",
  ];
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleTogglePermission = (permission: string) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter((p: any) => p !== permission)
        : [...prev.permissions, permission],
    }));
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
        if (response?.success) {
          props.setFilteredData(response?.data?.result);
          props.setPaginate(response?.data?.pagination);
        } else window.location.reload();
      } else toast.error("Failed to update user");
    } catch (error) {
      console.error("Failed to update user", error);
    } finally {
      props.onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 font-semibold text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
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
            maxLength={10}
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
            <option value="admin">Admin</option>
          </select>
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

        <div className="flex flex-col col-span-2">
          <label
            htmlFor="avatarUrl"
            className="mb-2 font-semibold text-gray-700"
          >
            Profile Image
          </label>
          <ImageUpload
            setState={setForm}
            fieldname="avatarUrl"
            data={form.avatarUrl}
          />
        </div>
        {form.role === "admin" && (
          <div className="flex flex-col col-span-2">
            <label className="mb-2 font-semibold text-gray-700">
              Permissions Allowed
            </label>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {permissionsList.map((permission) => {
                return (
                  <div
                    key={permission}
                    className="flex justify-start items-center space-x-4"
                  >
                    <input
                      type="checkbox"
                      id={permission}
                      className="min-w-6 min-h-6"
                      checked={form.permissions.includes(permission)}
                      onChange={() => handleTogglePermission(permission)}
                    />
                    <label htmlFor={permission}>Manage {permission}</label>
                  </div>
                );
              })}
            </div>
          </div>
        )}
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

export default UserForm;
