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
  { key: "_id", label: "ID" },
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email ID", sortable: true },
  { key: "mobileNo", label: "Phone No.", sortable: true },
  { key: "role", label: "Role Assigned", sortable: true },
  { key: "status", label: "Active Status", sortable: true },
  { key: "createdAt", label: "Date", sortable: true, isDate: true },
];

const Users: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Admin"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data?.pagination;

  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Manage Admin");

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Admin"
          columns={columns}
          data={updatedData}
          pagination_data={paginationData}
          operationsAllowed={operationsAllowed}
        />
      </Wrapper>
    </AuthGuard>
  );
};

export default Users;
