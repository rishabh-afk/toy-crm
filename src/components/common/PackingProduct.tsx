import { useEffect, useState } from "react";

interface Item {
  id: number;
  isPacked: boolean;
  quantity?: number;
  productUOM: string;
  productCode: string;
  productName: string;
  maxQuantity?: number;
  packedQuantity: number;
  productQuantity: number;
}

const PackingProduct = ({
  customFunc,
  initialData,
}: {
  customFunc: any;
  initialData: any[];
}) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    setItems(
      initialData.map((data) => ({
        id: data?.product ?? "",
        _id: data?.product ?? "",
        productUOM: data?.uom ?? "",
        quantity: data?.quantity ?? 0,
        productName: data?.name ?? "",
        isPacked: data?.isPacked ?? false,
        maxQuantity: data?.maxQuantity ?? 0,
        productCode: data?.productCode ?? "",
        productQuantity: data?.quantity ?? 0,
        packedQuantity: data?.packedQuantity ?? 0,
      }))
    );
    // customFunc(items);
  }, [initialData]);

  // useEffect(() => {
  //   customFunc(items);
  //   // eslint-disable-next-line
  // }, []);

  const handleChange = (
    id: number,
    field: keyof Item,
    value: string | number
  ) => {
    const updatedItems = items.map((item: any) =>
      item._id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    customFunc(updatedItems);
  };

  return (
    <div className="">
      <div className="overflow-x-auto no-scrollbar">
        <table className="table-auto text-center min-w-full border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-primary text-center text-white">
              {[
                "S. No.",
                "Product Name",
                "Product Code",
                "UOM",
                "Max. Quantity",
                "Packed Quantity",
              ].map((header) => (
                <th
                  key={header}
                  className="p-2 border border-t-0 border-gray-200 text-sm font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item: any, index: number) => (
              <tr
                key={index}
                className="odd:bg-white text-black text-sm even:bg-gray-50"
              >
                <td className="border px-2 bg-gray-50 border-gray-300">
                  {index + 1}.
                </td>
                <td className="border px-2 bg-gray-50 border-gray-300">
                  {item?.productName ? item?.productName : "-"}
                </td>
                <td className="border px-2 bg-gray-50 border-gray-300">
                  {item?.productCode ? item?.productCode : "-"}
                </td>
                <td className="border px-2 bg-gray-50 border-gray-300">
                  {item?.productUOM ? item?.productUOM : "-"}
                </td>
                <td className="border px-2 bg-gray-50 border-gray-300">
                  {item?.maxQuantity ? item?.maxQuantity : "-"}
                </td>
                <td className="border w-20">
                  <input
                    min={0}
                    type="number"
                    value={item.quantity}
                    max={item.maxQuantity}
                    disabled={item.isPacked}
                    onChange={(e) => {
                      const value =
                        e.target.value === "" ? 0 : Number(e.target.value);
                      if (
                        !isNaN(value) &&
                        value >= 0 &&
                        value <= item?.maxQuantity
                      ) {
                        handleChange(item._id, "quantity", value);
                      }
                    }}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    autoFocus={index + 1 === 1}
                    aria-label={`Enter quantity for ${item.productCode}`}
                    className="w-full p-2 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PackingProduct;
