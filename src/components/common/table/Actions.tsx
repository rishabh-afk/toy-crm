import Modal from "../Modal";
import { useState } from "react";
import { toast } from "react-toastify";
import { endpoints } from "@/data/endpoints";
import { Delete, Fetch } from "@/hooks/apiUtils";
import StockInOutModal from "../StockInOutModal";
import BarcodeGenerator from "../BarcodeGenerator";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import GenerateQuotationPDF from "../GenerateQuotationPDF";
import LedgerTransactionsMModal from "../LedgerTransactionsMModal";
import ConfirmationModal from "@/components/crud/ConfirmationModal";

interface RowData {
  _id: string;
  name: string;
  barCode: string;
}

interface OperationsAllowed {
  update?: boolean;
  delete?: boolean;
  viewStock?: boolean;
}

interface ActionsProps {
  row: RowData;
  type: keyof typeof endpoints;
  setData: (data: any) => void;
  setFilteredData: (data: any) => void;
  operationsAllowed: OperationsAllowed;
  setPaginate: (pagination: any) => void;
  setIsModalVisible: (isVisible: boolean) => void;
}

const Actions: React.FC<ActionsProps> = ({
  type,
  row,
  setData,
  setPaginate,
  setFilteredData,
  setIsModalVisible,
  operationsAllowed,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const pathNameParams = pathname.split("/");
  const id =
    pathNameParams.length > 4 ? pathNameParams[pathNameParams.length - 1] : "";

  const [stockId, setStockId] = useState("");
  const [transaction, setTransaction] = useState({});
  const [stockModal, setStockModal] = useState(false);
  const [stockModalData, setStockModalData] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectIdForDeletion, setSelectIdForDeletion] = useState<string>("");
  const [showTransactionModal, setShowTransactionModal] =
    useState<boolean>(false);

  const handleEdit = async (id?: string) => {
    if (!id) return;

    try {
      const endpoint = endpoints[type]?.read;

      if (!endpoint) return;

      const response: any = await Fetch(`${endpoint}${id}`, {}, 5000, true);
      if (
        response?.success &&
        (response?.data?._id || response?.data?.result?._id)
      ) {
        setData(response.data.result ? response.data.result : response.data);
      } else setData({});
      setIsModalVisible(true);
    } catch (error) {
      console.log("Handle Edit", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) return;

    try {
      setSelectIdForDeletion(id);
      if (!showDeleteModal) return setShowDeleteModal(true);

      const deleteEndpoint = endpoints[type]?.delete;
      const fetchEndpoint = endpoints[type]?.fetchAll;

      if (deleteEndpoint && fetchEndpoint) {
        await Delete(`${deleteEndpoint}${id}`);
        const response: any = await Fetch(fetchEndpoint, {}, 5000, true, false);

        if (response?.success) {
          setShowDeleteModal(false);
          setFilteredData(response?.data?.result);
          setPaginate(response?.data?.pagination);
        } else window.location.reload();
      }
    } catch (error) {
      console.log("Handle Delete", error);
    }
  };

  const handleView = async (id?: string) => {
    if (!id) return;
    const url = `${pathname}/viewStock/${id}`;
    return router.push(url);
  };

  const handleTransactions = async (id?: string) => {
    if (!id) return;

    const paymentEndpoint = endpoints["Payment"]?.fetchAll;
    const receivingEndpoint = endpoints["Receiving"]?.fetchAll;

    if (!paymentEndpoint || !receivingEndpoint) {
      console.warn("Missing endpoints for Payment or Receiving");
      return;
    }
    try {
      const [paymentRes, receivingRes]: any = await Promise.all([
        Fetch(paymentEndpoint, { ledgerId: id }, 5000, true, false),
        Fetch(receivingEndpoint, { ledgerId: id }, 5000, true, false),
      ]);

      const paymentData = paymentRes?.data?.result ?? [];
      const receivingData = receivingRes?.data?.result ?? [];

      if (paymentRes?.success && paymentData.length > 0) {
        const resp: any = await Fetch(
          `api/payment/total/${id}`,
          {},
          5000,
          true,
          false
        );
        setTransaction({
          ...paymentRes.data,
          type: "Payment",
          id: id,
          expense: resp?.data,
        });
        setShowTransactionModal(true);
      } else if (receivingRes?.success && receivingData.length > 0) {
        const resp: any = await Fetch(
          `api/payment/total/${id}`,
          {},
          5000,
          true,
          false
        );
        setTransaction({
          ...receivingRes.data,
          types: "Receiving",
          id: id,
          expense: resp?.data,
        });
        setShowTransactionModal(true);
      } else {
        toast.warn("No transaction found");
        setTransaction({});
      }
    } catch (error) {
      console.error("Error while fetching transactions:", error);
      toast.error("Failed to fetch transactions");
    }
  };

  const handleDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleStockTransfer = async (id: any) => {
    const issueToUrl = `api/item-transfer`;
    const issueFromUrl = `api/item-transfer`;
    const [issueToRes, issueFromRes]: any = await Promise.all([
      Fetch(issueToUrl, { issueTo: id }, 5000, true, false),
      Fetch(issueFromUrl, { issueFrom: id }, 5000, true, false),
    ]);
    if (issueToRes?.success || issueFromRes?.success) {
      setStockModal(true);
      setStockId(id);
      setStockModalData({ issueFrom: issueFromRes, issueTo: issueToRes });
    }
  };

  return (
    <>
      <Modal isVisible={showDeleteModal} onClose={handleDeleteModal}>
        <ConfirmationModal
          id={selectIdForDeletion}
          handleDelete={handleDelete}
          handleDeleteModal={handleDeleteModal}
        />
      </Modal>
      <Modal
        isVisible={showTransactionModal}
        onClose={() => setShowTransactionModal(false)}
      >
        <LedgerTransactionsMModal data={transaction} />
      </Modal>
      <Modal
        width="w-[90%]"
        isVisible={stockModal}
        onClose={() => setStockModal(false)}
      >
        <StockInOutModal id={stockId} data={stockModalData} />
      </Modal>
      {operationsAllowed?.update && (
        <button
          onClick={() => handleEdit(row._id)}
          className="text-blue-500 text-xl hover:scale-125 hover:p-1 mr-1 hover:bg-blue-100 p-1 rounded transition"
        >
          <FaEdit title="Edit" />
        </button>
      )}
      {operationsAllowed?.delete && (
        <button
          onClick={() => handleDelete(row._id)}
          className="text-red-700 text-xl hover:scale-125 hover:p-1 hover:bg-red-100 p-1 rounded transition"
        >
          <FaTrash title="Delete" />
        </button>
      )}
      {operationsAllowed?.viewStock && !id && (
        <button
          onClick={() => handleView(row?._id)}
          className="text-green-700 ml-1 text-xl hover:scale-125 hover:p-1 hover:bg-green-100 p-1 rounded transition"
        >
          <FaEye title="View Stock" />
        </button>
      )}
      {type === "Product" && <BarcodeGenerator rowValue={row?.barCode} />}
      {type === "Ledger" && (
        <button
          type="button"
          onClick={() => handleTransactions(row?._id)}
          className="ml-1 text-sm flex gap-2 items-center bg-blue-500 text-white hover:bg-blue-600 py-1 px-2 rounded transition"
        >
          View Payments
        </button>
      )}
      {type === "Warehouse" && (
        <button
          type="button"
          onClick={() => handleStockTransfer(row?._id)}
          className="ml-1 text-sm flex gap-2 items-center bg-blue-500 text-white hover:bg-blue-600 py-1 px-2 rounded transition"
        >
          Stock Transfer
        </button>
      )}
      {type === "Quotation" && <GenerateQuotationPDF id={row._id} />}
      {type === "Packing" && (
        <GenerateQuotationPDF packing={true} id={row._id} />
      )}
    </>
  );
};

export default Actions;
