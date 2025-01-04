const OrderStatus: React.FC = () => {
    return (
      <div className="mt-8 bg-gray-100 p-6 rounded">
        <h3 className="text-lg font-semibold text-gray-800">Order Status:</h3>
        <div className="flex items-center justify-between mt-4">
          {/* Status Step */}
          <div className="flex-1 flex flex-col items-center text-center">
            <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
              ✓
            </div>
            <span className="mt-2 text-sm font-semibold text-gray-800">01</span>
            <p className="text-sm text-gray-600">Order Placed</p>
            <p className="text-sm text-gray-600">05th, Mar 2024</p>
          </div>
  
          <div className="flex-1 flex items-center justify-center">
            <div className="h-1 bg-green-500 w-full"></div>
          </div>
  
          <div className="flex-1 flex flex-col items-center text-center">
            <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
              ✓
            </div>
            <span className="mt-2 text-sm font-semibold text-gray-800">02</span>
            <p className="text-sm text-gray-600">Confirmed</p>
            <p className="text-sm text-gray-600">08th, Mar 2024</p>
          </div>
  
          <div className="flex-1 flex items-center justify-center">
            <div className="h-1 bg-green-500 w-full"></div>
          </div>
  
          <div className="flex-1 flex flex-col items-center text-center">
            <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
              ✓
            </div>
            <span className="mt-2 text-sm font-semibold text-gray-800">03</span>
            <p className="text-sm text-gray-600">Shipped</p>
            <p className="text-sm text-gray-600">05th, Mar 2024</p>
          </div>
  
          <div className="flex-1 flex items-center justify-center">
            <div className="h-1 bg-orange-400 w-full"></div>
          </div>
  
          <div className="flex-1 flex flex-col items-center text-center">
            <div className="bg-orange-400 text-white rounded-full w-8 h-8 flex items-center justify-center">
              ✓
            </div>
            <span className="mt-2 text-sm font-semibold text-gray-800">04</span>
            <p className="text-sm text-gray-600">Delivered</p>
            <p className="text-sm text-gray-600">16th, Mar 2024</p>
          </div>
        </div>
      </div>
    );
  };

  export default OrderStatus;