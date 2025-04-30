"use client";

import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import {
  FaPlus,
  FaEdit,
  FaSave,
  FaTrash,
  FaTimes,
  FaBoxOpen,
} from "react-icons/fa";

interface Product {
  name: string;
  price: number;
  quantity: number;
}

interface ProductModalProps {
  onClose: () => void;
  compartmentName: string;
}

const dummyProducts: Product[] = [];

const ProductModal: React.FC<ProductModalProps> = ({
  onClose,
  compartmentName,
}) => {
  const [search, setSearch] = useState("");
  const [addButtonText, setAddButtonText] = useState("Add Product");
  const [products, setProducts] = useState<Product[]>(dummyProducts);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    quantity: 0,
    price: 0,
  });

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedProduct, setEditedProduct] = useState<Product>({
    name: "",
    quantity: 0,
    price: 0,
  });

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddProduct = () => {
    if (!newProduct.name || newProduct.quantity <= 0 || newProduct.price <= 0) {
      alert("Please enter valid product details.");
      return;
    }
    setProducts((prev) => [...prev, newProduct]);
    setNewProduct({ name: "", quantity: 0, price: 0 });
    setShowAddForm(false);
    setAddButtonText("Add Product");
  };

  const handleDelete = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditedProduct(products[index]);
  };

  const handleSaveEdit = () => {
    if (
      !editedProduct.name ||
      editedProduct.quantity <= 0 ||
      editedProduct.price <= 0
    ) {
      alert("Please enter valid product details.");
      return;
    }

    setProducts((prev) =>
      prev.map((p, i) => (i === editingIndex ? editedProduct : p))
    );
    setEditingIndex(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-5xl p-6 relative shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-600 text-2xl hover:text-black"
        >
          <MdClose />
        </button>

        {/* Header */}
        <h2 className="text-3xl font-extrabold mb-1 text-gray-800 flex items-center gap-2">
          <FaBoxOpen className="text-blue-600" />
          Products in <span className="text-blue-600">{compartmentName}</span>
        </h2>
        <p className="text-gray-500 mb-6 italic">
          Browse, search, and manage products inside this compartment.
        </p>

        {/* Search + Add Button */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-full max-w-sm relative">
            <input
              type="text"
              placeholder="Search by product name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-2.5 pl-10 border border-gray-300 rounded-lg shadow-sm text-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>

          <button
            onClick={() => {
              setShowAddForm((prev) => !prev);
              setAddButtonText((prev) =>
                prev === "Add Product" ? "Cancel" : "Add Product"
              );
            }}
            className={`ml-4 px-4 py-2 rounded-xl flex items-center gap-2 transition ${
              addButtonText === "Add Product"
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-red-600 hover:bg-red-700"
            } text-white`}
          >
            {addButtonText === "Add Product" ? (
              <FaPlus className="text-xs" />
            ) : (
              <FaTimes />
            )}
            {addButtonText}
          </button>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <div className="mb-6 border border-gray-200 p-5 pt-4 rounded-2xl bg-white shadow-sm">
            <p className="text-xl font-bold text-gray-800 mb-4">
              Add a New Product{" "}
              <span className="block italic text-sm font-normal text-gray-500">
                Include{" "}
                <span className="font-semibold text-blue-600">
                  product name
                </span>
                , <span className="font-semibold text-blue-600">quantity</span>,
                and <span className="font-semibold text-blue-600">price</span>{" "}
                to update the inventory.
              </span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              {["name", "quantity", "price"].map((field) => (
                <div key={field} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1 capitalize">
                    {field === "name"
                      ? "Product Name"
                      : field === "price"
                      ? "Price (₹)"
                      : "Quantity"}
                  </label>
                  <input
                    type={field === "name" ? "text" : "number"}
                    placeholder={`e.g. ${
                      field === "name"
                        ? "iPhone 15"
                        : field === "price"
                        ? "999"
                        : "25"
                    }`}
                    value={newProduct[field as keyof Product] || ""}
                    onChange={(e) =>
                      setNewProduct((prev) => ({
                        ...prev,
                        [field]:
                          field === "name"
                            ? e.target.value
                            : parseInt(e.target.value),
                      }))
                    }
                    className="px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 shadow-sm placeholder-gray-400 text-sm"
                  />
                </div>
              ))}
              <button
                onClick={handleAddProduct}
                className="h-fit mt-6 text-center w-full mx-auto items-center px-6 py-2 border border-green-500 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600"
              >
                💾 Save Product
              </button>
            </div>
          </div>
        )}

        {/* Product Table */}
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-50 text-sm text-blue-700 uppercase">
              <tr>
                <th className="px-4 py-3">Product Name</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Price (₹)</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-4 py-6 text-center text-gray-500 italic"
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                filtered.map((product, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50 text-sm">
                    {editingIndex === index ? (
                      <>
                        <td className="px-4 py-3">
                          <input
                            value={editedProduct.name}
                            onChange={(e) =>
                              setEditedProduct((prev) => ({
                                ...prev,
                                name: e.target.value,
                              }))
                            }
                            className="border p-2 rounded-lg w-full"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            value={editedProduct.quantity}
                            onChange={(e) =>
                              setEditedProduct((prev) => ({
                                ...prev,
                                quantity: parseInt(e.target.value),
                              }))
                            }
                            className="border p-2 rounded-lg w-full"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            value={editedProduct.price}
                            onChange={(e) =>
                              setEditedProduct((prev) => ({
                                ...prev,
                                price: parseInt(e.target.value),
                              }))
                            }
                            className="border p-2 rounded-lg w-full"
                          />
                        </td>
                        <td className="px-4 py-3 flex gap-2">
                          <button
                            onClick={handleSaveEdit}
                            className="text-green-500 text-xl mt-2 hover:text-green-800"
                          >
                            <FaSave />
                          </button>
                          <button
                            onClick={() => setEditingIndex(null)}
                            className="text-gray-500 text-xl mt-2 hover:text-gray-700"
                          >
                            <FaTimes />
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-3">{product.name}</td>
                        <td className="px-4 py-3">{product.quantity}</td>
                        <td className="px-4 py-3">₹{product.price}</td>
                        <td className="px-4 py-3 flex gap-2">
                          <button
                            onClick={() => handleEdit(index)}
                            className="text-blue-600 text-lg hover:text-blue-800"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(index)}
                            className="text-red-600 text-lg hover:text-red-800"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
