import { useState } from "react";
import { Fetch } from "@/hooks/apiUtils";
import Pagination from "./table/Pagination";
import { endpoints } from "@/data/endpoints";
import ExpenseStats from "./table/ExpenseStats";

interface LedgerTransactionsMModalProps {
    data: {
        id?: string;
        expense?: any;
        result?: any[];
        pagination?: any;
        types?: "Payment" | "Receiving";
    };
}

interface Pagination {
    totalPages: number;
    totalItems: number;
    currentPage: number;
    itemsPerPage: number;
}

const LedgerTransactionsMModal = ({ data }: LedgerTransactionsMModalProps) => {
    const [expense, setExpenses] = useState(data?.expense ?? {});
    const [paginate, setPaginate] = useState<Pagination>({
        totalPages: data?.pagination?.totalPages ?? 1,
        totalItems: data?.pagination?.totalItems ?? 0,
        currentPage: data?.pagination?.currentPage ?? 1,
        itemsPerPage: data?.pagination?.itemsPerPage ?? 10,
    });
    const [transaction, setTransaction] = useState<any>(data?.result);
    const [activeTab, setActiveTab] = useState<"Payment" | "Receiving">(data?.types || "Payment");

    const fetchTransaction = async (type: "Payment" | "Receiving") => {
        const endpoint = endpoints[type]?.fetchAll;
        const url = `api/payment/total/${data?.id}`;
        const response: any = await Fetch(endpoint, { ledgerId: data?.id }, 5000, true);
        const responseT: any = await Fetch(url, {}, 5000, true, false);
        if (responseT?.success) setExpenses(responseT?.data);
        const paymentData = response?.data?.result ?? [];
        if (response?.success && paymentData.length > 0) {
            setTransaction(paymentData);
            setPaginate(response?.data?.pagination);
        }
        else setTransaction([]);
        setActiveTab(type);
    };

    const fetchFilteredData = async () => { };

    return (
        <div className="">
            {/* Tab Header */}
            <span className="text-2xl absolute top-5 font-semibold">Ledger Transactions</span>
            <div className="my-5">
                <ExpenseStats data={expense} />
            </div>
            <div className="flex items-center space-x-3 bg-gray-50 p-1 rounded-xl shadow-sm w-fit mb-4">
                {[
                    { label: "Payment", icon: "💳", tooltip: "View all payments", count: transaction.length },
                    { label: "Receiving", icon: "📥", tooltip: "View all receivings", count: transaction.length }
                ].map(({ label, icon, tooltip, count }) => (
                    <button
                        key={label}
                        title={tooltip}
                        onClick={() => fetchTransaction(label as "Payment" | "Receiving")}
                        className={`relative px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 group
        ${activeTab === label
                                ? "bg-blue-600 text-white shadow"
                                : "text-gray-600 hover:bg-blue-100 hover:text-blue-600"
                            }`}
                    >
                        <span className="flex items-center space-x-1">
                            <span>{icon}</span>
                            <span>{label}</span>
                        </span>

                        {typeof count === "number" && (
                            <span className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                {count}
                            </span>
                        )}
                    </button>
                ))}
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700 bg-white rounded-lg overflow-hidden shadow-md">
                    {transaction.length > 0 &&
                        <thead className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold">
                            <tr className="whitespace-nowrap text-left">
                                <th className="px-6 py-3">Receiving No</th>
                                <th className="px-6 py-3">Ledger Name</th>
                                <th className="px-6 py-3">Receiving Type</th>
                                <th className="px-6 py-3">Receiving Date</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Method</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                    }
                    <tbody>
                        {transaction && transaction.map((item: any, idx: number) => (
                            <tr
                                key={item._id}
                                className={`whitespace-nowrap transition-all duration-200 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                                    } hover:bg-blue-50`}
                            >
                                <td className="px-6 py-3">{item.receivingNo ?? "-"}</td>
                                <td className="px-6 py-3 font-medium">{item.ledgerName || "-"}</td>
                                <td className="px-6 py-3">{item.receivingType || "-"}</td>
                                <td className="px-6 py-3">
                                    {item.receivingDate
                                        ? new Date(item.receivingDate).toLocaleDateString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric",
                                        })
                                        : "-"}
                                </td>
                                <td className="px-6 py-3 font-semibold text-green-700">
                                    {item.amount ? `₹${item.amount.toLocaleString()}` : "-"}
                                </td>
                                <td className="px-6 py-3">{item.receivingMethod || "-"}</td>
                                <td className="px-6 py-3">
                                    <span
                                        className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${item.receivingStatus === "Completed"
                                            ? "bg-green-100 text-green-700"
                                            : item.receivingStatus === "Pending"
                                                ? "bg-yellow-100 text-yellow-800"
                                                : "bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {item.receivingStatus || "-"}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {transaction.length === 0 && (
                <div className="flex flex-col items-center justify-center py-10 text-gray-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 mb-3 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 17v-6h6v6m2 4H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                    <p className="text-lg font-semibold">No Transactions Available</p>
                    <p className="text-sm text-center max-w-xs mt-1">
                        We couldn&apos;t find any transactions linked to this record. Once they&apos;re available, you&apos;ll see them here.
                    </p>
                </div>
            )}

            {/* Pagination */}
            {transaction.length > 0 &&
                <Pagination
                    paginate={paginate}
                    fetchFilteredData={fetchFilteredData}
                />
            }
        </div>
    );
};

export default LedgerTransactionsMModal;
