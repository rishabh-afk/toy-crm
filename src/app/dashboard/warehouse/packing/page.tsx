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
  { key: "packingNo", label: "Package Number" },
  { key: "quotationNo", label: "Quotation Number" },
  { key: "customer", label: "Customer Name" },
  { key: "packedBy", label: "Packed By (Employee)" },
  { key: "netAmount", label: "Net Amount (₹)", isCurrency: "₹" },
  { key: "packingDate", label: "Packaging Date", isDate: true },
];

const filterOptions = [{ label: "Packing No.", value: "packingNo" }];

const Contacts: React.FC = () => {
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
        />
      </Wrapper>
    </AuthGuard>
  );
};

export default Contacts;
