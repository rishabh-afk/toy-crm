"use client";

import Image from "next/image";
import { useState } from "react";
import { steps } from "./formtype";
import { toast } from "react-toastify";
import { endpoints } from "@/data/endpoints";
import ToggleButton from "../common/ToggleButton";
import { Fetch, Post, Put } from "@/hooks/apiUtils";

interface PropertiesFormProps {
  data?: any;
  onClose?: any;
  formType: any;
  setFilteredData?: any;
}

const PropertiesForm: React.FC<PropertiesFormProps> = (props) => {
  const data = props.data;
  const loading = false;
  const [disable, setDisable] = useState(false);
  const [errorField, setErrorField] = useState<any>("");
  const updatedFields = steps;
  const updatedData = {
    ...data,
    _id: data?._id,
    images: data?.images,
    city: data?.address?.city,
    state: data?.address?.state,
    ownerName: data?.owner?.name,
    ownerEmail: data?.owner?.email,
    pinCode: data?.address?.pinCode,
    country: data?.address?.country,
    ownerMobile: data?.owner?.mobile,
    area: data?.specifications?.area,
    floors: data?.specifications?.floors,
    fullAddress: data?.address?.fullAddress,
    landArea: data?.specifications?.landArea,
    bedrooms: data?.specifications?.bedrooms,
    bathrooms: data?.specifications?.bathrooms,
    yearBuilt: data?.specifications?.yearBuilt,
  };
  const [form, setForm] = useState<any>(updatedData);

  const [previews, setPreviews] = useState<{ [key: string]: string }>({
    images: updatedData?.profileImage && `${updatedData?.images}`,
  });

  const handleRemoveImage = (name: string) => {
    const updatedForm = { ...form };
    const updatedPreviews = { ...previews };

    delete updatedForm[name];
    delete updatedPreviews[name];

    setForm(updatedForm);
    setPreviews(updatedPreviews);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, files, multiple, options }: any = e.target;
    if (e.target.type === "file" && files?.length) {
      const file = files[0];
      const maxSizeInBytes = 1024 * 1024;
      if (file.size > maxSizeInBytes)
        return toast.warn(
          `File size exceeds 1 MB. Please select a smaller file and try again.`
        );

      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!validTypes.includes(file.type))
        return toast.warn(
          `Invalid file type. Please select a PNG, JPG, or JPEG image.`
        );

      setForm({ ...form, [name]: file });

      // Generate a preview URL for the image
      const previewUrl = URL.createObjectURL(file);
      setPreviews({ ...previews, [name]: previewUrl });
    } else if (multiple) {
      const selectedOptions = Array.from(options)
        .filter((option: any) => option.selected)
        .map((option: any) => option.value);

      setForm({ ...form, [name]: selectedOptions });
    } else setForm({ ...form, [name]: value });
  };

  // Validation function to check if all fields are filled
  const validateForm = () => {
    for (const step of updatedFields) {
      for (const field of step.fields) {
        if (form[field.name] === undefined || form[field.name] === "") {
          setErrorField(field.name);
          toast.error(`Please fill in the ${field.label} field.`);
          return false;
        }
      }
    }
    return true;
  };

  function appendForm(
    form: FormData,
    data: any,
    parentKey: string | null = null
  ) {
    if (
      data &&
      typeof data === "object" &&
      !Array.isArray(data) &&
      !(data instanceof File)
    ) {
      Object.entries(data).forEach(([key, value]) => {
        const formKey = parentKey ? `${parentKey}[${key}]` : key;
        appendForm(form, value, formKey);
      });
    } else if (Array.isArray(data)) {
      data.forEach((item, index) => {
        const makeKey =
          parentKey?.includes("[0]") && parentKey?.replace("[0]", "");
        const formKey = parentKey?.includes("[0]")
          ? `${makeKey}[${index}]`
          : parentKey
          ? `${parentKey}[${index}]`
          : `${index}`;
        appendForm(form, item, formKey);
      });
    } else {
      form.append(parentKey as string, data !== null ? data : "");
    }
    return form;
  }

  const handleSubmit = async () => {
    if (form?.isActive && !validateForm()) return;
    try {
      setDisable(true);

      const formattedData = form;
      let formData = new FormData();
      formData = appendForm(formData, {
        ...formattedData,
        _id: form?._id,
      });

      const currentEndpoint = endpoints[props.formType];
      const url = form?._id ? currentEndpoint.update : currentEndpoint.create;

      const resp: any = form?._id
        ? await Put(`${url}${form?._id}`, formData, 5000)
        : await Post(url, formData, 5000);

      if (resp.success) {
        const response: any = await Fetch(currentEndpoint.fetchAll);
        if (response?.success) props.setFilteredData(response?.data?.result);
        else window.location.reload(); // TODO: this should be done in future
      } else return toast.error("Failed to update therapist");
    } catch (error: any) {
      console.log("Failed to update blog", error);
    } finally {
      setDisable(false);
      props.onClose();
    }
  };

  if (loading)
    return (
      <div className="flex justify-start text-primary text-2xl">
        Please wait...
      </div>
    );

  return (
    <>
      <div className="relative px-5 w-full overflow-hidden">
        <div
          className={`w-full h-full transition-transform duration-500 ease-in-out transform`}
        >
          <div>
            {updatedFields.map((step: any, index: any) => {
              return (
                <div key={index}>
                  <h2 className="mb-5 relative text-2xl md:text-3xl font-castoro font-semibold mt-8">
                    {step?.title}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary transform origin-left transition-transform scale-x-100 group-hover:scale-x-100"></span>
                  </h2>
                  <div className="grid md:grid-cols-3 gap-2 md:gap-5">
                    {step.fields.map((field: any, index: any) => (
                      <div
                        key={index}
                        className={`w-full ${
                          field?.name === errorField ? "" : "mb-2"
                        }`}
                      >
                        <label
                          htmlFor={field.name}
                          className="block text-sm font-bold text-gray-700"
                        >
                          {field.label}
                        </label>
                        {field.type === "text" || field.type === "email" ? (
                          <input
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            onChange={handleChange}
                            maxLength={field?.maxLength}
                            placeholder={field?.placeholder}
                            value={form[field.name] || ""}
                            className="mt-1 block w-full px-3 py-2 border text-gray-500 font-medium border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none focus:ring-primary/50 focus:border-primary sm:text-sm"
                          />
                        ) : field.type === "date" ? (
                          <input
                            type="date"
                            id={field.name}
                            name={field.name}
                            onChange={handleChange}
                            value={form[field.name] || ""}
                            max={new Date().toISOString().split("T")[0]}
                            className="mt-1 block w-full px-3 py-2 border text-gray-500 font-medium border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none focus:ring-primary/50 focus:border-primary sm:text-sm"
                          />
                        ) : field.type === "select" ? (
                          <select
                            id={field.name}
                            name={field.name}
                            onChange={handleChange}
                            multiple={field?.multiple}
                            value={form[field.name] || ""}
                            className="mt-1 block w-full px-2 py-2 border text-gray-400 font-semibold border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none focus:ring-primary/50 focus:border-primary sm:text-sm"
                          >
                            <option value="" disabled>
                              Select {field.label}
                            </option>
                            {field.options?.map((option: any, idx: any) => (
                              <option
                                key={idx}
                                value={
                                  option?._id
                                    ? option?._id
                                    : option?.id
                                    ? option.name
                                    : option
                                }
                              >
                                {option?._id || option?.id
                                  ? option?.name
                                  : option}
                              </option>
                            ))}
                          </select>
                        ) : field.type === "textarea" ? (
                          <textarea
                            id={field.name}
                            name={field.name}
                            value={form[field.name] || ""}
                            onChange={handleChange}
                            className="mt-1 block h-full col-span-2 w-full px-3 py-2 border border-gray-300 text-gray-400 font-semibold focus:ring-2 rounded-md shadow-sm focus:outline-none focus:ring-primary/50 focus:border-primary sm:text-sm"
                          />
                        ) : field.type === "file" ? (
                          <div className="pr-3">
                            {!previews[field.name] ? (
                              <input
                                type="file"
                                id={field.name}
                                name={field.name}
                                onChange={handleChange}
                                accept={field.accept}
                                multiple={field.multiple}
                                className="mt-1 block w-full px-3 py-2 border text-gray-500 font-medium border-gray-300 rounded-md shadow-sm focus:ring-2 focus:outline-none focus:ring-primary/50 focus:border-primary sm:text-sm"
                              />
                            ) : (
                              <div className="relative mt-2">
                                <Image
                                  src={`${previews[field.name]}`}
                                  alt={`${field.label} Preview`}
                                  width={100}
                                  height={100}
                                  priority
                                  unoptimized
                                  className="w-full h-fit border-2 border-primary object-contain rounded-lg shadow-sm"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(field.name)}
                                  className="absolute w-6 h-6 aspect-square rounded-full -top-[10px] -right-[10px] flex justify-center items-center text-xs bg-red-500 text-white"
                                >
                                  ✕
                                </button>
                              </div>
                            )}
                          </div>
                        ) : null}
                        {field?.name === errorField && (
                          <span className="text-red-500 text-xs font-bold">
                            This field is required*
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            <div className="flex flex-col col-span-3 mt-5">
              <label
                htmlFor="isActive"
                className="mb-2 font-semibold text-gray-700"
              >
                Do you want to activate this property?
              </label>
              <ToggleButton setState={setForm} data={form.isActive} />
            </div>
            <div className="flex justify-end mt-3 items-center space-x-2">
              <button
                type="button"
                disabled={disable}
                onClick={handleSubmit}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertiesForm;
