import React from "react";
import ItemsPage from "./ItemsPage";
import DateFilter from "./DateFilter";
import SearchFilter from "./SearchFilter";
import { FilterOption } from "@/hooks/types";
import CustomDropdown from "./CustomDropdown";

interface FiltersProps {
  endDate: string;
  startDate: string;
  handleSearch: any;
  searchTerm: string;
  customOptions?: any;
  hideDateFilter?: boolean;
  filterOptions: FilterOption[];
  paginate: { itemsPerPage: number };
  setEndDate: (value: string) => void;
  setStartDate: (value: string) => void;
  setSearchTerm: (value: string) => void;
  fetchFilteredData: (params?: Record<string, any>) => void;
}

const Filters: React.FC<FiltersProps> = ({
  endDate,
  paginate,
  searchTerm,
  startDate,
  setEndDate,
  setStartDate,
  setSearchTerm,
  handleSearch,
  customOptions,
  filterOptions,
  hideDateFilter,
  fetchFilteredData,
}) => {
  return (
    <>
      <div className="flex gap-5 bg-whiteBg p-5 rounded-2xl justify-between items-end mb-4">
        {/* Search Filter */}
        <SearchFilter
          searchTerm={searchTerm}
          handleSearch={handleSearch}
          setSearchTerm={setSearchTerm}
          filterOptions={filterOptions}
        />

        {/* Pagination Filter */}
        <ItemsPage fetchFilteredData={fetchFilteredData} paginate={paginate} />

        {/* Date Range Filter */}
        {!hideDateFilter && (
          <DateFilter
            endDate={endDate}
            startDate={startDate}
            setEndDate={setEndDate}
            setStartDate={setStartDate}
            fetchFilteredData={fetchFilteredData}
          />
        )}
        {customOptions?.options?.length > 0 && (
          <CustomDropdown
            onChange={fetchFilteredData}
            label={customOptions?.label}
            keyName={customOptions?.keyName}
            options={customOptions?.options}
            placeholder={customOptions?.placeholder}
          />
        )}
      </div>
    </>
  );
};

export default Filters;
