import { useState } from "react";

interface Item {
  id: number;
  productCode: string;
  uom: string;
  quantity: number;
  listPrice: number;
  value: number;
  discount: number;
  discountAmount: number;
  cGst: number;
  sGst: number;
  iGst: number;
  gstAmount: number;
  totalAmount: number;
  stockInHand: number;
}

const ProductForm =({ onItemsChange }: { onItemsChange: (items: Item[]) => void })  => {
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      productCode: "",
      uom: "",
      quantity: 0,
      listPrice: 0,
      value: 0,
      discount: 0,
      discountAmount: 0,
      cGst: 0,
      sGst: 0,
      iGst: 0,
      gstAmount: 0,
      totalAmount: 0,
      stockInHand: 0,
    },
  ]);
  const [nextId, setNextId] = useState(2);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: nextId,
        productCode: "",
        uom: "",
        quantity: 0,
        listPrice: 0,
        value: 0,
        discount: 0,
        discountAmount: 0,
        cGst: 0,
        sGst: 0,
        iGst: 0,
        gstAmount: 0,
        totalAmount: 0,
        stockInHand: 0,
      },
    ]);
    setNextId(nextId + 1);
  };

  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };



  const handleCalculation = (
    id: number,
    quantity: number,
    price: number,
    discount: number,
    cGst: number,
    sGst: number,
    iGst: number
  ) => {
    const total = price * quantity;
    const discountPrice = parseFloat(((discount / 100) * total).toFixed(2));
    const gstAmountCalc =
      ((cGst + sGst + iGst) * (total - discountPrice)) / 100;
    const finalTotal = (total - discountPrice + gstAmountCalc);

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              value: total,
              discountAmount: discountPrice,
              gstAmount: gstAmountCalc,
              totalAmount: finalTotal,
            }
          : item
      )
    );
    console.log(items)
  };

  const handleChange = (
    id: number,
    field: keyof Item,
    value: string | number
  ) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );

    // Trigger recalculations when dependent fields are updated
    const targetItem = items.find((item) => item.id === id);
    if (targetItem) {
      const updatedItem = { ...targetItem, [field]: value };
      handleCalculation(
        id,
        field === "quantity" ? Number(value) : updatedItem.quantity,
        field === "listPrice" ? Number(value) : updatedItem.listPrice,
        field === "discount" ? Number(value) : updatedItem.discount,
        field === "cGst" ? Number(value) : updatedItem.cGst,
        field === "sGst" ? Number(value) : updatedItem.sGst,
        field === "iGst" ? Number(value) : updatedItem.iGst
      );
    }
    onItemsChange(items); // Notify parent component
  };

  // const handleSubmit = () => {
  //   onSubmit(items);
  // };

  return (
    <div className="">
      <button
        type="button"
        onClick={addItem}
        className="mb-6 px-6 py-2 flex w-fit justify-end ml-auto bg-primary text-white rounded-md"
      >
        + Add Item
      </button>
      <div className="overflow-x-auto no-scrollbar">
        <table className="table-auto w-20 border-collapse whitespace-nowrap border border-gray-300">
          <thead>
            <tr className="bg-primary text-white text-left">
              {[
                "Product Code",
                "UOM",
                "Quantity",
                "List Price",
                "Value",
                "Discount",
                "Discount Amount",
                "CGST",
                "SGST",
                "IGST",
                "GST Amount",
                "Total Amount",
                "Stock In Hand",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-1 w-auto py-2 border border-gray-300 text-sm font-medium"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              return (
                <tr key={item.id} className="odd:bg-white even:bg-gray-50">
                  <td className="p-2 border border-gray-300">
                    <input
                      type="text"
                      value={item.productCode}
                      onChange={(e) => handleChange(item.id, "productCode", e.target.value)}
                      className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="text"
                      value={item.uom}
                      onChange={(e) => handleChange(item.id, "uom", e.target.value)}
                      className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        handleChange(item.id, "quantity", Number(e.target.value));
                      } }
                      className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="number"
                      value={item.listPrice}
                      onChange={(e) => {
                        handleChange(
                          item.id,
                          "listPrice",
                          Number(e.target.value)
                        );
                      } }
                      className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="number"
                      value={item.value}
                      disabled
                      onChange={(e) => {
                        handleChange(item.id, "value", Number(e.target.value));
                      } }
                      className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="number"
                      value={item.discount}
                      onChange={(e) => {
                        handleChange(item.id, "discount", Number(e.target.value));
                      } }
                      className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="number"
                      value={item.discountAmount}
                      disabled
                      onChange={() => {
                        handleChange(
                          item.id,
                          "discountAmount",
                          Number(item.value)
                        );
                      } }
                      className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="number"
                      value={item.cGst}
                      disabled
                      onChange={(e) => {
                        handleChange(item.id, "cGst", Number(e.target.value));
                      } }
                      className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="number"
                      value={item.sGst}
                      disabled
                      onChange={(e) => {
                        handleChange(item.id, "sGst", Number(e.target.value));
                      } }
                      className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="number"
                      value={item.iGst}
                      disabled
                      onChange={(e) => {
                        handleChange(item.id, "iGst", Number(e.target.value));
                      } }
                      className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="number"
                      value={item.gstAmount}
                      disabled
                      onChange={(e) => {
                        handleChange(
                          item.id,
                          "gstAmount",
                          Number(e.target.value)
                        );
                      } }
                      className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="number"
                      value={item.totalAmount}
                      disabled
                      onChange={(e) => handleChange(
                        item.id,
                        "totalAmount",
                        Number(e.target.value)
                      )}
                      className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="number"
                      value={item.stockInHand}
                      onChange={(e) => {
                        handleCalculation(
                          item.id,
                          item.quantity,
                          item.listPrice,
                          item.discount,
                          item.cGst,
                          item.sGst,
                          item.iGst
                        );
                        handleChange(
                          item.id,
                          "stockInHand",
                          Number(e.target.value)
                        );
                      } }
                      className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
                  </td>
                  <td className="p-2 border border-gray-300 text-center">
                    <button
                      onClick={() => deleteItem(item.id)}
                      type="button"
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
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

export default ProductForm;
