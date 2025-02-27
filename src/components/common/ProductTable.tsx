import React from "react";
import Image from "next/image";

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

const FinalRow = ({ data }: { data: any }) => {
  const total = data.reduce(
    (acc: any, item: any) => {
      acc.quantity += item.quantity || 0;
      acc.listPrice += item.listPrice || 0;
      acc.gstAmount += item.gstAmount || 0;
      acc.totalAmount += item.totalAmount || 0;
      acc.taxableAmount += item.taxableAmount || 0;
      acc.discountAmount += item.discountAmount || 0;
      return acc;
    },
    {
      quantity: 0,
      listPrice: 0,
      gstAmount: 0,
      totalAmount: 0,
      taxableAmount: 0,
      discountAmount: 0,
    }
  );

  return (
    <tr className="bg-gray-100 font-semibold">
      <td className="border-x border-gray-200 pb-4 px-2" colSpan={5}>
        **Total Summary** (Qty: {total?.quantity})
      </td>
      <td className="border-x border-gray-200 pb-4 px-2" colSpan={1}>
        ₹{total.discountAmount.toFixed(2)}
      </td>
      <td className="border-x border-gray-200 pb-4 px-2">
        ₹{total.gstAmount.toFixed(2)}
      </td>
      <td className="border-x border-gray-200 pb-4 px-2">
        ₹{total.taxableAmount.toFixed(2)}
      </td>
      <td className="border-x border-gray-200 pb-4 px-2">
        ₹{total.totalAmount.toFixed(2)}
      </td>
    </tr>
  );
};

const ProductTable: React.FC<TableProps> = ({ data }) => {
  const formatCurrency = (value: number | undefined) =>
    value && !isNaN(value) ? `₹${value.toFixed(2)}` : "₹0.00";

  const formatPercentage = (value: number | undefined) =>
    value && !isNaN(value) ? `${value.toFixed(2)} %` : "0 %";

  const safeDivide = (
    numerator: number | undefined,
    denominator: number | undefined
  ) => (denominator && denominator > 0 ? (numerator ?? 0) / denominator : 0);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-x border-gray-200 text-sm">
        {/* Table Header */}
        <thead>
          <tr className="bg-red-400 text-white text-left">
            {[
              "S.N.",
              "Image",
              "Code / Desc. / Hsn",
              "Qty/UOM",
              "Rate",
              "Disc. / Pcs (%)",
              "GST / Pcs (%)",
              "Value / Pcs",
              "Total ₹",
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
              <td className="border-x border-gray-200 pb-4 px-2">
                {index + 1}
              </td>
              <td className="border-x border-gray-200 py-2 px-2">
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
              <td className="border-x text-[10px] leading-3 border-gray-200 pb-4 px-2">
                {item.productCode}
                <br />
                {item.name}
                <br />
                {item.hsn}
              </td>
              <td className="border-x border-gray-200 pb-4 px-2 text-xs">
                {item.quantity} {item.uom}.
              </td>
              <td className="border-x border-gray-200 pb-4 px-2 text-xs">
                {formatCurrency(item.listPrice)}
              </td>
              <td className="border-x border-gray-200 pb-4 px-2 text-xs">
                {formatCurrency(safeDivide(item.discountAmount, item.quantity))}
                <br />
                {formatPercentage(item.discountPercentage)}
              </td>
              <td className="border-x border-gray-200 pb-4 px-2 text-xs">
                {formatCurrency(safeDivide(item.gstAmount, item.quantity))}
                <br />
                {formatPercentage(item.gst)}
              </td>
              <td className="border-x border-gray-200 pb-4 px-2 text-xs">
                {formatCurrency(safeDivide(item.taxableAmount, item.quantity))}
              </td>
              <td className="border-x border-gray-200 pb-4 px-2 text-xs">
                {formatCurrency(item.totalAmount)}
              </td>
            </tr>
          ))}
          <FinalRow data={data} />
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
