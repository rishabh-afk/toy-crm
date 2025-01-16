import { Fetch } from "@/hooks/apiUtils";
import { useEffect, useState } from "react";

interface Item {
  id: number;
  productCode: string;
  uom: string;
  quantity: number;
  listPrice: number;
  value: number;
  discount: number;
  discountAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  gstAmount: number;
  totalAmount: number;
  stockInHand: number;
}

interface ConsolidatedData {
  items: Item[];
  totals: {
    cgst: number;
    sgst: number;
    igst: number;
    totalQuantity: number;
    totalValue: number;
    taxableAmount: number;
    totalDiscountAmount: number;
    totalGstAmount: number;
    totalAmount: number;
  };
}

const ProductForm = ({
  onProductDataChange,
}: {
  onProductDataChange: (data: ConsolidatedData) => void;
}) => {
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
      cgst: 0,
      sgst: 0,
      igst: 0,
      gstAmount: 0,
      totalAmount: 0,
      stockInHand: 0,
    },
  ]);
  const [nextId, setNextId] = useState(2);
  const [products, setProducts] = useState<Item[]>([]);
  const [withoutGst, setWithoutGst] = useState(false);

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
        cgst: 0,
        sgst: 0,
        igst: 0,
        gstAmount: 0,
        totalAmount: 0,
        stockInHand: 0,
      },
    ]);
    setNextId(nextId + 1);
  };

  const deleteItem = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    updateParentData(updatedItems); // Notify parent after deletion
  };


  const handleCalculation = (
    id: number,
    quantity: number,
    price: number,
    discount: number,
    cgst: number,
    sgst: number,
    igst: number
  ) => {
    const total = price * quantity;
    const discountPrice = parseFloat(((discount / 100) * total).toFixed(2));

    let gstAmountCalc = 0;
    let finalTotal = total - discountPrice;

    if (!withoutGst) {
      gstAmountCalc = ((cgst + sgst + igst) * (total - discountPrice)) / 100;
      finalTotal += gstAmountCalc;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              value: total,
              discountAmount: discountPrice,
              gstAmount: withoutGst ? 0 : gstAmountCalc,
              totalAmount: finalTotal,
              cgst: withoutGst ? 0 : cgst,
              sgst: withoutGst ? 0 : sgst,
              igst: withoutGst ? 0 : igst,
            }
          : item
      )
    );

  };

  useEffect(() => {
    // Fetch product data on component mount
    const fetchProducts = async () => {
      try {
        const response: any = await Fetch("/api/product/public");
        const data = await response.data;
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleProductChange = (id: number, productCode: string) => {
    const selectedProduct = products.find(
      (product) => product.productCode === productCode
    );
    if (selectedProduct) {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id
            ? {
                ...item,
                productCode: selectedProduct.productCode,
                uom: selectedProduct.uom,
                listPrice: selectedProduct.listPrice,
                discount: selectedProduct.discount,
                cgst: withoutGst ? 0 : selectedProduct.cgst | 0,
                sgst: withoutGst ? 0 : selectedProduct.sgst | 0,
                igst: withoutGst ? 0 : selectedProduct.igst | 0,
                stockInHand: selectedProduct.stockInHand,
              }
            : item
        )
      );
    }

    console.log(items);
  };

  const handleChange = (
    id: number,
    field: keyof Item,
    value: string | number
  ) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );

    setItems(updatedItems);

    const targetItem = updatedItems.find((item) => item.id === id);
    if (targetItem) {
      handleCalculation(
        id,
        field === "quantity" ? Number(value) : targetItem.quantity,
        field === "listPrice" ? Number(value) : targetItem.listPrice,
        field === "discount" ? Number(value) : targetItem.discount,
        field === "cgst" ? Number(value) : targetItem.cgst,
        field === "sgst" ? Number(value) : targetItem.sgst,
        field === "igst" ? Number(value) : targetItem.igst
      );
    }

    updateParentData(updatedItems); // Notify parent with updated data
  };

  const calculateTotals = (items: Item[]) => {
    return items.reduce(
      (acc, item) => {
        acc.totalValue += item.value || 0;
        acc.totalDiscountAmount += item.discountAmount || 0;
        acc.totalGstAmount += item.gstAmount || 0;
        acc.totalAmount += item.totalAmount || 0;
        acc.totalQuantity += item.quantity || 0;

        // Add CGST, SGST, and IGST calculations (if applicable)
        acc.cgst += item.cgst * ((item.value - item.discountAmount) / 100) || 0;
        acc.sgst += item.sgst * ((item.value - item.discountAmount) / 100) || 0;
        acc.igst += item.igst * ((item.value - item.discountAmount) / 100) || 0;
        acc.taxableAmount += (item.value-item.discountAmount) || 0;
        return acc;
      },
      {
        cgst: 0,
        sgst: 0,
        igst: 0,
        totalQuantity: 0,
        totalValue: 0,
        totalDiscountAmount: 0,
        totalGstAmount: 0,
        totalAmount: 0,
        taxableAmount:0
      }
    );
  };

  const updateParentData = (updatedItems: Item[]) => {
    const totals = calculateTotals(updatedItems);
    const consolidatedData: ConsolidatedData = {
      items: updatedItems,
      totals,
    };
    onProductDataChange(consolidatedData); // Send consolidated data to parent
    console.log(consolidatedData);
  };

  // const handleSubmit = () => {
  //   onSubmit(items);
  // };

  return (
    <div className="">
      <div className="m-0">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={withoutGst}
            onChange={(e) => setWithoutGst(e.target.checked)}
            className="mr-2"
          />
          Without GST
        </label>
      </div>
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
                "cgst",
                "sgst",
                "igst",
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
                    <select
                      value={item.productCode || ""}
                      onChange={(e) =>
                        handleProductChange(item.id, e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value={""} disabled>
                        Select Product
                      </option>
                      {products.map((product, index) => (
                        <option key={index} value={product.productCode || ""}>
                          {product.productCode}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="text"
                      value={item.uom || ""}
                      onChange={(e) =>
                        handleChange(item.id, "uom", e.target.value)
                      }
                      className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="number"
                      value={item.quantity || ""}
                      onChange={(e) => {
                        handleChange(
                          item.id,
                          "quantity",
                          Number(e.target.value)
                        );
                      }}
                      className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="number"
                      value={item.listPrice || ""}
                      onChange={(e) => {
                        handleChange(
                          item.id,
                          "listPrice",
                          Number(e.target.value)
                        );
                      }}
                      className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="number"
                      value={item.value || ""}
                      // disabled
                      onChange={(e) => {
                        handleChange(item.id, "value", Number(e.target.value));
                      }}
                      className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="number"
                      value={item.discount || ""}
                      onChange={(e) => {
                        handleChange(
                          item.id,
                          "discount",
                          Number(e.target.value)
                        );
                      }}
                      className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="number"
                      value={item.discountAmount || ""}
                      // disabled
                      onChange={() => {
                        handleChange(
                          item.id,
                          "discountAmount",
                          Number(item.value)
                        );
                      }}
                      className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="number"
                      value={item.cgst || ""}
                      // disabled
                      onChange={(e) => {
                        handleChange(item.id, "cgst", Number(e.target.value));
                      }}
                      className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="number"
                      value={item.sgst || ""}
                      // disabled
                      onChange={(e) => {
                        handleChange(item.id, "sgst", Number(e.target.value));
                      }}
                      className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="number"
                      value={item.igst || ""}
                      // disabled
                      onChange={(e) => {
                        handleChange(item.id, "igst", Number(e.target.value));
                      }}
                      className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="number"
                      value={item.gstAmount || ""}
                      // disabled
                      onChange={(e) => {
                        handleChange(
                          item.id,
                          "gstAmount",
                          Number(e.target.value)
                        );
                      }}
                      className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="number"
                      value={item.totalAmount || ""}
                      // disabled
                      onChange={(e) =>
                        handleChange(
                          item.id,
                          "totalAmount",
                          Number(e.target.value)
                        )
                      }
                      className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                  <td className="p-2 border border-gray-300">
                    <input
                      type="number"
                      value={item.stockInHand || ""}
                      onChange={(e) => {
                        handleCalculation(
                          item.id,
                          item.quantity,
                          item.listPrice,
                          item.discount,
                          item.cgst,
                          item.sgst,
                          item.igst
                        );
                        handleChange(
                          item.id,
                          "stockInHand",
                          Number(e.target.value)
                        );
                      }}
                      className="w-20 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
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
