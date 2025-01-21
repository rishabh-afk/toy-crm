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
  { key: "leadId", label: "Lead Identifier (ID)" },
  { key: "name", label: "Full Name", sortable: true },
  { key: "email", label: "Email Address", sortable: true },
  { key: "phone", label: "Phone Number", sortable: true },
  { key: "companyName", label: "Company Name" },
  { key: "salesPersonName", label: "Salesperson Name" },
  { key: "salesPersonEmail", label: "Salesperson Email" },
  { key: "source", label: "Lead Source", sortable: true },
  { key: "createdAt", label: "Creation Date", sortable: true, isDate: true },
  {
    key: "updatedAt",
    label: "Last Updated Date",
    sortable: true,
    isDate: true,
  },
  {
    sortable: true,
    label: "Priority Level",
    key: "priorityLevel",
    isMultiPurpose: true,
    multiPurposeProps: { type: "label" },
  },
  {
    sortable: true,
    label: "Lead Type",
    key: "leadType",
    isMultiPurpose: true,
    multiPurposeProps: { type: "label" },
  },
];

const filterOptions = [
  { label: "Company", value: "companyName" },
  { label: "Email", value: "email" },
  { label: "Phone", value: "phone" },
];

const Contacts: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Lead"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data.pagination;

  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Manage Leads");

  if (loading && !updatedData && !error) return <Loader />;

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
