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
  { key: "_id", label: "Expense ID" },
  { key: "userName", label: "Employee Name" },
  { key: "email", label: "Employee Email" },
  { key: "amount", label: "Amount", isCurrency: "₹", sortable: true },
  { key: "date", label: "Transaction Date", sortable: true, isDate: true },
  { key: "createdAt", label: "Created Date", sortable: true, isDate: true },
  { key: "updatedAt", label: "Updated At", sortable: true, isDate: true },
];

const filterOptions = [{ label: "Txn ID", value: "transactionNo" }];

const Contacts: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Expense"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data.pagination;

  const { user } = useAuth();
  let operationsAllowed = getAccessPoints(user, "Manage Payment");
  operationsAllowed = { ...operationsAllowed, delete: false };
  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Expense"
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
