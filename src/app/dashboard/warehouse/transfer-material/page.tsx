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
  { key: "packingNo", label: "Packaging No" },
  { key: "quotationNo", label: "Quotation No" },
  { key: "customer", label: "Customer" },
  { key: "packedBy", label: "Packed By" },
  { key: "netAmount", label: "Net Amount", isCurrency: "₹" },
  { key: "packingDate", label: "Packaging Date", isDate: true },
];

const filterOptions = [
  { label: "Name", value: "firstName" },
  { label: "Email", value: "email" },
  { label: "Phone", value: "mobile" },
  { label: "Role", value: "role" },
];

const Contacts: React.FC = () => {
  const { data, loading, error } = useFetch(
    endpoints["StockTransfer"].fetchAll
  );
  const updatedData = data?.data.result;
  const paginationData = data?.data.pagination;

  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Manage Warehouse");

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
