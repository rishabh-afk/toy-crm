"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import { useAuth } from "@/context/AuthContext";
import Wrapper from "@/components/common/Wrapper";
import { getAccessPoints } from "@/hooks/general";
import TableComponent from "@/components/common/Table";

const columns = [
  { key: "_id", label: "Category ID" },
  { key: "name", label: "Category Name", sortable: true },
  { key: "hsnCode", label: "HSN Code", sortable: true },
  { key: "description", label: "Category Description" },
  { key: "createdAt", label: "Created Date", sortable: true, isDate: true },
  {
    key: "updatedAt",
    label: "Last Updated Date",
    sortable: true,
    isDate: true,
  },
  {
    key: "status",
    sortable: true,
    isMultiPurpose: true,
    label: "Status",
    multiPurposeProps: { type: "label" },
  },
];

const filterOptions = [
  { label: "Name", value: "name" },
  { label: "HSN Code", value: "hsnCode" },
];

const Contacts: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Category"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data.pagination;

  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Manage Products");

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Category"
          columns={columns}
          data={updatedData}
          filterOptions={filterOptions}
          pagination_data={paginationData}
          operationsAllowed={operationsAllowed}
        />
      </Wrapper>
    </AuthGuard>
  );
};

export default Contacts;
