import html2pdf from "html2pdf.js";
import React, { useRef } from "react";
import BankDetails from "./BankDetails";
import PackingHeader from "./PackingHeader";
import { IoMdDownload } from "react-icons/io";
import PackingProductTable from "./PackingProductTable";
import PackingInvoiceDetails from "../invoice/PackingInvoiceDetails";

const PackingPdfModal = ({ data, onClose }: { data: any; onClose: any }) => {
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handleGenerateAndPrint = (data: any) => {
    if (!componentRef.current) return;
    const opt = {
      margin: [10, 10, 10, 10], // Top, Right, Bottom, Left
      filename: `Quotation_${data?.quotationNo}.pdf`,
      image: { type: "jpeg", quality: 1 }, // Use high-quality JPEG
      html2canvas: {
        scale: window.devicePixelRatio > 2 ? 3 : 2, // Adaptive scale for clarity
        useCORS: true, // Fix CORS issue for external images
        letterRendering: true, // Enhances text rendering
        dpi: 300, // Higher DPI for better text sharpness
        logging: false,
      },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: "avoid-all" }, // Prevents text/image cuts
    };
    html2pdf()
      .set(opt)
      .from(componentRef.current)
      .save()
      .then(() => onClose());
  };

  return (
    <>
      <div className="m-5 p-5 border border-black rounded-lg mb-28">
        <div ref={componentRef} className="bg-white w-full">
          <PackingInvoiceDetails data={data} />
          <PackingHeader data={data} />
          {data?.products && data?.products.length > 0 && (
            <PackingProductTable data={data?.products} />
          )}
          {/* {data?.taxSummary && <DynamicTable data={data?.taxSummary} />} */}
          <BankDetails hideBanking={true} terms={data?.quotationTerms || []} />
        </div>
      </div>
      <div className="absolute bottom-0 bg-white rounded-b-2xl border-t w-full p-5">
        <div className="flex gap-5 justify-end">
          <button
            type="button"
            onClick={() => handleGenerateAndPrint(data)}
            className="text-xl flex gap-2 items-center bg-red-500 text-white hover:bg-red-600 py-2 px-8 rounded-lg transition"
          >
            <IoMdDownload className="text-lg" />
            Downlaod PDF
          </button>
        </div>
      </div>
    </>
  );
};

export default PackingPdfModal;
