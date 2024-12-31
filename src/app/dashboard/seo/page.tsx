"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import TableComponent from "@/components/common/Table";

const columns = [
  { key: "_id", label: "ID", sortable: false },
  { key: "slug", label: "Slug", sortable: false },
  { key: "title", label: "Title", sortable: false },
  { key: "descriptions", label: "Description", sortable: false },
];

const Seo: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["MetaData"].fetchAll);
  const updatedData = data?.data.result;
  const paginationData = data?.data?.pagination;

  if (loading && !updatedData && !error) return <Loader />;

  const operationsAllowed = endpoints["MetaData"].operations;

  return (
    <AuthGuard>
      <Wrapper>
        <TableComponent
          type="MetaData"
          hideStatus={true}
          columns={columns}
          data={updatedData}
          pagination_data={paginationData}
          operationsAllowed={operationsAllowed}
        />
      </Wrapper>
    </AuthGuard>
  );
};

export default Seo;
