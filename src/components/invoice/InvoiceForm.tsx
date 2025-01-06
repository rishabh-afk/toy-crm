// InvoiceForm.tsx
import Image from "next/image";
import BillingSection from "./BillingSection";
import PaymentMethod from "./PaymentMethod";
import ProductRow from "./ProductRow";

const InvoiceForm = () => {
  return (
    <div className="flex gap-4 p-2 px-2">
      <div className="w-4/5 bg-white shadow rounded-lg p-6">
        {/* Invoice Details */}
        <div className="lg:flex justify-between items-center">
          <div className="lg:w-2/3">
            <div className="flex mb-2">
              <label className="inline-block w-1/4 mb-1 text-sm">
                Invoice No:
              </label>
              <input
                required
                //   value={email}
                autoComplete="off"
                placeholder="Enter your invoice number"
                className={`w-3/4 text-primary outline text-sm  outline-gray-100 px-4 py-1 placeholder:text-gray-400 bg-white rounded`}
                type="text"
                //   onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex  mb-2">
              <label className="inline-block w-1/4 mb-1 text-sm">
                Issued Date:
              </label>
              <input
                required
                //   value={email}
                autoComplete="off"
                placeholder="Enter your Invoice Date"
                className={`w-3/4 text-primary outline text-sm outline-gray-100 px-4 py-1 placeholder:text-gray-400 bg-white rounded`}
                type="date"
                //   onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="lg:1/3 text-right m-2">
            <Image
              src={"/assets/logo/logo.jpg"}
              alt={"logo"}
              width={85}
              height={75}
              className="inline "
            />
          </div>
        </div>
        <div className="bg-[#8b7eff] text-white mt-4 p-4 rounded mb-6">
          <div className="flex justify-between mb-2">
            <label className="inline-block w-1/4 mb-1 font-bold text-2xl">
              INVOICE
            </label>
            <input
              required
              //   value={email}
              autoComplete="off"
              placeholder="Invoice id"
              className={`w-3/4 text-primary outline text-sm  outline-gray-100 px-4 py-1 placeholder:text-gray-400 bg-white rounded`}
              type="text"
              //   onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex justify-between mb-2">
            <label className="inline-block w-1/4 mb-1 text-sm font-bold">
              Due Date :
            </label>
            <input
              required
              //   value={email}
              autoComplete="off"
              placeholder="Due date"
              className={`w-2/4 text-primary outline text-sm  outline-gray-100 px-4 py-2 placeholder:text-gray-400 bg-white rounded`}
              type="date"
              //   onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label className="inline-block w-3/4 mb-1 text-md font-semibold">
              Total Amount (Outstanding Amount in USD)
            </label>
            <input
              required
              //   value={email}
              autoComplete="off"
              placeholder="Total Amount"
              className={`w-1/4 text-primary outline text-sm  outline-gray-100 px-4 py-2 placeholder:text-gray-400 bg-white rounded`}
              type="text"
              //   onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <BillingSection />

        <ProductRow />
        {/* Mode of Payment */}
        <PaymentMethod />

        <div className="mt-4 flex justify-end gap-2">
          <button className="p-2 bg-gray-300 rounded">Save as PDF</button>
          <button className="p-2 bg-blue-500 text-white rounded">
            Send Invoice
          </button>
        </div>
      </div>
      <div className="w-1/5 h-fit bg-white shadow rounded-lg py-3">
        <h1 className="text-lg font-semibold text-center px-3 py-2 border-b-2 border-gray-100 text-gray-800">
          Mode Of Payment
        </h1>
        <div className="px-4 py-3">
          <button className="px-3 py-1 m-1 bg-purple-50 text-[#8b7eff] rounded-md text-sm font-bold">
            Credit/Debit Card
          </button>
          <button className="px-3 py-1 m-1 bg-gray-100 text-gray-700 rounded-md text-sm font-bold">
            UPI Payment
          </button>
        </div>

        <div className="border mx-3 border-gray-200 rounded-md px-3 py-4">
          <form>
            <div className="mb-2 text-center items-center">
              <input
                required
                //   value={email}
                autoComplete="off"
                placeholder="Debit/Credit Card Number"
                className={`w-full text-primary outline text-sm  outline-gray-200 px-4 py-1 placeholder:text-gray-400 bg-white rounded`}
                type="text"
                //   onChange={(e) => setEmail(e.target.value)}
              />
              <label className="inline-block w-full text-center text-gray-500 font-semibold required mx-2 mb-1 text-xs">
                Enter a valid card number
              </label>
            </div>
            <div className="mb-2 text-center items-center">
              <input
                required
                //   value={email}
                autoComplete="off"
                placeholder="Card Holder Name"
                className={`w-full text-primary outline text-sm  outline-gray-200 px-4 py-1 placeholder:text-gray-400 bg-white rounded`}
                type="text"
                //   onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-1 text-center items-center">
              <input
                required
                //   value={email}
                autoComplete="off"
                placeholder="Enter OTP"
                className={`w-full text-primary outline text-sm  outline-gray-200 px-4 py-1 placeholder:text-gray-400 bg-white rounded`}
                type="text"
                //   onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </form>

          <div className="mb-1 text-center items-center">
            <p className="bg-green-100 rounded my-2 text-green-700 text-xs font-semibold py-3 px-4 text-left">
              Please Make sure to pay the invoice bill within 120 days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
