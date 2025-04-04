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
    <tr className="bg-gray-100 text-[10px] text-center font-semibold">
      <td className="border-x border-gray-200 pb-2 px-2" colSpan={3}>
        **Total Summary**
      </td>
      <td className="border-x border-gray-200 pb-2 px-2">{total.quantity}</td>
      <td className="border-x border-gray-200 pb-2 px-2" colSpan={2}>
        {formatCurrency(total.taxableAmount)}
      </td>
      <td className="border-x border-gray-200 pb-2 px-2">
        {formatCurrency(total.taxAmount)}
      </td>
      <td className="border-x border-gray-200 pb-2 px-2">
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
      <h2 className="text-sm font-bold pb-2">Tax Summary</h2>
      <table className="w-fit border-x border-gray-200 text-[10px]">
        <thead>
          <tr className="bg-red-400 text-white text-[10px]">
            <th className="border-x border-gray-200 px-2 pb-2">S. No.</th>
            <th className="border-x border-gray-200 px-2 pb-2">Category</th>
            <th className="border-x border-gray-200 px-2 pb-2">HSN Code</th>
            <th className="border-x border-gray-200 px-2 pb-2">Quantity</th>
            <th className="border-x border-gray-200 px-2 pb-2">
              Taxable Amount
            </th>
            <th className="border-x border-gray-200 px-2 pb-2">GST (%)</th>
            <th className="border-x border-gray-200 px-2 pb-2">Tax Amount</th>
            <th className="border-x border-gray-200 px-2 pb-2">Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([customer, details], index) => (
            <tr
              key={index}
              className={`text-center text-[8px] ${index % 2 === 0 ? "bg-white" : "bg-gray-100"
                }`}
            >
              <td className="border-x border-gray-200 px-2 pb-2">
                {index + 1}.
              </td>
              <td className="border-x border-gray-200 px-2 pb-2">{customer}</td>
              <td className="border-x border-gray-200 px-2 pb-2">
                {details.hsn}
              </td>
              <td className="border-x border-gray-200 px-2 pb-2">
                {details.quantity}
              </td>
              <td className="border-x border-gray-200 px-2 pb-2">
                {formatCurrency(details.taxableAmount)}
              </td>
              <td className="border-x border-gray-200 px-2 pb-2">
                {formatPercentage(details.gst)}
              </td>
              <td className="border-x border-gray-200 px-2 pb-2">
                {formatCurrency(details.taxAmount)}
              </td>
              <td className="border-x border-gray-200 px-2 pb-2">
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
