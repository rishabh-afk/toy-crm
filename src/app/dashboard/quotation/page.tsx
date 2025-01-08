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
  { key: "quotationNo", label: "Quotation ID" },
  { key: "preparedBy", label: "Assignee" },
  { key: "totalQuantity", label: "Quantity" },
  { key: "discountAmount", label: "Discount", isCurrency: "₹" },
  { key: "freightAmount", label: "Freight", isCurrency: "₹" },
  { key: "igstAmount", label: "IGST (Tax)", isCurrency: "₹" },
  { key: "totalValue", label: "Total Amt.", isCurrency: "₹" },
  { key: "taxableAmount", label: "Taxable", isCurrency: "₹" },
  { key: "netAmount", label: "Final Amt.", isCurrency: "₹" },
  { key: "quotationDate", label: "Send On", sortable: true, isDate: true },
];

const filterOptions = [
  { label: "Name", value: "firstName" },
  { label: "Email", value: "email" },
  { label: "Phone", value: "mobile" },
  { label: "Role", value: "role" },
];

const Contacts: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Quotation"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data.pagination;

  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Manage Quotations");

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Quotation"
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
