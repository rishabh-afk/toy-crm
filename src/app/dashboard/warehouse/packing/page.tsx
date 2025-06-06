"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import { useAuth } from "@/context/AuthContext";
import Wrapper from "@/components/common/Wrapper";
import { getAccessPoints } from "@/hooks/general";
import TableComponent from "@/components/common/Table";
import { useSearchParams } from "next/navigation";

const columns = [
  { key: "packingNo", label: "Package No." },
  { key: "quotationNo", label: "Quotation No." },
  { key: "customer", label: "Customer Name" },
  { key: "packedBy", label: "Packed By (Employee)" },
  // { key: "netAmount", label: "Net Amount (₹)", isCurrency: "₹" },
  { key: "packingDate", label: "Packaging Date", isDate: true },
  {
    key: "packed",
    label: "Is Packed",
    isMultiPurpose: true,
    multiPurposeProps: {
      type: "select",
      options: ["true", "false"],
    },
  },
];

const filterOptions = [
  { label: "Packing No.", value: "packingNo" },
  { label: "Quotation No.", value: "quotationNo" },
];

const Contacts: React.FC = () => {
  const searchParams = useSearchParams();
  const quotationId = searchParams.get("quotationNo");
  const quotationIdExist = searchParams.has("quotationNo");

  const { data, loading, error } = useFetch(endpoints["Packing"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data.pagination;

  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Manage Warehouse");

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Packing"
          columns={columns}
          data={updatedData}
          filterOptions={filterOptions}
          pagination_data={paginationData}
          operationsAllowed={operationsAllowed}
          searchParam={
            quotationIdExist && { key: "quotationId", value: quotationId }
          }
        />
      </Wrapper>
    </AuthGuard>
  );
};

export default Contacts;
