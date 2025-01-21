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
  { key: "_id", label: "Warehouse ID" },
  { key: "name", label: "Warehouse Name", sortable: true },
  { key: "state", label: "State" },
  { key: "city", label: "City" },
  {
    key: "createdAt",
    label: "Registration Date",
    sortable: true,
    isDate: true,
  },
  {
    key: "updatedAt",
    label: "Last Updated Date",
    sortable: true,
    isDate: true,
  },
];

const filterOptions = [
  { label: "Name", value: "name" },
  { label: "State", value: "state" },
  { label: "City", value: "city" },
];

const Contacts: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Warehouse"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data.pagination;

  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Manage Warehouse", true);

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Warehouse"
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
