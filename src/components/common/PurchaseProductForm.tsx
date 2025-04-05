import { toast } from "react-toastify";
import { Fetch } from "@/hooks/apiUtils";
import { debounce } from "@/hooks/general";
import ProductSelect from "./ProductSelect";
import { useCallback, useEffect, useMemo, useState } from "react";

const PurchaseProductForm = ({
  initialData,
  onProductDataChange,
}: {
  initialData: any;
  onProductDataChange: any;
}) => {
  const emptyProduct = {
    _id: "",
    uom: "",
    cgst: 0,
    sgst: 0,
    gst: 0,
    value: 0,
    quantity: 0,
    gstAmount: 0,
    listPrice: 0,
    totalAmount: 0,
    stockInHand: 0,
    productCode: "",
    discountAmount: 0,
    discountPercentage: 0,
  };
  const [nextId, setNextId] = useState(2);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<any>([]);
  const [items, setItems] = useState<any>(
    initialData && initialData.length > 0 ? initialData : [emptyProduct]
  );

  const addItem = () => {
    const newItems = [...items, { id: nextId, ...emptyProduct }];
    setItems(newItems);
    setNextId(nextId + 1);
  };

  const updateStockInHand = (shortArray: any[], longArray: any[]) => {
    const updatedArray = shortArray.map((shortItem) => {
      const matchedItem = longArray.find(
        (longItem) => longItem._id === shortItem.product
      );
      if (matchedItem)
        return { ...shortItem, stockInHand: matchedItem.stockInHand };
      return shortItem;
    });
    return updatedArray;
  };

  const fetchProducts = useCallback(async (searchTerm: string) => {
    try {
      setLoading(true);
      const url = "/api/product/search";
      const param = { search: searchTerm };
      const response: any = await Fetch(url, param, 5000, true, false);
      if (response.success) setProducts(response?.data || []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const debouncedFetchProducts = useMemo(
    () => debounce((search: string) => fetchProducts(search), 1000),
    [fetchProducts]
  );


  useEffect(() => {
    if (searchTerm) {
      setProducts([]);
      debouncedFetchProducts(searchTerm);
    }
    // eslint-disable-next-line
  }, [searchTerm]);

  const deleteItem = (id: number) => {
    const updatedItems = items.filter((item: any) => item.id !== id);
    setItems(updatedItems);
    const data = calculatedFinal(updatedItems);
    onProductDataChange(data, updatedItems);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = "/api/product/public";
        const response: any = await Fetch(url, {}, 5000, true, false);
        if (response.success) {
          setProducts(response.data);
          if (initialData && initialData.length > 0) {
            const data = updateStockInHand(initialData, response.data);
            setItems(data);
          } else setItems([{ ...emptyProduct, id: 1 }]);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };
    fetchProducts();
    // eslint-disable-next-line
  }, [initialData.length]);

  const getUpdatedCalculated = (data: any) => {
    const gstAmount =
      ((data.gst || 0) * (data.quantity || 1) * (data.listPrice || 0)) / 100;

    const discountAmount =
      ((data.discountPercentage || 0) *
        (data.quantity || 1) *
        (data.listPrice || 0)) /
      100;

    const taxableAmount =
      (data.listPrice || 0) * (data.quantity || 1) - discountAmount;

    const value = (data.listPrice || 0) * (data.quantity || 1);
    const totalAmount = taxableAmount + gstAmount;

    return {
      ...data,
      value: value.toFixed(2),
      gstAmount: gstAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      taxableAmount: taxableAmount.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
    };
  };

  const handleProductChange = (product: any) => {
    setItems((prevItems: any[]) => {
      const existingItemIndex = prevItems.findIndex(
        (item: any) => item.productCode === product.productCode
      );

      if (existingItemIndex !== -1) {
        toast.info("Product already selected!");
        return prevItems;
      }
      const emptyItemIndex = prevItems.findIndex(
        (item: any) => !item.productCode
      );

      const newProduct = {
        value: 0,
        quantity: 1,
        gstAmount: 0,
        totalAmount: 0,
        taxableAmount: 0,
        id: product?._id,
        _id: product?._id,
        discountAmount: 0,
        name: product.name,
        discountPercentage: 0,
        product: product?._id,
        gst: product?.gst ?? 0,
        uom: product?.uom ?? "",
        listPrice: product?.ourPrice ?? 0,
        stockInHand: product?.stockInHand ?? 0,
        productCode: product?.productCode ?? "",
      };

      const calculated = getUpdatedCalculated(newProduct);
      const finalCalculated = { ...newProduct, ...calculated };

      if (emptyItemIndex !== -1) {
        const updatedItems = [...prevItems];
        updatedItems[emptyItemIndex] = finalCalculated;
        const data = calculatedFinal(updatedItems);
        onProductDataChange(data, updatedItems);
        return updatedItems;
      }
      const updated = [...prevItems, finalCalculated];
      const data = calculatedFinal(updated);
      onProductDataChange(data, updated);
      return updated;
    });
  };

  useEffect(() => {
    if (items.length > 0 && items[items.length - 1]?.productCode) {
      const data = calculatedFinal(items);
      onProductDataChange(data, items);
      addItem();
    }
    // eslint-disable-next-line
  }, [items]);

  const handleChange = (id: number, field: any, value: string | number) => {
    const updatedItems = items.map((item: any) =>
      item._id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    const targetItem = updatedItems.find((item: any) => item._id === id);
    if (targetItem) {
      const calculated = getUpdatedCalculated(targetItem);

      setItems((prevItems: any[]) => {
        const existingItemIndex = prevItems.findIndex(
          (item: any) => item._id === id
        );

        let updatedItems;
        if (existingItemIndex !== -1) {
          updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            ...calculated,
          };
        } else updatedItems = [...prevItems, calculated];
        const data = calculatedFinal(updatedItems);
        onProductDataChange(data, updatedItems);
        return updatedItems;
      });
    }
  };

  const calculatedFinal = (items: any) => {
    const final = {
      netAmount: 0,
      totalValue: 0,
      gstAmount: 0,
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
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-2xl font-extrabold uppercase text-primary">
            Select Product
          </p>
        </div>
        {/* <button
          type="button"
          onClick={addItem}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          + Add Product
        </button> */}
      </div>
      <ProductSelect
        loading={loading}
        searchTerm={searchTerm}
        filteredProducts={products}
        setSearchTerm={setSearchTerm}
        handleProductChange={handleProductChange}
      />
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
                <tr
                  key={index}
                  className="odd:bg-white text-black even:bg-gray-50"
                >
                  <td className="border border-gray-300">
                    <p className="px-2">
                      {item.name} {item.productCode && `(${item.productCode})`} {!item?.name && !item.productCode && <span className="text-gray-400">Select a Product</span>}
                    </p>
                  </td>
                  <td className="border min-w-20 border-gray-300 p-2">
                    {item.uom}
                  </td>
                  <td className="border min-w-20 border-gray-300 p-2">
                    {item.listPrice ? "₹ " + item.listPrice : 0}
                  </td>
                  <td className="border border-gray-300">
                    <input
                      type="number"
                      min={1} // Minimum value is 1
                      value={item.quantity || ""}
                      placeholder="Qty"
                      onChange={(e) => {
                        debounce(
                          handleChange(
                            item._id,
                            "quantity",
                            Number(e.target.value)
                          ),
                          1000
                        );
                      }}
                      className="w-full p-2 focus:outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                  <td className="border min-w-20 p-2 border-gray-300">
                    {item.value}
                  </td>
                  <td className="border border-gray-300">
                    <input
                      type="number"
                      min={0}
                      max={100} // Set the maximum value as 100
                      value={item.discountPercentage || ""}
                      placeholder="dis. (%)"
                      onChange={(e) => {
                        const enteredValue = Number(e.target.value);
                        const validatedValue = Math.min(enteredValue, 100); // Limit the value to 100
                        debounce(
                          handleChange(
                            item._id,
                            "discountPercentage",
                            validatedValue
                          ),
                          500
                        );
                      }}
                      className="w-full p-2 focus:outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-blue-400"
                    />
                  </td>
                  <td className="border min-w-20 border-gray-300 p-2">
                    {item.discountAmount}
                  </td>
                  <td className="border min-w-20 border-gray-300 p-2">
                    {item.taxableAmount}
                  </td>
                  <td className="border min-w-20 border-gray-300 p-2">
                    {item.gst} %
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
                      className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700"
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

export default PurchaseProductForm;
