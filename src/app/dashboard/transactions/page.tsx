"use client";

import useFetch from "@/hooks/useFetch";
import { endpoints } from "@/data/endpoints";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import AccordionTable from "@/components/common/AccordionTable";

const Transactions: React.FC = () => {
  const { data, loading, error } = useFetch(endpoints["Transaction"].fetchAll);
  const updatedData = data?.data?.result;
  const paginationData = data?.data?.pagination;

  if (loading && !updatedData && !error) return <Loader />;

  const operationsAllowed = endpoints["Transaction"].operations;
  return (
    <AuthGuard>
      <Wrapper>
        <AccordionTable
          transactions={updatedData}
          pagination_data={paginationData}
          operationsAllowed={operationsAllowed}
        />
      </Wrapper>
    </AuthGuard>
  );
};

export default Transactions;
