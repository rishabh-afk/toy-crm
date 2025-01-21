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
  { key: "purchaseNo", label: "Purchase Order Number" },
  { key: "vendorName", label: "Supplier / Vendor" },
  { key: "referenceNumber", label: "Reference Number" },
  { key: "totalQuantity", label: "Total Quantity" },
  { key: "totalValue", label: "Total Value", isCurrency: "₹" },
  { key: "netAmount", label: "Final Amount", isCurrency: "₹" },
  { key: "paymentMode", label: "Payment Method" },
  { key: "purchaseDate", label: "Purchase Date", sortable: true, isDate: true },
  { key: "createdAt", label: "Creation Date", sortable: true, isDate: true },
  {
    key: "stockAdded",
    label: "Stock Added",
    isMultiPurpose: true,
    multiPurposeProps: {
      type: "select",
      options: ["true", "false"],
    },
  },
];

const filterOptions = [{ label: "Purchase No.", value: "purchaseNo" }];

const Contacts: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Purchase"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data.pagination;

  const { user } = useAuth();
  let operationsAllowed = getAccessPoints(user, "Manage Purchase");
  operationsAllowed = { ...operationsAllowed, update: false };

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Purchase"
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
