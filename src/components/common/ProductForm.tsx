import { Fetch } from "@/hooks/apiUtils";
import { useEffect, useState } from "react";

const ProductForm = ({ onProductDataChange }: { onProductDataChange: any }) => {
  const emptyProduct = {
    uom: "",
    cgst: 0,
    sgst: 0,
    igst: 0,
    value: 0,
    quantity: 0,
    discount: 0,
    gstAmount: 0,
    listPrice: 0,
    totalAmount: 0,
    stockInHand: 0,
    productCode: "",
    discountAmount: 0,
  };
  const [nextId, setNextId] = useState(2);
  const [products, setProducts] = useState<any>([]);
  const [items, setItems] = useState<any>([{ ...emptyProduct, id: 1 }]);

  const addItem = () => {
    setItems([...items, { id: nextId, ...emptyProduct }]);
    setNextId(nextId + 1);
  };

  const deleteItem = (id: number) => {
    const updatedItems = items.filter((item: any) => item.id !== id);
    setItems(updatedItems);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = "/api/product/public";
        const response: any = await Fetch(url, {}, 5000, true, false);
        if (response.success) setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
  }, []);

  const getUpdatedCalculated = (data: any) => {
    const gstAmount =
      (((data.cgst || 0) + (data.sgst || 0)) *
        (data.quantity || 1) *
        (data.listPrice || 0)) /
      100;

    const discountAmount =
      ((data.discount || 0) * (data.quantity || 1) * (data.listPrice || 0)) /
      100;

    const taxableAmount =
      (data.listPrice || 0) * (data.quantity || 1) - discountAmount;

    const value = (data.listPrice || 0) * (data.quantity || 1);
    const totalAmount = taxableAmount + gstAmount;

    return {
      itemsData: {
        ...data,
        value: value.toFixed(2),
        gstAmount: gstAmount.toFixed(2),
        discountAmount: discountAmount.toFixed(2),
        taxableAmount: taxableAmount.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
      },
      calculations: {
        gstAmount,
        discountAmount,
        taxableAmount,
        totalAmount,
      },
    };
  };

  const handleProductChange = (rowId: number, productCode: string) => {
    const selectedProduct = products.find(
      (product: any) => product.productCode === productCode
    );

    if (selectedProduct) {
      const data = {
        value: 0,
        id: rowId,
        quantity: 1,
        discount: 0,
        gstAmount: 0,
        totalAmount: 0,
        taxableAmount: 0,
        discountAmount: 0,
        uom: selectedProduct?.uom ?? "",
        cgst: selectedProduct?.cgst ?? 0,
        sgst: selectedProduct?.sgst ?? 0,
        igst: selectedProduct?.igst ?? 0,
        listPrice: selectedProduct?.ourPrice ?? 0,
        stockInHand: selectedProduct?.stockInhand ?? 0,
        productCode: selectedProduct?.productCode ?? "",
      };

      const calculated = getUpdatedCalculated(data);

      setItems((prevItems: any[]) => {
        const existingItemIndex = prevItems.findIndex(
          (item: any) => item.id === rowId // Match by rowId
        );

        if (existingItemIndex !== -1) {
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            ...calculated.itemsData,
          };
          return updatedItems;
        } else return [...prevItems, calculated.itemsData];
      });
    }
  };

  const handleChange = (id: number, field: any, value: string | number) => {
    const updatedItems = items.map((item: any) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    const targetItem = updatedItems.find((item: any) => item.id === id);
    if (targetItem) {
      const calculated = getUpdatedCalculated(targetItem);

      setItems((prevItems: any[]) => {
        const existingItemIndex = prevItems.findIndex(
          (item: any) => item.id === id
        );

        let updatedItems;
        if (existingItemIndex !== -1) {
          updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            ...calculated.itemsData,
          };
        } else updatedItems = [...prevItems, calculated.itemsData];
        const data = calculatedFinal(updatedItems);
        onProductDataChange(data);
        return updatedItems;
      });
    }
  };

  const calculatedFinal = (items: any) => {
    const final = {
      netAmount: 0,
      totalValue: 0,
      igstAmount: 0,
      cgstAmount: 0,
      sgstAmount: 0,
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
      const cgst = parseFloat(item.cgst) || 0;
      const sgst = parseFloat(item.sgst) || 0;

      // Calculate the totals
      final.totalQuantity += quantity;
      final.totalValue += value;
      final.discountAmount += discountAmount;
      final.taxableAmount += taxableAmount;
      final.netAmount += totalAmount;

      if (cgst && taxableAmount > 0) {
        final.cgstAmount += (taxableAmount * cgst) / 100;
      }
      if (sgst && taxableAmount > 0) {
        final.sgstAmount += (taxableAmount * sgst) / 100;
      }
      if (cgst && sgst) {
        final.igstAmount = final.cgstAmount + final.sgstAmount;
      }
    });
    return final;
  };

  return (
    <div className="">
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-2xl font-extrabold uppercase text-primary">
            Select Product
          </p>
        </div>
        <button
          type="button"
          onClick={addItem}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          + Add Product
        </button>
      </div>
      <div className="overflow-x-auto no-scrollbar">
        <table className="table-auto border-collapse whitespace-nowrap border border-gray-300">
          <thead>
            <tr className="bg-primary text-white text-left">
              {[
                "Product Code",
                "UOM",
                "List Price",
                "Stock In Hand",
                "Quantity",
                "Value",
                "Discount (%)",
                "Discount Amt.",
                "Taxable Amt.",
                "IGST",
                "CGST",
                "SGST",
                "GST Amount",
                "Total Amount",
                "Actions",
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
            {items.map((item: any, index: number) => {
              return (
                <tr key={index} className="odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300">
                    <select
                      value={item.productCode || ""}
                      onChange={(e) =>
                        handleProductChange(item.id, e.target.value)
                      }
                      className="w-40 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      <option value="">--Select Product--</option>
                      {products.map((product: any, index: number) => (
                        <option key={index} value={product.productCode}>
                          {product.name} ({product.productCode})
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="border min-w-20 border-gray-300 p-2">
                    {item.uom}
                  </td>
                  <td className="border min-w-20 border-gray-300 p-2">
                    {item.listPrice ? "₹ " + item.listPrice : 0}
                  </td>
                  <td className="border min-w-20 border-gray-300 p-2">
                    {item.stockInHand}
                  </td>
                  <td className="border border-gray-300">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity || ""}
                      onChange={(e) => {
                        handleChange(
                          item.id,
                          "quantity",
                          Number(e.target.value)
                        );
                      }}
                      className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </td>

                  <td className="border min-w-20 p-2 border-gray-300">
                    {item.value}
                  </td>
                  <td className="border border-gray-300">
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
                      className="w-full p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                  <td className="border min-w-20 border-gray-300 p-2">
                    {item.discountAmount}
                  </td>
                  <td className="border min-w-20 border-gray-300 p-2">
                    {item.taxableAmount}
                  </td>
                  <td className="border min-w-20 border-gray-300 p-2">
                    {item.igst} %
                  </td>
                  <td className="border min-w-20 border-gray-300 p-2">
                    {item.cgst} %
                  </td>
                  <td className="border min-w-20 border-gray-300 p-2">
                    {item.sgst} %
                  </td>
                  <td className="border min-w-20 border-gray-300 p-2">
                    {item.gstAmount}
                  </td>
                  <td className="border min-w-20 border-gray-300 p-2">
                    {item.totalAmount}
                  </td>
                  <td className="border border-gray-300 text-center">
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
