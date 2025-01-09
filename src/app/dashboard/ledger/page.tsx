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
  { key: "companyName", label: "Company", sortable: true },
  { key: "jobWork", label: "Job Work", sortable: true },
  { key: "country", label: "Country", sortable: true },
  { key: "bankName", label: "Bank Name", sortable: true },
  { key: "ifscCode", label: "IFSC Code", sortable: true },
  { key: "branchAddress", label: "Branch Address", sortable: true },
  { key: "createdAt", label: "Date", sortable: true, isDate: true },
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
          pagination_data={paginationData}
          operationsAllowed={operationsAllowed}
        />
      </Wrapper>
    </AuthGuard>
  );
};

export default Users;
