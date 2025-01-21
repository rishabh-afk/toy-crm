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
  { key: "_id", label: "Ledger ID" },
  { key: "ledgerType", label: "Ledger Type", sortable: true },
  { key: "contactPerson", label: "Contact Person", sortable: true },
  { key: "email", label: "Email Address", sortable: true },
  { key: "mobileNo", label: "Mobile Number", sortable: true },
  { key: "country", label: "Country" },
  { key: "state", label: "State" },
  { key: "companyName", label: "Company Name", sortable: true },
  { key: "groupUnderName", label: "Assignee Name" },
  { key: "groupedUnderEmail", label: "Assignee Email" },
  { key: "createdAt", label: "Date", sortable: true, isDate: true },
];

const filterOptions = [
  { label: "Name", value: "name" },
  { label: "Email", value: "email" },
  { label: "Phone", value: "mobileNo" },
  { label: "Type", value: "ledgerType" },
  { label: "Company", value: "companyName" },
  { label: "State", value: "state" },
];

const Users: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Ledger"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data?.pagination;

  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Manage Ledger");

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Ledger"
          suffix="/party"
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
