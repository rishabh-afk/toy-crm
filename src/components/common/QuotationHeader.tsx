import { formatDate } from "@/hooks/general";
// import Image from "next/image";

const QuotationHeader = ({ data }: { data: any }) => {
  const fields = [
    { label: "Customer Name", value: data?.customerName },
    { label: "PO No.", value: data?.poNo },
    { label: "PO Date", value: data?.poDate ? formatDate(data.poDate) : "" },
    { label: "Remark", value: data?.remarks },
    { label: "Prepared By", value: data?.preparedByName },
    { label: "Contact Email", value: data?.preparedByEmail },
    { label: "Payment Terms", value: data?.paymentTerms },
    { label: "Transport", value: data?.transport },
  ];
  return (
    <>
      {/* <div className="flex justify-between pb-10 items-center gap-10">
        <h1 className="text-xl text-center font-extrabold">
          Quotation Details (Quotation_{data?.quotationNo})
        </h1>
        <div className="flex space-x-2 px-4 rounded-md">
          <span className="font-bold">Date:</span>
          <span className="">
            {data?.quotationDate ? formatDate(data?.quotationDate) : ""}
          </span>
        </div>
      </div> */}
      <div className="grid grid-cols-2 mt-2 bg-red-400 text-white p-4 rounded-lg justify-between items-center gap-10 border-b pb-4 mb-4">
        {/* Left Side: Logo ]& Company Info */}
        <div className="w-full">
          {/* <Image
            width={200}
            height={80}
            priority
            unoptimized
            alt="Company Logo"
            className="object-contain w-fit"
            src="/assets/logo/logo.jpg"
          /> */}
          <h2 className="font-extrabold underline mb-1 underline-offset-2">
            From:
          </h2>
          <h2 className="text-lg font-bold">MASKEEN TOYS PRIVATE LIMITED</h2>
          <h6 className=" mt-1">
            10/62 ssjmd tower, Industrial Area Kirti Nagar, New Delhi-110015
          </h6>
          <h6 className="">Phone: +91 9811644688</h6>
          <h6 className="">Email: info@maskeen.in</h6>
          <h6 className="text-sm">GST No: 07AAQCM1947B1ZG</h6>
        </div>
        <div>
          {/* <h2 className="font-extrabold text-sm underline mt-4 mb-1 underline-offset-2">
            Customer Details
          </h2> */}
          <div className="flex justify-between text-sm">
            {/* Left - Customer Details */}
            {/* <div className="w-1/2">
              <h6>{data?.customerName}</h6>
            </div> */}

            {/* Right - PO Information */}
            <div className="w-full">
              <h2 className="font-extrabold underline mb-1 underline-offset-2">
                Details:
              </h2>
              <div className="space-y-0.5">
                {fields
                  .filter(({ value }) => value) // Remove empty/falsy values
                  .map(({ label, value }) => (
                    <div key={label}>
                      <span className="font-bold">{label}</span>
                      <span>: {value}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuotationHeader;
