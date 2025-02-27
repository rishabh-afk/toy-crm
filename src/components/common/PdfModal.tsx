import html2pdf from "html2pdf.js";
import React, { useRef } from "react";
import BankDetails from "./BankDetails";
// import { Post } from "@/hooks/apiUtils";
import ProductTable from "./ProductTable";
import DynamicTable from "./CategoryTable";
import { IoMdDownload } from "react-icons/io";
import QuotationHeader from "./QuotationHeader";
// import { MdOutgoingMail } from "react-icons/md";
import InvoiceDetails from "../invoice/InvoiceDetails";

const PdfModal = ({ data, onClose }: { data: any; onClose: any }) => {
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

  // const handleGenerateAndSend = async (data: any) => {
  //   if (!componentRef.current) return;
  //   console.log("called");
  //   const opt = {
  //     margin: [10, 10, 10, 10],
  //     filename: `Quotation_${data?.quotationNo}.pdf`,
  //     image: { type: "jpeg", quality: 1 },
  //     html2canvas: {
  //       scale: window.devicePixelRatio > 2 ? 3 : 2,
  //       useCORS: true,
  //       letterRendering: true,
  //       dpi: 300,
  //       logging: false,
  //     },
  //     jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  //     pagebreak: { mode: "avoid-all" },
  //   };

  //   try {
  //     const pdfBlob = await html2pdf()
  //       .set(opt)
  //       .from(componentRef.current)
  //       .toBlob();

  //     const formData = new FormData();
  //     formData.append(
  //       "file",
  //       new File([pdfBlob], `Quotation_${data?.quotationNo}.pdf`, {
  //         type: "application/pdf",
  //       })
  //     );
  //     await Post("api/quotation/send-quotation/" + data?._id, formData);
  //     onClose();
  //   } catch (error) {
  //     console.error("Error generating/sending PDF:", error);
  //   }
  // };
  return (
    <>
      <div className="m-5 p-5 border border-black rounded-lg mb-28">
        <div ref={componentRef} className="bg-white w-full">
          <InvoiceDetails data={data} />
          <QuotationHeader data={data} />
          {data?.products && data?.products.length > 0 && (
            <ProductTable data={data?.products} />
          )}
          {data?.taxSummary && <DynamicTable data={data?.taxSummary} />}
          <BankDetails terms={data?.quotationTerms || []} />
        </div>
      </div>
      <div className="absolute bottom-0 bg-white rounded-b-2xl border-t w-full p-5">
        <div className="flex gap-5 justify-end">
          {/* <button
            type="button"
            onClick={() => handleGenerateAndSend(data)}
            className="text-xl flex gap-2 items-center bg-blue-500 text-white hover:bg-blue-600 py-2 px-8 rounded-lg transition"
          >
            <MdOutgoingMail className="text-2xl" />
            Send Mail
          </button> */}
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

export default PdfModal;
