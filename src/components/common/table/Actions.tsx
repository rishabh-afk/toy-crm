import Modal from "../Modal";
import { useState } from "react";
import { endpoints } from "@/data/endpoints";
import { Delete, Fetch } from "@/hooks/apiUtils";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConfirmationModal from "@/components/crud/ConfirmationModal";

interface RowData {
  _id: string;
}

interface OperationsAllowed {
  update?: boolean;
  delete?: boolean;
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
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectIdForDeletion, setSelectIdForDeletion] = useState<string>("");

  const handleEdit = async (id?: string) => {
    if (!id) return;

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
  };

  const handleDelete = async (id: string) => {
    if (!id) return;

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
  };

  const handleDeleteModal = () => {
    setShowDeleteModal(false);
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
    </>
  );
};

export default Actions;
