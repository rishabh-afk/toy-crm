"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = [
  { key: "_id", label: "ID", sortable: true },
  { key: "name", label: "Name", sortable: true },
  { key: "email", label: "Email ID", sortable: true },
  { key: "role", label: "Role Assigned", sortable: true },
  { key: "createdAt", label: "Date", sortable: true, isDate: true },
];

const Users: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Admin"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data?.pagination;

  if (loading && !updatedData && !error) return <Loader />;

  const operationsAllowed = endpoints["Admin"].operations;

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
