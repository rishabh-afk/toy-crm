import { formatCurrency } from "@/hooks/general";

interface DataType {
  [key: string]: {
    gst: number;
    hsn: string;
    quantity: number;
    taxAmount: number;
    totalAmount: number;
    taxableAmount: number;
  };
}

const FinalRow = ({ data }: { data: Record<string, any> }) => {
  const total = Object.values(data).reduce(
    (
      acc,
      { quantity = 0, taxableAmount = 0, taxAmount = 0, totalAmount = 0 }
    ) => ({
      quantity: acc.quantity + quantity,
      taxableAmount: acc.taxableAmount + taxableAmount,
      taxAmount: acc.taxAmount + taxAmount,
      totalAmount: acc.totalAmount + totalAmount,
    }),
    {
      quantity: 0,
      taxableAmount: 0,
      gst: 0,
      taxAmount: 0,
      totalAmount: 0,
    }
  );
  return (
    <tr className="bg-gray-100 text-center font-semibold">
      <td className="border-x border-gray-200 pb-4 px-2" colSpan={3}>
        **Total Summary**
      </td>
      <td className="border-x border-gray-200 pb-4 px-2">{total.quantity}</td>
      <td className="border-x border-gray-200 pb-4 px-2" colSpan={2}>
        {formatCurrency(total.taxableAmount)}
      </td>
      <td className="border-x border-gray-200 pb-4 px-2">
        {formatCurrency(total.taxAmount)}
      </td>
      <td className="border-x border-gray-200 pb-4 px-2">
        {formatCurrency(total.totalAmount)}
      </td>
    </tr>
  );
};

const DynamicTable: React.FC<{ data: DataType }> = ({ data }) => {
  const formatPercentage = (value: number | undefined) =>
    value && !isNaN(value) ? `${value.toFixed(2)} %` : "0 %";

  return (
    <div className="overflow-x-auto mt-5">
      <h2 className="text-xl font-bold pb-5">Tax Summary</h2>
      <table className="w-full border-x border-gray-200 text-sm">
        <thead>
          <tr className="bg-red-400 text-white text-sm">
            <th className="border-x border-gray-200 px-2 pb-4">S. No.</th>
            <th className="border-x border-gray-200 px-2 pb-4">Category</th>
            <th className="border-x border-gray-200 px-2 pb-4">HSN Code</th>
            <th className="border-x border-gray-200 px-2 pb-4">Quantity</th>
            <th className="border-x border-gray-200 px-2 pb-4">
              Taxable Amount
            </th>
            <th className="border-x border-gray-200 px-2 pb-4">GST (%)</th>
            <th className="border-x border-gray-200 px-2 pb-4">Tax Amount</th>
            <th className="border-x border-gray-200 px-2 pb-4">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([customer, details], index) => (
            <tr
              key={index}
              className={`text-center text-xs ${
                index % 2 === 0 ? "bg-white" : "bg-gray-100"
              }`}
            >
              <td className="border-x border-gray-200 px-2 pb-4">
                {index + 1}.
              </td>
              <td className="border-x border-gray-200 px-2 pb-4">{customer}</td>
              <td className="border-x border-gray-200 px-2 pb-4">
                {details.hsn}
              </td>
              <td className="border-x border-gray-200 px-2 pb-4">
                {details.quantity}
              </td>
              <td className="border-x border-gray-200 px-2 pb-4">
                {formatCurrency(details.taxableAmount)}
              </td>
              <td className="border-x border-gray-200 px-2 pb-4">
                {formatPercentage(details.gst)}
              </td>
              <td className="border-x border-gray-200 px-2 pb-4">
                {formatCurrency(details.taxAmount)}
              </td>
              <td className="border-x border-gray-200 px-2 pb-4">
                {formatCurrency(details.totalAmount)}
              </td>
            </tr>
          ))}
          <FinalRow data={data} />
        </tbody>
      </table>
    </div>
  );
};

export default DynamicTable;
