"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = [
  // { key: "_id", label: "ID", sortable: true },
  { key: "leadId", label: "Lead ID" },
  { key: "name", label: "UserName" },
  { key: "email", label: "User Email" },
  { key: "phone", label: "User Phone" },
  { key: "companyName", label: "Company" },
  // { key: "salesPersonName", label: "Sales Name" },
  // { key: "salesPersonEmail", label: "Sales Email" },
  { key: "source", label: "Source", sortable: true },
  { key: "priorityLevel", label: "Priority", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "createdAt", label: "Created At", sortable: true, isDate: true },
  { key: "updatedAt", label: "Last Updated", sortable: true, isDate: true },
];

const filterOptions = [
  { label: "Name", value: "firstName" },
  { label: "Email", value: "email" },
  { label: "Phone", value: "mobile" },
  { label: "Role", value: "role" },
];

const Contacts: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Lead"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data.pagination;

  if (loading && !updatedData && !error) return <Loader />;

  const operationsAllowed = endpoints["Lead"].operations;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Lead"
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
