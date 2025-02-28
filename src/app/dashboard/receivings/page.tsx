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
  { key: "receivingNo", label: "Receiving No." },
  { key: "ledgerName", label: "Customer / Supplier" },
  { key: "receivingType", label: "Receiving Type" },
  { key: "amount", label: "Amount", isCurrency: "₹" },
  {
    key: "receivingDate",
    label: "Receiving Date",
    sortable: true,
    isDate: true,
  },
  { key: "receivingMethod", label: "Payment Mode", sortable: true },
  {
    key: "receivingStatus",
    label: "Receiving Status",
    sortable: true,
    isMultiPurpose: true,
    multiPurposeProps: { type: "label" },
  },
];

const filterOptions = [{ label: "Txn ID", value: "transactionNo" }];

const Contacts: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Receiving"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data.pagination;

  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Manage Payment");

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Receiving"
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
