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
  { key: "_id", label: "UOM ID" },
  { key: "shortName", label: "Short Name", sortable: true },
  { key: "longName", label: "Long Name", sortable: true },
  { key: "createdAt", label: "Creation Date", sortable: true, isDate: true },
  {
    key: "updatedAt",
    label: "Last Updated Date",
    sortable: true,
    isDate: true,
  },
  {
    key: "status",
    sortable: true,
    isMultiPurpose: true,
    label: "Status",
    multiPurposeProps: { type: "label" },
  },
];

const filterOptions = [
  { label: "Name", value: "shortName" },
  { label: "Long Name", value: "longName" },
  { label: "Status", value: "status" },
];

const Contacts: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["UOM"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data.pagination;

  const { user } = useAuth();
  const operationsAllowed = getAccessPoints(user, "Manage Products");

  if (loading && !updatedData && !error) return <Loader />;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="UOM"
          columns={columns}
          data={updatedData}
          suffix="(Unit Of Measure)"
          filterOptions={filterOptions}
          pagination_data={paginationData}
          operationsAllowed={operationsAllowed}
        />
      </Wrapper>
    </AuthGuard>
  );
};

export default Contacts;
