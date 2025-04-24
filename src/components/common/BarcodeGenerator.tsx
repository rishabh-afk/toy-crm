import JsBarcode from "jsbarcode";
import { IoMdDownload } from "react-icons/io";
import { useEffect, useRef, useState } from "react";

const BarcodeGenerator = ({ rowValue }: { rowValue: string }) => {
  const barcodeRef = useRef<SVGSVGElement | null>(null);
  const [barcodeReadyToPrint, setBarcodeReadyToPrint] = useState(false);

  const generateBarcode = () => {
    if (!rowValue || !barcodeRef.current) return;

    JsBarcode(barcodeRef.current, rowValue, {
      format: "EAN13",
      width: 2,
      height: 80,
      margin: 10,
      fontSize: 18,
      lineColor: "#000",
      displayValue: true,
    });

    setTimeout(() => setBarcodeReadyToPrint(true), 200); // Wait for barcode render
  };

  useEffect(() => {
    if (barcodeReadyToPrint) {
      handlePrintBarcode();
      setBarcodeReadyToPrint(false);
    }
  }, [barcodeReadyToPrint]);

  const handlePrintBarcode = () => {
    const printWindow = window.open("", "", "width=800,height=800");

    if (printWindow && barcodeRef.current) {
      printWindow.document.write(`
        <html>
          <head>
            <style>
              @page { margin: 0; size: auto; }
              body { 
                display: flex; 
                justify-content: center; 
                align-items: center; 
                height: 100vh; 
                margin: 0; 
              }
              svg {
                width: 300px;
                height: auto;
              }
            </style>
          </head>
          <body>
            ${barcodeRef.current.outerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        type="button"
        onClick={generateBarcode}
        className="ml-1 text-sm flex gap-2 items-center bg-blue-500 text-white hover:bg-blue-600 py-1 px-2 rounded transition"
      >
        Print Barcode <IoMdDownload className="text-lg" />
      </button>

      {/* Show SVG for debug, or keep hidden */}
      <div className="sr-only">
        <svg ref={barcodeRef}></svg>
      </div>
    </div>
  );
};

export default BarcodeGenerator;
