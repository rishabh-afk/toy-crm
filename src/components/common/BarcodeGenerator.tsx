import JsBarcode from "jsbarcode";
import { IoMdDownload } from "react-icons/io";
import { useEffect, useRef, useState } from "react";

const BarcodeGenerator = ({
  id,
  rowValue,
}: {
  id: string;
  rowValue: string;
}) => {
  const barcodeRef = useRef<SVGSVGElement | null>(null);
  const [barcodeGenerated, setBarcodeGenerated] = useState(false);

  const handleGenerateAndPrint = () => {
    if (!rowValue) return;
    if (barcodeRef.current) barcodeRef.current.innerHTML = "";

    setTimeout(() => {
      if (barcodeRef.current) {
        JsBarcode(barcodeRef.current, rowValue, {
          format: "CODE128",
          displayValue: true,
        });
        setBarcodeGenerated(true); // Mark as generated
      }
    }, 500);
  };

  useEffect(() => {
    if (barcodeGenerated) {
      handlePrintBarcode();
      setBarcodeGenerated(false);
    }
    // eslint-disable-next-line
  }, [barcodeGenerated]);

  const handlePrintBarcode = () => {
    const printContent = document.getElementById(id);
    if (printContent) {
      const originalContent = document.body.innerHTML;

      document.body.innerHTML = printContent.innerHTML;
      window.print();

      document.body.innerHTML = originalContent;
      window.location.reload();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        type="button"
        onClick={handleGenerateAndPrint}
        className="ml-1 text-sm flex gap-2 items-center bg-blue-500 text-white hover:bg-blue-600 py-1 px-2 rounded transition"
      >
        Print Barcode <IoMdDownload className="text-lg" />
      </button>
      <div id={id} className="hidden">
        <svg ref={barcodeRef}></svg>
      </div>
    </div>
  );
};

export default BarcodeGenerator;
