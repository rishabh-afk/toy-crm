import React from "react";
import { IoPrintSharp, IoShareOutline } from "react-icons/io5";

interface Product {
  id: number;
  name: string;
  color: string;
  size: string;
  price: number;
  originalPrice: number;
  discount: string;
  quantity: number;
  trackingId: string;
  imageUrl: string;
  total: number;
}

const OrderedProducts: React.FC = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Women's Slim Bag",
      color: "Grey",
      size: "Compact",
      price: 545,
      originalPrice: 854,
      discount: "20% OFF",
      quantity: 1,
      trackingId: "#18A78Y65K6202P49P",
      imageUrl: "/assets/products/1.png", // Replace with actual image path
      total: 545,
    },
    {
      id: 2,
      name: "Beautiful Candle Set",
      color: "Blue",
      size: "42",
      price: 85,
      originalPrice: 100,
      discount: "15% OFF",
      quantity: 2,
      trackingId: "#87492652JTTD8969",
      imageUrl: "/assets/products/2.png", // Replace with actual image path
      total: 85,
    },
  ];

  return (
    <div className="mt-8 bg-white rounded shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800">Ordered Products</h3>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="bg-gray-100 text-gray-600 text-sm uppercase font-medium">
            <tr>
              <th className="py-3 px-6">S.No</th>
              <th className="py-3 px-6">Product Name</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Quantity</th>
              <th className="py-3 px-6">Tracking ID</th>
              <th className="py-3 px-6">Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="border-b">
                <td className="py-4 px-6">{index + 1 < 10 ? `0${index + 1}` : index + 1}.</td>
                <td className="py-4 px-6 flex items-center space-x-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{product.name}</p>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full inline-block">
                      {product.discount}
                    </span>
                    <p className="text-xs text-gray-600 mt-1">Color: {product.color}</p>
                    <p className="text-xs text-gray-600">Size: {product.size}</p>
                  </div>
                </td>
                <td className="py-4 px-6">
                  <span className="text-pink-500 font-medium">${product.price}</span>{" "}
                  <span className="line-through text-gray-400">${product.originalPrice}</span>
                </td>
                <td className="py-4 px-6">{product.quantity < 10 ? `0${product.quantity}` : product.quantity}</td>
                <td className="py-4 px-6">
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                    {product.trackingId}
                  </span>
                </td>
                <td className="py-4 px-6 font-medium">${product.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between space-x-4">
        <button className="bg-purple-100 text-purple-500 px-4 py-2 rounded flex items-center space-x-2">
          <IoPrintSharp size={15} className="" />
          <span>Print</span>
        </button>
        <button className="bg-purple-500 text-white px-4 py-2 rounded flex items-center space-x-2 hover:bg-purple-600 transition">
        <IoShareOutline size={15} className="" />
          <span>Share Details</span>
        </button>
      </div>
    </div>
  );
};

export default OrderedProducts;
