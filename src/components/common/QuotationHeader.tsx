import { formatDate } from "@/hooks/general";
import Image from "next/image";

const QuotationHeader = ({ data }: { data: any }) => {
  return (
    <>
      <div className="flex justify-between pb-10 items-center gap-10">
        <h1 className="text-xl text-center font-extrabold">
          Quotation Details (Quotation_{data?.quotationNo})
        </h1>
        <div className="flex space-x-2 px-4 rounded-md">
          <span className="font-bold">Date:</span>
          <span className="">
            {data?.quotationDate ? formatDate(data?.quotationDate) : ""}
          </span>
        </div>
      </div>
      <div className="flex justify-between items-start gap-20 border-b pb-4 mb-4">
        {/* Left Side: Logo ]& Company Info */}
        <div className="w-full">
          <Image
            width={200}
            height={80}
            priority
            unoptimized
            alt="Company Logo"
            className="object-contain w-fit"
            src="/assets/logo/logo.jpg"
          />
          <h2 className="text-lg font-bold mt-2">
            MASKEEN TOYS PRIVATE LIMITED
          </h2>
          <h6 className="text-sm mt-2">
            10/62 ssjmd tower, Industrial Area Kirti Nagar, New Delhi-110015
          </h6>
          <h6 className="text-sm">Phone: +91 9811644688</h6>
          <h6 className="text-sm">Email: info@maskeen.in</h6>
          <h6 className="text-sm">GST No: 07AAQCM1947B1ZG</h6>
          <h2 className="font-extrabold text-sm underline mt-4 mb-1 underline-offset-2">
            Customer Details
          </h2>
          <div className="flex justify-between text-xs">
            {/* Left - Customer Details */}
            <div className="w-1/2">
              <h6>{data?.customerName}</h6>
            </div>

            {/* Right - PO Information */}
            <div className="w-1/2">
              <div className="grid grid-cols-[auto_1fr] gap-x-2">
                <span className="font-bold">PO No.</span>
                <span>: {data?.poNo}</span>
                <span className="font-bold">PO Date</span>
                <span>: {data?.poDate ? formatDate(data?.poDate) : ""}</span>
                <span className="font-bold">Remark</span>
                <span>: {data?.remarks}</span>
                <span className="font-bold">Prepared By</span>
                <span>: {data?.preparedByName}</span>
                <span className="font-bold">Contact Email</span>
                <span>: {data?.preparedByEmail}</span>
                <span className="font-bold">Payment Terms</span>
                <span>: {data?.paymentTerms}</span>
                <span className="font-bold">Transport</span>
                <span>: {data?.transport}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuotationHeader;
