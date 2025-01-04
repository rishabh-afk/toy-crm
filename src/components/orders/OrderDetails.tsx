import React from "react";
import OrderStatus from "./OrderStatus";
import OrderedProducts from "./OrderedProducts";

const OrderDetails: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded shadow-md p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Order Details</h2>
          <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition">
            Go to List
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Ordered Date:{" "}
          <span className="font-medium text-gray-800">5th Mar, 2024</span>
        </p>

        {/* Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
          {/* Customer Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Customer Details:
            </h3>
            <p className="mt-2">
              <span className="font-medium">Sophia Mitchell</span>
            </p>
            <p className="text-sm text-gray-600">
              Phone Number: +44-7896-123456
            </p>
            <p className="text-sm text-gray-600">
              Email ID: sophiamitchell@mail.mail
            </p>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              Shipping Address:
            </h3>
            <p className="mt-2">
              <span className="font-medium">Sophia Mitchell</span>
            </p>
            <p className="text-sm text-gray-600">
              55B Baker Street, Suite 22, Kensington Square, Near City Tower,
              45678, London, UK
            </p>
          </div>

          {/* Order Info */}
          {/* <div>
            <h3 className="text-lg font-semibold text-gray-800">Order Info:</h3>
            <p className="mt-2 text-sm text-gray-600">
              Order ID:{" "}
              <span className="font-medium text-gray-800">#477945119</span>
            </p>
            <p className="text-sm text-gray-600">
              Total Items:{" "}
              <span className="font-medium text-gray-800">02 Products</span>
            </p>
            <p className="text-sm text-gray-600">
              Order Date:{" "}
              <span className="font-medium text-gray-800">05th Mar, 2024</span>
            </p>
            <p className="text-sm text-gray-600">
              Delivered By:{" "}
              <span className="font-medium text-gray-800">16th Mar, 2024</span>
            </p>
            <p className="text-sm text-gray-600">
              Status:{" "}
              <span className="font-medium text-indigo-500">Delivered</span>
            </p>
          </div> */}
        </div>

        <div className="lg:flex">
          {/* Order Summary */}
          <div className="col mt-6 mx-2 lg:w-1/2">
            <h3 className="text-lg font-semibold text-gray-800">
              Order Summary:
            </h3>
            <div className="bg-gray-100 p-4 rounded mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Sub Total</span>
                <span className="font-medium">$680.98</span>
              </div>
              <div className="flex justify-between text-green-500">
                <span>Discount</span>
                <span>- $136.20</span>
              </div>
              <div className="flex justify-between text-red-500">
                <span>Delivery Charges</span>
                <span>- $5</span>
              </div>
              <div className="flex justify-between">
                <span>Service Tax (18%)</span>
                <span>- $119.56</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-800">
                <span>Total:</span>
                <span>$420.00</span>
              </div>
            </div>
          </div>
          {/* Order Info */}
          <div className="col mt-6 mx-2 lg:w-1/2">
            <h3 className="text-lg font-semibold text-gray-800">Order Info:</h3>
            <div className="bg-gray-100 p-4 rounded mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Sub Total</span>
                <span className="font-medium">$680.98</span>
              </div>
              <div className="flex justify-between text-green-500">
                <span>Discount</span>
                <span>- $136.20</span>
              </div>
              <div className="flex justify-between text-red-500">
                <span>Delivery Charges</span>
                <span>- $5</span>
              </div>
              <div className="flex justify-between">
                <span>Service Tax (18%)</span>
                <span>- $119.56</span>
              </div>
              <div className="flex justify-between font-semibold text-gray-800">
                <span>Total:</span>
                <span>$420.00</span>
              </div>
            </div>
          </div>
        </div>

        <OrderStatus />
      </div>
      <OrderedProducts />
    </div>
  );
};

export default OrderDetails;
