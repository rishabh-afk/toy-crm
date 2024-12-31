"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = [
  { key: "_id", label: "ID", sortable: true },
  { key: "senderName", label: "Name", sortable: true },
  { key: "senderMobile", label: "Phone Number", sortable: true },
  { key: "senderEmail", label: "Email", sortable: true },
  { key: "createdAt", label: "Date", sortable: true, isDate: true },
  { key: "status", label: "Status", sortable: true },
];

const Contacts: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Contact"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data.pagination;

  if (loading && !updatedData && !error) return <Loader />;

  const operationsAllowed = endpoints["Contact"].operations;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Contact"
          columns={columns}
          data={updatedData}
          pagination_data={paginationData}
          operationsAllowed={operationsAllowed}
        />
      </Wrapper>
    </AuthGuard>
  );
};

export default Contacts;
