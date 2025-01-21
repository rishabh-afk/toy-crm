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
  { key: "_id", label: "Product ID" },
  { key: "productCode", label: "Product Code", sortable: true },
  { key: "name", label: "Product Name", sortable: true },
  { key: "sku", label: "SKU", sortable: true },
  { key: "barCode", label: "Barcode" },
  { key: "productCategory", label: "Category" },
  { key: "brandName", label: "Brand" },
  { key: "mrp", label: "MRP", sortable: true, isCurrency: "₹" },
  { key: "ourPrice", label: "Our Price", sortable: true, isCurrency: "₹" },
  { key: "createdAt", label: "Creation Date", sortable: true, isDate: true },
  {
    key: "updatedAt",
    label: "Last Updated Date",
    sortable: true,
    isDate: true,
  },
];

const filterOptions = [
  { label: "Code", value: "productCode" },
  { label: "Name", value: "name" },
  { label: "SKU", value: "sku" },
  { label: "Bar Code", value: "barCode" },
];

const Contacts: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Product"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data.pagination;

  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Manage Products", true);

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Product"
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
