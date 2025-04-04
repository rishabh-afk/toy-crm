import React from "react";
import Image from "next/image";
// import { formatCurrency } from "@/hooks/general";

interface TableRow {
  hsn: string;
  gst: number;
  uom: string;
  name: string;
  size: number;
  value: number;
  product: number;
  quantity: number;
  listPrice: number;
  gstAmount: number;
  coverImage: string;
  description: string;
  productCode: string;
  totalAmount: number;
  taxableAmount: number;
  discountAmount: number;
  discountPercentage: number;
}

interface TableProps {
  data: TableRow[];
}

const PackingProductTable: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-200 text-sm">
        {/* Table Header */}
        <thead>
          <tr className="bg-green-500 text-white text-left">
            {[
              "S.N.",
              "Product Image",
              "Code / Description",
              "Quantity / UOM",
            ].map((heading, index) => (
              <th
                key={index}
                className="border pb-4 px-2 border-gray-200 text-xs"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((item, index) => (
            <tr key={item.product}>
              <td className="border border-gray-200 pb-4 px-2">
                {index + 1}
              </td>
              <td className="border border-gray-200 py-2 px-2">
                {item.coverImage ? (
                  <Image
                    width={50}
                    height={50}
                    alt={item.name}
                    src={item.coverImage}
                    className="w-10 h-10 object-contain"
                  />
                ) : (
                  "-"
                )}
              </td>
              <td className="border text-[10px] leading-3 border-gray-200 pb-4 px-2">
                #{item.productCode} / {item.name}
              </td>
              <td className="border border-gray-200 pb-4 px-2 text-xs">
                {item.quantity} {item.uom}.
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PackingProductTable;
