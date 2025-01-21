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
  { key: "issueNumber", label: "Transfer ID" },
  { key: "to", label: "Destination Warehouse" },
  { key: "from", label: "Source Warehouse" },
  { key: "totalQuantity", label: "Total Quantity" },
  { key: "netAmount", label: "Net Amount (₹)", isCurrency: "₹" },
  { key: "issueDate", label: "Issue Date", sortable: true, isDate: true },
];

const filterOptions = [
  { label: "ID", value: "issueNumber" },
  { label: "Quantity", value: "totalQuantity" },
];

const Contacts: React.FC = () => {
  const { data, loading, error } = useFetch(
    endpoints["StockTransfer"].fetchAll
  );
  const updatedData = data?.data.result;
  const paginationData = data?.data.pagination;

  const { user } = useAuth();
  let operationsAllowed = getAccessPoints(user, "Manage Warehouse");
  operationsAllowed = { ...operationsAllowed, read: false };

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          columns={columns}
          data={updatedData}
          type="StockTransfer"
          filterOptions={filterOptions}
          pagination_data={paginationData}
          operationsAllowed={operationsAllowed}
        />
      </Wrapper>
    </AuthGuard>
  );
};

export default Contacts;
