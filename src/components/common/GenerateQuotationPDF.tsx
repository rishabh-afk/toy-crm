import Modal from "./Modal";
import { useState } from "react";
import PdfModal from "./PdfModal";
import { Fetch } from "@/hooks/apiUtils";
import { endpoints } from "@/data/endpoints";
import { FaRegFilePdf } from "react-icons/fa";

const GenerateQuotationPDF = ({ id }: { id: any }) => {
  const [data, setPdfData] = useState<any>({});
  const [isVisible, setIsVisible] = useState(false);
  const handleEdit = async (id?: string) => {
    if (!id) return;

    try {
      const endpoint = endpoints["Quotation"]?.read;
      if (!endpoint) return;
      const url = `${endpoint}${id}`;
      const response: any = await Fetch(url, {}, 5000, true);
      if (response?.success && response?.data?._id) {
        setIsVisible(true);
        setPdfData(response.data);
      }
    } catch (error) {
      console.log("Handle Edit", error);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={() => handleEdit(id)}
        className="ml-1 text-sm flex gap-2 items-center bg-red-500 text-white hover:bg-red-600 py-1 px-2 rounded transition"
      >
        <FaRegFilePdf className="text-lg" />
        View PDF
      </button>
      <Modal
        hidePadding={true}
        isVisible={isVisible}
        onClose={() => setIsVisible(false)}
      >
        <PdfModal data={data} onClose={() => setIsVisible(false)} />
      </Modal>
    </div>
  );
};

export default GenerateQuotationPDF;
