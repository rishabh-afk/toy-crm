"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = [
  { key: "_id", label: "ID", sortable: false },
  { key: "title", label: "Title", sortable: false },
  { key: "isActive", label: "Status", sortable: false },
  { key: "shortDescription", label: "Short Description", sortable: false },
  { key: "createdAt", label: "Created At", sortable: true, isDate: true },
];

const Blogs: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Blog"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data?.pagination;

  if (loading && !updatedData && !error) return <Loader />;

  const operationsAllowed = endpoints["Blog"].operations;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="Blog"
          data={updatedData}
          columns={columns}
          pagination_data={paginationData}
          operationsAllowed={operationsAllowed}
        />
      </Wrapper>
    </AuthGuard>
  );
};

export default Blogs;
