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
  { key: "paymentNo", label: "Payment No." },
  { key: "ledgerName", label: "Customer / Supplier" },
  { key: "paymentType", label: "Payment Type" },
  { key: "amount", label: "Amount", isCurrency: "₹" },
  {
    key: "paymentDate",
    label: "Payment Date",
    sortable: true,
    isDate: true,
  },
  { key: "paymentMethod", label: "Payment Mode", sortable: true },
  {
    key: "paymentStatus",
    label: "Payment Status",
    sortable: true,
    isMultiPurpose: true,
    multiPurposeProps: { type: "label" },
  },
];

const filterOptions = [{ label: "Txn ID", value: "transactionNo" }];

const Contacts: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Payment"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data.pagination;

  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Manage Payment");

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Payment"
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
