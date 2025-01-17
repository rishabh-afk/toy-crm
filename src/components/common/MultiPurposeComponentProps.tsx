import React from "react";

interface MultiPurposeComponentProps {
  type: "label" | "button" | "select";
  text: string;
  onClick?: () => void; // Click handler for button
  options?: string[]; // Options for select dropdown
  onSelectChange?: (value: string) => void; // Handler for select change
}

const colorMapping: Record<string, string> = {
  New: "bg-blue-500",
  Sent: "bg-blue-400",
  Draft: "bg-gray-500",
  Unpaid: "bg-red-500",
  Paid: "bg-green-500",
  Failed: "bg-red-500",
  Default: "bg-gray-500",
  Rejected: "bg-red-500",
  Refunded: "bg-blue-500",
  Cancelled: "bg-red-500",
  Accepted: "bg-green-500",
  Pending: "bg-yellow-500",
  Approved: "bg-green-500",
  Overdue: "bg-purple-500",
  InProgress: "bg-teal-500",
  Converted: "bg-green-500",
  Completed: "bg-green-500",
};

const MultiPurposeComponent: React.FC<MultiPurposeComponentProps> = ({
  type,
  text,
  onClick,
  options = [],
  onSelectChange,
}) => {
  const commonStyles = `px-4 py-2 rounded-lg text-white`;
  switch (type) {
    case "label":
      return (
        <span
          className={`${commonStyles} ${
            colorMapping[text] || colorMapping["Default"]
          }`}
        >
          {text}
        </span>
      );

    case "button":
      return (
        <button
          className={`${commonStyles} ${
            colorMapping[text] || colorMapping["Default"]
          } cursor-pointer hover:opacity-90`}
          onClick={onClick}
        >
          {text}
        </button>
      );

    case "select":
      return (
        <select
          className={`${commonStyles} ${
            colorMapping[text] || colorMapping["Default"]
          } text-black`}
          onChange={(e) => onSelectChange && onSelectChange(e.target.value)}
        >
          <option value="" disabled>
            {text}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      );

    default:
      return null;
  }
};

export default MultiPurposeComponent;
