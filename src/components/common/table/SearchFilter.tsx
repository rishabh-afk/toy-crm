import React from "react";
import { debounce } from "chart.js/helpers";
import { BsFilterLeft } from "react-icons/bs";
import { FilterOption } from "@/hooks/types";

interface SearchFilterProps {
  searchTerm: string;
  filterOptions: FilterOption[];
  fetchFilteredData: () => void;
  setSearchTerm: (value: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  searchTerm,
  setSearchTerm,
  filterOptions,
  fetchFilteredData,
}) => {
  const [selectedOption, setSelectedOption] = React.useState("");
  return (
    <div>
      <p className="flex text-black font-medium gap-2 items-center pb-1">
        <BsFilterLeft size={25} /> Filters
      </p>
      <div className="flex">
        {filterOptions.length > 0 && (
          <select
            className="rounded-l-xl border border-r-0 outline-none focus:outline-none border-gray-200 p-2"
            value={selectedOption}
            onChange={(e) => {
              setSearchTerm("");
              setSelectedOption(e.target.value);
            }}
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
        <input
          type="text"
          value={searchTerm}
          placeholder="Search here..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`${
            filterOptions.length > 0
              ? "border border-l-0 rounded-xl rounded-l-none focus:ring-0"
              : "border rounded-xl focus:ring-2 focus:ring-primary/50"
          } px-4 text-lg py-2 placeholder:text-black outline-none text-black border-gray-200 w-full`}
        />
        <button
          type="button"
          className="border px-4 ml-2 text-lg py-2 rounded-xl text-black border-gray-200 bg-white hover:bg-primary hover:text-white"
          onClick={debounce(() => fetchFilteredData(), 500)}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchFilter;
