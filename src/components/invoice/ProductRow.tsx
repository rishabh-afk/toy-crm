"use client";

import { useState } from 'react';

const ProductRow = () => {
  const [products, setProducts] = useState([
    { name: '', description: '', quantity: 1, price: '', total: 0 },
  ]);

  const handleAddProduct = () => {
    setProducts([
      ...products,
      { name: '', description: '', quantity: 1, price: '', total: 0 },
    ]);
  };

  const handleRemoveProduct = (index: number) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  const handleChange = (index: number, field: string, value: string | number) => {
    const updatedProducts = products.map((product, i) => {
      if (i === index) {
        const updatedProduct = { ...product, [field]: value };
        if (field === 'quantity' || field === 'price') {
          const quantity = field === 'quantity' ? value : product.quantity;
          const price = field === 'price' ? value : product.price;
          updatedProduct.total = Number(quantity) * Number(price);
        }
        return updatedProduct;
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  return (
    <div className="mt-6">
      <table className="table-auto w-full border-collapse border rounded border-gray-100">
        <thead className='border-gray-100'>
          <tr className="bg-white">
            <th className="border p-2 font-semibold">Product Name</th>
            <th className="border p-2 font-semibold">Description</th>
            <th className="border p-2 font-semibold">Quantity</th>
            <th className="border p-2 font-semibold">Price Per Unit</th>
            <th className="border p-2 font-semibold">Total</th>
            <th className="border p-2 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className='border-gray-100'>
          {products.map((product, index) => (
            <tr key={index}>
              <td className="border p-2">
                <input
                  type="text"
                  className="w-full p-1 border rounded"
                  placeholder="Enter Product"
                  value={product.name}
                  onChange={(e) =>
                    handleChange(index, 'name', e.target.value)
                  }
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  className="w-full p-1 border rounded"
                  placeholder="Enter Description"
                  value={product.description}
                  onChange={(e) =>
                    handleChange(index, 'description', e.target.value)
                  }
                />
              </td>
              <td className="border p-2 flex items-center gap-1">
                <button
                  className="p-1 bg-gray-200 rounded"
                  onClick={() =>
                    handleChange(
                      index,
                      'quantity',
                      Math.max(1, product.quantity - 1)
                    )
                  }
                >
                  -
                </button>
                <input
                  type="number"
                  className="w-16 p-1 text-center border rounded"
                  value={product.quantity}
                  min={1}
                  onChange={(e) =>
                    handleChange(
                      index,
                      'quantity',
                      Math.max(1, parseInt(e.target.value))
                    )
                  }
                />
                <button
                  className="p-1 bg-gray-200 rounded"
                  onClick={() =>
                    handleChange(index, 'quantity', product.quantity + 1)
                  }
                >
                  +
                </button>
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  className="w-full p-1 border rounded"
                  placeholder="Enter Amount"
                  value={product.price}
                  onChange={(e) =>
                    handleChange(index, 'price', parseFloat(e.target.value))
                  }
                />
              </td>
              <td className="border p-2">${product.total.toFixed(2)}</td>
              <td className="border p-2">
                <button
                  className="p-1 bg-red-500 text-white rounded"
                  onClick={() => handleRemoveProduct(index)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mt-4 p-2 bg-blue-500 text-white rounded"
        onClick={handleAddProduct}
      >
        + Add Product
      </button>
    </div>
  );
};

export default ProductRow;
