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
  { key: "_id", label: "Employee ID" },
  { key: "name", label: "Full Name", sortable: true },
  { key: "email", label: "Email Address", sortable: true },
  { key: "mobileNo", label: "Phone Number", sortable: true },
  { key: "role", label: "Assigned Role", sortable: true },
  {
    key: "status",
    sortable: true,
    isMultiPurpose: true,
    label: "Account Status",
    multiPurposeProps: { type: "label" },
  },
  {
    key: "createdAt",
    label: "Account Creation Date",
    sortable: true,
    isDate: true,
  },
];

const filterOptions = [
  { label: "Name", value: "name" },
  { label: "Email", value: "email" },
  { label: "Role", value: "role" },
  { label: "Status", value: "status" },
  { label: "Phone", value: "mobileNo" },
];

const Users: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Employee"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data?.pagination;

  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Manage Employee");

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Employee"
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

export default Users;
