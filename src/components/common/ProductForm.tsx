import { useState } from "react";
import { IoAdd, IoTrash } from "react-icons/io5";

interface Item {
  id: number;
  productCode: string;
  description: string;
  uom: string;
  quantity: number;
  listPrice: number;
  value: number;
  discount: number;
  gst: number;
  gstAmount: number;
  totalAmount: number;
  stockInHand: number;
}

const ProductForm = () => {
  const [nextId, setNextId] = useState(1);
  const [items, setItems] = useState<Item[]>([ {
    id: nextId,
    productCode: "",
    description: "",
    uom: "",
    quantity: 0,
    listPrice: 0,
    value: 0,
    discount: 0,
    gst: 0,
    gstAmount: 0,
    totalAmount: 0,
    stockInHand: 0,
  }]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: nextId+1,
        productCode: "",
        description: "",
        uom: "",
        quantity: 0,
        listPrice: 0,
        value: 0,
        discount: 0,
        gst: 0,
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

  const handleChange = (
    id: number,
    field: keyof Item,
    value: string | number
  ) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  return (
    <div className="p-4 pt-2">
      <button
        onClick={addItem}
        className="mb-4 px-2 py-2 bg-primary text-white rounded"
      >
        <IoAdd  />
      </button>
      <div className="overflow-x-auto pb-4  ">
        <div className="flex gap-2 ">
          <div className="min-w-48 py-4 px-2  font-bold">Product Code</div>
          <div className="min-w-48 py-4 px-2  font-bold">Description</div>
          <div className="min-w-48 py-4 px-2  font-bold">UOM</div>
          <div className="min-w-48 py-4 px-2  font-bold">Quantity</div>
          <div className="min-w-48 py-4 px-2  font-bold">List Price</div>
          <div className="min-w-48 py-4 px-2  font-bold">Value</div>
          <div className="min-w-48 py-4 px-2  font-bold">Discount</div>
          <div className="min-w-48 py-4 px-2  font-bold">GST</div>
          <div className="min-w-48 py-4 px-2  font-bold">GST Amount</div>
          <div className="min-w-48 py-4 px-2  font-bold">Total Amount</div>
          <div className="min-w-48 py-4 px-2  font-bold">Stock In Hand</div>
          <div className=" min-w-20 py-4 px-2  font-bold">Actions</div>
        </div>
        <div className="min-w-full ">
          {items.map((item, index) => (
            <div className="row flex gap-1" key={index}>
              <div className="w-50">
                <input
                  type="text"
                  placeholder="Product Code"
                  value={item.productCode}
                  onChange={(e) =>
                    handleChange(item.id, "productCode", e.target.value)
                  }
                  className="p-2 border rounded"
                />
              </div>
              <div className="col-span-2">
                <input
                  type="text"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) =>
                    handleChange(item.id, "description", e.target.value)
                  }
                  className="p-2 border rounded"
                />
              </div>
              <div className="w-50">
                <input
                  type="text"
                  placeholder="UOM"
                  value={item.uom}
                  onChange={(e) => handleChange(item.id, "uom", e.target.value)}
                  className="p-2 border rounded"
                />
              </div>
              <div className="w-50">
                <input
                  type="number"
                  placeholder="Quantity"
                  value={item.quantity}
                  onChange={(e) =>
                    handleChange(item.id, "quantity", Number(e.target.value))
                  }
                  className="p-2 border rounded"
                />
              </div>
              <div className="w-50">
                <input
                  type="number"
                  placeholder="List Price"
                  value={item.listPrice}
                  onChange={(e) =>
                    handleChange(item.id, "listPrice", Number(e.target.value))
                  }
                  className="p-2 border rounded"
                />
              </div>
              <div className="w-50">
                <input
                  type="number"
                  placeholder="Value"
                  value={item.value}
                  onChange={(e) =>
                    handleChange(item.id, "value", Number(e.target.value))
                  }
                  className="p-2 border rounded"
                />
              </div>
              <div className="w-50">
                <input
                  type="number"
                  placeholder="Discount"
                  value={item.discount}
                  onChange={(e) =>
                    handleChange(item.id, "discount", Number(e.target.value))
                  }
                  className="p-2 border rounded"
                />
              </div>
              <div className="w-50">
                <input
                  type="number"
                  placeholder="GST"
                  value={item.gst}
                  onChange={(e) =>
                    handleChange(item.id, "gst", Number(e.target.value))
                  }
                  className="p-2 border rounded"
                />
              </div>
              <div className="w-50">
                <input
                  type="number"
                  placeholder="GST Amount"
                  value={item.gstAmount}
                  onChange={(e) =>
                    handleChange(item.id, "gstAmount", Number(e.target.value))
                  }
                  className="p-2 border rounded"
                />
              </div>
              <div className="w-50">
                <input
                  type="number"
                  placeholder="Total Amount"
                  value={item.totalAmount}
                  onChange={(e) =>
                    handleChange(item.id, "totalAmount", Number(e.target.value))
                  }
                  className="p-2 border rounded"
                />
              </div>
              <div className="w-50">
                <input
                  type="number"
                  placeholder="Stock In Hand"
                  value={item.stockInHand}
                  onChange={(e) =>
                    handleChange(item.id, "stockInHand", Number(e.target.value))
                  }
                  className="p-2 border rounded"
                />
              </div>
              <div className="w-50 mx-5 flex justify-center items-center">
                <button
                  onClick={() => deleteItem(item.id)}
                  className="px-4 py-2 m-auto bg-red-500 text-white rounded"
                >
                  <IoTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
