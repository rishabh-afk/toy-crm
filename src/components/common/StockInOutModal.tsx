import StockTable from "./StockTable";

const StockInOutModal = ({ data, id }: any) => {
  return (
    <div className="relative">
      <h2 className="text-2xl font-semibold mb-6 absolute -top-10 text-primary">
        Stock In/Out Ledger
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Grid - Issued To */}
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="text-xl font-semibold text-blue-600 mb-2">
            Transferred To (Destination Details)
          </div>
          {data?.issueFrom?.data?.result?.length > 0 ? (
            <StockTable
              list={data.issueFrom.data.result}
              type="issueFrom"
              pagination={data.issueFrom.data.pagination}
              id={id}
            />
          ) : (
            <div className="text-gray-500">No issued-from data available.</div>
          )}
        </div>

        {/* Right Grid - Issued From */}
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <div className="text-xl font-semibold text-blue-600 mb-2">
            Transferred From (Source Details)
          </div>
          {data?.issueTo?.data?.result?.length > 0 ? (
            <StockTable
              list={data.issueTo.data.result}
              type="issueTo"
              pagination={data.issueTo.data.pagination}
              id={id}
            />
          ) : (
            <div className="text-gray-500">No issued-to data available.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockInOutModal;
