"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = [
  { key: "_id", label: "ID" },
  { key: "name", label: "Role", sortable: true },
  { key: "description", label: "Role Description" },
  { key: "createdAt", label: "Created At", sortable: true, isDate: true },
  { key: "updatedAt", label: "Last Updated", isDate: true },
];

const Contacts: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Role"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data.pagination;

  if (loading && !updatedData && !error) return <Loader />;

  const operationsAllowed = endpoints["Role"].operations;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Role"
          columns={columns}
          data={updatedData}
          pagination_data={paginationData}
          operationsAllowed={operationsAllowed}
        />
      </Wrapper>
    </AuthGuard>
  );
};

export default Contacts;
