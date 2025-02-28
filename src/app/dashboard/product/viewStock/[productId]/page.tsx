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
  { key: "name", label: "Name", sortable: true },
  { key: "state", label: "Warehouse State" },
  { key: "city", label: "Warehouse City" },
  { key: "createdAt", label: "Register At", sortable: true, isDate: true },
  { key: "updatedAt", label: "Last Updated", sortable: true, isDate: true },
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
    endpoints["Product"].read + productID
  );
  const updatedData = data?.data.result;
  const paginationData = data?.data.pagination;

  const { user } = useAuth();
  let operationsAllowed = getAccessPoints(user, "Manage Products");

  if (loading && !updatedData && !error) return <Loader />;
  operationsAllowed = { ...operationsAllowed, delete: false, update: false };

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
