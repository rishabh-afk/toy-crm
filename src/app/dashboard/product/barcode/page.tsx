"use client";

import useFetch from "@/hooks/useFetch";
import { useState, useEffect } from "react";
import Select from "@/components/input/Select";
import AuthGuard from "@/components/AuthGuard";
import Loader from "@/components/common/Loader";
import Wrapper from "@/components/common/Wrapper";
import BarcodeGenerator from "@/components/common/BarcodeGenerator";

const Contacts: React.FC = () => {
  const { data, loading, error } = useFetch("api/product/public");
  const [barcode, setBarcode] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);

  const handleInputChange = (e: any) => {
    const { value } = e.target;
    setBarcode(value);
  };

  const handleQuantityChange = (e: any) => {
    const { value } = e.target;
    setQuantity(parseInt(value) || 1);
  };

  const handlePrintBarcode = () => {
    if (!barcode) return;

    const printContent = document.getElementById("barcode-print");
    if (printContent) {
      const newWindow = window.open("", "", "width=600,height=400");
      newWindow?.document.write(`
        <html>
          <head>
            <title>Barcode</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      newWindow?.document.close();
      newWindow?.print();
    }
  };

  // Format data for select options
  const updatedData = data?.data;
  const response = updatedData?.map((option: any) => ({
    value: option?.name + `(${option?.productCode})`,
    label: option?.barCode,
  }));

  // Error handling and UI messages
  useEffect(() => {
    if (error) {
      console.error("Error fetching data:", error);
    }
  }, [error]);

  if (loading && !updatedData) return <Loader />;
  if (error)
    return (
      <div className="text-red-500">
        Error loading products. Please try again later.
      </div>
    );

  const field = {
    name: "barCode",
    type: "select",
    required: true,
    options: response,
    placeholder: "Select product",
    label: "Select Product to download BARCODE",
  };

  return (
    <AuthGuard>
      <Wrapper>
        <div>
          <Select
            handleInputChange={handleInputChange}
            field={{ ...field, value: barcode || "" }}
          />

          <div className="mt-4">
            {barcode && (
              <>
                <BarcodeGenerator barcodeValue={barcode} />
                <div className="mt-2">
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min={1}
                    className="p-2 border rounded"
                    placeholder="Enter number of items"
                  />
                </div>
              </>
            )}
          </div>

          <div className="mt-4">
            <button
              onClick={handlePrintBarcode}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Print Barcode
            </button>
          </div>

          {/* Hidden div for barcode content */}
          <div id="barcode-print" className="hidden">
            {barcode && <BarcodeGenerator barcodeValue={barcode} />}
          </div>
        </div>
      </Wrapper>
    </AuthGuard>
  );
};

export default Contacts;
