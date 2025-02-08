import { useEffect } from "react";
import { debounce } from "@/hooks/general";

const BillingProductForm = ({
  initialData,
  onProductDataChange,
}: {
  initialData: any;
  onProductDataChange: any;
}) => {
  useEffect(() => {
    const data = calculatedFinal(initialData);
    debounce(onProductDataChange(data, initialData), 1000);
    // eslint-disable-next-line
  }, []);

  const calculatedFinal = (items: any) => {
    const final = {
      netAmount: 0,
      gstAmount: 0,
      totalValue: 0,
      totalQuantity: 0,
      taxableAmount: 0,
      discountAmount: 0,
    };
    items.forEach((item: any) => {
      const taxableAmount = parseFloat(item.taxableAmount) || 0;
      const discountAmount = parseFloat(item.discountAmount) || 0;
      const value = parseFloat(item.value) || 0;
      const totalAmount = parseFloat(item.totalAmount) || 0;
      const quantity = parseFloat(item.quantity) || 0;
      const gst = parseFloat(item.gst) || 0;

      // Calculate the totals
      final.totalQuantity += quantity;
      final.totalValue += value;
      final.discountAmount += discountAmount;
      final.taxableAmount += taxableAmount;
      final.netAmount += totalAmount;

      if (gst && taxableAmount > 0) {
        final.gstAmount += (taxableAmount * gst) / 100;
      }
    });

    Object.keys(final).forEach((key) => {
      final[key as keyof typeof final] = parseFloat(
        final[key as keyof typeof final].toFixed(2)
      );
    });
    return final;
  };

  return (
    <div className="">
      <h2 className="text-lg my-3 py-1 bg-secondary text-white font-bold text-center">
        Product Details
      </h2>
      <div className="overflow-x-auto no-scrollbar">
        <table className="table-auto border-collapse whitespace-nowrap border border-gray-300">
          <thead>
            <tr className="bg-secondary text-white text-left">
              {[
                "Product Code",
                "UOM",
                "List Price",
                "Quantity",
                "Value",
                "Discount (%)",
                "Discount Amt.",
                "Taxable Amt.",
                "GST",
                "GST Amount",
                "Total Amount",
              ].map((header) => (
                <th
                  key={header}
                  className="p-2 border text-center capitalize border-gray-300 text-sm font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {initialData.map((item: any, index: number) => {
              return (
                <tr
                  key={index}
                  className="odd:bg-white text-black even:bg-gray-50"
                >
                  <td className="border border-gray-300 p-2">
                    {item.name} ({item.productCode})
                  </td>
                  <td className="border min-w-20 border-gray-300 p-2">
                    {item.uom}
                  </td>
                  <td className="border min-w-20 border-gray-300 p-2">
                    {item.listPrice ? "₹ " + item.listPrice : 0}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.quantity}
                  </td>
                  <td className="border min-w-20 p-2 border-gray-300">
                    {item.value ? "₹ " + item.value : 0}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {item.discountPercentage}
                  </td>
                  <td className="border min-w-20 border-gray-300 p-2">
                    {item.discountAmount}
                  </td>
                  <td className="border min-w-20 border-gray-300 p-2">
                    {item.taxableAmount ? "₹ " + item.taxableAmount : 0}
                  </td>
                  <td className="border min-w-20 border-gray-300 p-2">
                    {item.gst} %
                  </td>
                  <td className="border min-w-20 border-gray-300 p-2">
                    {item.gstAmount ? "₹ " + item.gstAmount : 0}
                  </td>
                  <td className="border min-w-20 border-gray-300 p-2">
                    {item.totalAmount ? "₹ " + item.totalAmount : 0}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillingProductForm;
