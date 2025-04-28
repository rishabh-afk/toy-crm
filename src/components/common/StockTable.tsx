import { useState } from "react";
import { Fetch } from "@/hooks/apiUtils";
import Pagination from "./table/Pagination";

interface Pagination {
  totalPages: number;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
}

interface StockData {
  _id: string;
  issueDate: string;
  totalQuantity: number;
  netAmount: number;
  issueNumber: number;
  from: string;
  to: string;
}

interface StockTableProps {
  list: StockData[];
  type: "issueFrom" | "issueTo";
  pagination: Pagination;
  id: string;
}

const StockTable: React.FC<StockTableProps> = ({
  list,
  type,
  pagination,
  id,
}) => {
  const [data, setMoreData] = useState(list);
  const [paginate, setPaginate] = useState<Pagination>({
    totalPages: pagination?.totalPages ?? 1,
    totalItems: pagination?.totalItems ?? 0,
    currentPage: pagination?.currentPage ?? 1,
    itemsPerPage: pagination?.itemsPerPage ?? 10,
  });

  const fetchFilteredData = async (filterParams: any) => {
    try {
      const data = {
        current: filterParams.page ?? paginate.currentPage,
        limit: filterParams.limit ?? paginate.itemsPerPage,
      };
      const url = "api/item-transfer";
      const params = { [type]: id, ...data };
      const response: any = await Fetch(url, params, 5000, true, false);
      if (response?.success) {
        setMoreData(response.data);
        setPaginate(
          Array.isArray(response?.data) ? {} : response?.data?.pagination
        );
      }
    } catch (error) {
      console.log("Error fetching filtered data:", error);
    }
  };

  return (
    <>
      <div className="overflow-x-auto shadow rounded-lg bg-white">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold">
            <tr className="whitespace-nowrap text-left">
              <th className="px-6 py-3">S. No</th>
              <th className="px-6 py-3">
                {type === "issueFrom" ? "To" : "From"}
              </th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Qty</th>
              <th className="px-6 py-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 ? (
              data.map((item) => (
                <tr
                  key={item._id}
                  className="whitespace-nowrap hover:bg-blue-50 transition-all duration-200"
                >
                  <td className="px-6 py-3 font-semibold">
                    {item.issueNumber ?? "-"}
                  </td>
                  <td className="px-6 py-3">
                    {(type === "issueFrom" ? item.to : item.from) || "-"}
                  </td>
                  <td className="px-6 py-3">
                    {item.issueDate
                      ? new Date(item.issueDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })
                      : "-"}
                  </td>
                  <td className="px-6 py-3">{item.totalQuantity ?? "-"}</td>
                  <td className="px-6 py-3 font-semibold text-green-700">
                    ₹{item.netAmount?.toLocaleString() || "-"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-6 py-10 text-center text-gray-400"
                  colSpan={6}
                >
                  No records available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data?.length > 0 && (
        <Pagination paginate={paginate} fetchFilteredData={fetchFilteredData} />
      )}
    </>
  );
};

export default StockTable;
