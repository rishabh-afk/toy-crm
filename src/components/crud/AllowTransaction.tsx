const AllowTransaction = ({
  transactionData,
  setTransactionData,
}: {
  transactionData: any;
  setTransactionData: any;
}) => {
  const handleChange = (event: any) => {
    const { name, type, value } = event.target;
    if (type === "checkbox") {
      const { checked } = event.target;
      setTransactionData((prev: any) => ({ ...prev, [name]: checked }));
    } else setTransactionData((prev: any) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="col-span-3 w-full mb-5">
      <form className="grid grid-cols-3 gap-5">
        <div>
          <label
            htmlFor="amount_INR"
            className="block text-sm font-medium text-gray-700"
          >
            Amount (INR)
          </label>
          <input
            type="number"
            id="amount_INR"
            name="amount_INR"
            onChange={handleChange}
            value={transactionData?.amount_INR}
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="INR"
          />
        </div>
        <div>
          <label
            htmlFor="amount_USD"
            className="block text-sm font-medium text-gray-700"
          >
            Amount (USD)
          </label>
          <input
            type="number"
            id="amount_USD"
            name="amount_USD"
            onChange={handleChange}
            value={transactionData?.amount_USD}
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="USD"
          />
        </div>

        <div>
          <label
            htmlFor="isNew"
            className="block text-sm font-medium text-gray-700"
          >
            Is New ( to create transaction )
          </label>
          <input
            id="isNew"
            name="isNew"
            type="checkbox"
            onChange={handleChange}
            checked={transactionData?.isNew}
            className="mt-1 w-6 h-6 p-2 border rounded-md"
          />
        </div>
      </form>
    </div>
  );
};

export default AllowTransaction;
