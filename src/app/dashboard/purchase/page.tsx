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
  { key: "purchaseNo", label: "Purchase Number" },
  { key: "vendor", label: "Supplier / Vendor" },
  { key: "referenceNumber", label: "Reference Number" },
  { key: "totalQuantity", label: "Total Qty" },
  { key: "totalValue", label: "Total Value.", isCurrency: "₹" },
  { key: "netAmount", label: "Final Amt.", isCurrency: "₹" },
  { key: "paymentMode", label: "Payment Mode" },
  { key: "purchaseDate", label: "Purchase Date", sortable: true, isDate: true },
  { key: "createdAt", label: "Created On", sortable: true, isDate: true },
];

const filterOptions = [
  { label: "Name", value: "firstName" },
  { label: "Email", value: "email" },
  { label: "Phone", value: "mobile" },
  { label: "Role", value: "role" },
];

const Contacts: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Purchase"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data.pagination;

  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Manage Purchase");

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
