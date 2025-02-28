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
  { key: "_id", label: "Warehouse ID" },
  { key: "name", label: "Warehouse Name" },
  { key: "quantity", label: "Stock In Hand" },
];

const filterOptions = [
  { label: "Name", value: "firstName" },
  { label: "Email", value: "email" },
  { label: "Phone", value: "mobile" },
  { label: "Role", value: "role" },
];

const Contacts: React.FC = () => {
  const pathname = usePathname();
  const productID = pathname.split("/").pop(); // Assuming `id` is the last segment of the path

  const { data, loading, error } = useFetch(
    endpoints["ProductStock"].read + productID
  );
  const updatedData = data?.data.result;
  const paginationData = data?.data.pagination;

  const { user } = useAuth();
  let operationsAllowed = getAccessPoints(user, "Manage Products");

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
          id={productID}
          columns={columns}
          data={updatedData}
          type="ProductStock"
          hideDateFilter={true}
          hideEverything={true}
          filterOptions={filterOptions}
          pagination_data={paginationData}
          operationsAllowed={operationsAllowed}
        />
      </Wrapper>
    </AuthGuard>
  );
};

export default Contacts;
