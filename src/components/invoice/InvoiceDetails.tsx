import Image from "next/image";
import { formatDate } from "@/hooks/general";

const InvoiceDetails = ({ data }: { data?: any }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="flex items-center mb-2">
          <label className="block items-center font-semibold">
            Invoice No:
          </label>
          <p className={` text-green-500 font-semibold px-2 rounded`}>
            #(Quotation_{data?.quotationNo})
          </p>
        </div>
        <div className="flex items-center mb-2">
          <label className="inline-block font-semibold">Issued Date:</label>
          <p className={` text-primary px-2 rounded`}>
            {data?.quotationDate ? formatDate(data?.quotationDate) : ""}
          </p>
        </div>
      </div>
      <Image
        width={200}
        height={80}
        priority
        unoptimized
        alt="Company Logo"
        className="object-contain w-fit"
        src="/assets/logo/logo.jpg"
      />
    </div>
  );
};

export default InvoiceDetails;
