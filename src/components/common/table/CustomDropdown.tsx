import React, { useState } from "react";

interface CustomDropdownProps {
  onChange: any;
  label?: string;
  options: any[];
  keyName: string;
  placeholder?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  keyName,
  options,
  onChange,
  label = "Status",
  placeholder = "Select an option...",
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    if (value) onChange({ [keyName]: value });
  };

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor="custom-dropdown" className="text-iconBlack font-medium">
          {label}:
        </label>
      )}
      <select
        id="custom-dropdown"
        name="custom-dropdown"
        value={selectedValue}
        onChange={handleChange}
        className="border w-28 px-1 text-base py-3 rounded-xl outline-none focus:ring-2 focus:ring-primary/50 text-iconBlack bg-whiteBg border-secondary transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <option value="">{placeholder}</option>
        {options.length > 0 ? (
          options.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))
        ) : (
          <option value="" disabled>
            No options available
          </option>
        )}
      </select>
    </div>
  );
};

export default CustomDropdown;
