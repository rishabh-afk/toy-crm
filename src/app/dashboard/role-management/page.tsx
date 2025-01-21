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
  { key: "name", label: "Role Name", sortable: true },
  { key: "description", label: "Detailed Role Description" },
  { key: "createdAt", label: "Date Created", sortable: true, isDate: true },
  { key: "updatedAt", label: "Last Updated On", isDate: true },
];

const filterOptions = [
  { label: "Role", value: "name" },
  { label: "Desc.", value: "description" },
];

const Contacts: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Role"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data.pagination;

  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Role Management");

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Role"
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
