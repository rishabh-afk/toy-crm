import dayjs from "dayjs";
import Actions from "./Actions";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

interface Column {
  key: string;
  label: string;
  isDate?: boolean;
  sortable?: boolean;
}

interface OperationsAllowed {
  read?: boolean;
  update?: boolean;
  delete?: boolean;
}

interface TableProps {
  sort: any;
  type: string;
  columns: Column[];
  filteredData: any;
  setSortConfig: any;
  fetchFilteredData: any;
  setData: (data: any) => void;
  setFilteredData: (data: any) => void;
  operationsAllowed: OperationsAllowed;
  setPaginate: (pagination: any) => void;
  setIsModalVisible: (isVisible: boolean) => void;
}

const Table: React.FC<TableProps> = ({
  sort,
  type,
  columns,
  setData,
  setPaginate,
  filteredData,
  setSortConfig,
  setFilteredData,
  setIsModalVisible,
  operationsAllowed,
  fetchFilteredData,
}) => {
  const handleSort = (key: string) => {
    let direction: "asc" | "desc" | null = "asc";
    if (sort.key === key && sort.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    fetchFilteredData({ key, dir: direction });
  };

  return (
    <div className="overflow-x-scroll no-scrollbar">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="whitespace-nowrap">
            {columns.map((col) => (
              <th
                key={col.key}
                style={{ maxWidth: `calc(100% / ${columns.length + 1})` }}
                className="p-4 text-gray-700 font-bold border border-gray-200 text-left cursor-pointer"
                onClick={() => col.sortable && handleSort(col.key)}
              >
                {col.label}
                {col.sortable && (
                  <>
                    {sort.key === col.key && sort.direction === "asc" ? (
                      <FaSortUp className="inline ml-2" />
                    ) : sort.key === col.key && sort.direction === "desc" ? (
                      <FaSortDown className="inline ml-2" />
                    ) : (
                      <FaSort className="inline ml-2" />
                    )}
                  </>
                )}
              </th>
            ))}
            {operationsAllowed?.read && (
              <th className="p-4 border text-left text-black border-gray-200 font-bold">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {filteredData?.length > 0 ? (
            filteredData.map((row: any, index: number) => (
              <tr
                key={index}
                className="border text-black border-gray-200 cursor-pointer"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="text-sm border border-gray-200 px-4 py-3"
                  >
                    {col.isDate
                      ? dayjs(row[col.key]).format("YYYY-MM-DD")
                      : col.key === "_id" || col.key === "conversationId"
                      ? row[col.key]?.slice(-8)
                      : typeof row[col.key] === "boolean"
                      ? row[col.key].toString()
                      : typeof row[col.key] === "number"
                      ? row[col.key]
                      : row[col.key]
                      ? row[col.key].toString().slice(0, 75)
                      : "-"}
                  </td>
                ))}
                {operationsAllowed?.read && (
                  <td className="text-nowrap border border-gray-200 px-4 py-3">
                    <Actions
                      row={row}
                      type={type}
                      setData={setData}
                      setPaginate={setPaginate}
                      setFilteredData={setFilteredData}
                      setIsModalVisible={setIsModalVisible}
                      operationsAllowed={operationsAllowed}
                    />
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + (operationsAllowed?.read ? 1 : 0)}
                className="text-center p-4 text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
