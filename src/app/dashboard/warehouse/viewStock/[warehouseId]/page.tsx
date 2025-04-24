"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import { usePathname } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import { useAuth } from "@/context/AuthContext";
import Wrapper from "@/components/common/Wrapper";
import { getAccessPoints } from "@/hooks/general";
import TableComponent from "@/components/common/Table";

const columns = [
  { key: "_id", label: "Product ID" },
  { key: "productCode", label: "Product Code" },
  { key: "name", label: "Product Name", sortable: true },
  { key: "stockInHand", label: "Stock In Hand" },
  { key: "mrp", label: "Price", isCurrency: true },
];

const filterOptions = [
  { label: "Name", value: "name" },
  { label: "Code", value: "productCode" },
];

const Contacts: React.FC = () => {
  const pathname = usePathname();
  const warehouseID = pathname.split("/").pop(); // Assuming `id` is the last segment of the path

  const { data, loading, error } = useFetch(
    endpoints["Stock"].read + warehouseID
  );
  const updatedData = data?.data;
  const paginationData = data?.data.pagination;

  const { user } = useAuth();
  let operationsAllowed = getAccessPoints(user, "Manage Warehouse", true);

  if (loading && !updatedData && !error) return <Loader />;
  operationsAllowed = {
    ...operationsAllowed,
    delete: false,
    update: false,
    create: false,
  };
  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Stock"
          id={warehouseID}
          columns={columns}
          data={updatedData}
          hideEverything={true}
          hideDateFilter={true}
          filterOptions={filterOptions}
          pagination_data={paginationData}
          operationsAllowed={operationsAllowed}
        />
      </Wrapper>
    </AuthGuard>
  );
};

export default Contacts;
