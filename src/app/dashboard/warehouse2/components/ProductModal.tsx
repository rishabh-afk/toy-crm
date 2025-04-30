"use client";

import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { FaTimes } from "react-icons/fa";

import { FaPlus, FaBoxOpen } from "react-icons/fa";

interface Product {
  name: string;
  quantity: number;
  price: number;
}

interface ProductModalProps {
  compartmentName: string;
  onClose: () => void;
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
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl p-6 relative shadow-lg">
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
          Browse, search, and manage products inside this compartment. You can
          also add more products with name, quantity, and price.
        </p>

        {/* Search + Add Toggle */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-full max-w-sm relative">
            <label htmlFor="product-search" className="sr-only">
              Search Products
            </label>
            <input
              id="product-search"
              type="text"
              placeholder="Search by product name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-5 py-2.5 pl-10 border border-gray-300 rounded-lg shadow-sm text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out"
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
            className={`ml-4 px-4 py-2 rounded-md flex items-center gap-2 transition duration-200 ${
              addButtonText === "Add Product"
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {addButtonText === "Add Product" ? (
              <FaPlus className="text-xs" />
            ) : (
              <FaTimes />
            )}{" "}
            {addButtonText}
          </button>
        </div>

        {showAddForm && (
          <div className="mb-6 border border-gray-200 p-4 rounded-2xl bg-white shadow-sm transition-all">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Add New Product
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Product Name */}
              <div className="flex flex-col">
                <label
                  htmlFor="product-name"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Product Name
                </label>
                <input
                  id="product-name"
                  type="text"
                  placeholder="e.g. iPhone 15 Pro"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm placeholder-gray-400 text-sm"
                />
              </div>

              {/* Quantity */}
              <div className="flex flex-col">
                <label
                  htmlFor="product-qty"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Quantity
                </label>
                <input
                  id="product-qty"
                  type="number"
                  placeholder="e.g. 25"
                  value={newProduct.quantity || ""}
                  onChange={(e) =>
                    setNewProduct((prev) => ({
                      ...prev,
                      quantity: parseInt(e.target.value),
                    }))
                  }
                  className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm placeholder-gray-400 text-sm"
                />
              </div>

              {/* Price */}
              <div className="flex flex-col">
                <label
                  htmlFor="product-price"
                  className="text-sm font-medium text-gray-700 mb-1"
                >
                  Price (₹)
                </label>
                <input
                  id="product-price"
                  type="number"
                  placeholder="e.g. 999"
                  value={newProduct.price || ""}
                  onChange={(e) =>
                    setNewProduct((prev) => ({
                      ...prev,
                      price: parseInt(e.target.value),
                    }))
                  }
                  className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm placeholder-gray-400 text-sm"
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleAddProduct}
                className="inline-flex items-center px-6 py-2.5 bg-green-500 text-white rounded-lg font-medium text-sm hover:bg-green-600 transition"
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
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-4 py-6 text-center text-gray-500 italic"
                  >
                    No products found
                  </td>
                </tr>
              ) : (
                filtered.map((product, index) => (
                  <tr
                    key={index}
                    className="border-t hover:bg-gray-50 transition text-sm"
                  >
                    <td className="px-4 py-3">{product.name}</td>
                    <td className="px-4 py-3">{product.quantity}</td>
                    <td className="px-4 py-3">₹{product.price}</td>
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
