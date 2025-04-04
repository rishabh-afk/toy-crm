import Image from "next/image";
import { formatDate } from "@/hooks/general";

const PackingInvoiceDetails = ({ data }: { data?: any }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="flex items-center mb-2">
          <label className="block items-center font-semibold">
            Packing No:
          </label>
          <p className={` text-green-500 font-semibold px-2 rounded`}>
            #{data?.packingNo}
          </p>
        </div>
        <div className="flex items-center mb-2">
          <label className="inline-block font-semibold">Packing Date:</label>
          <p className={` text-primary px-2 rounded`}>
            {data?.packingDate ? formatDate(data?.packingDate) : ""}
          </p>
        </div>
      </div>
      <Image
        priority
        width={200}
        height={80}
        unoptimized
        alt="Company Logo"
        src="/assets/logo/logo.jpg"
        className="object-contain w-fit"
      />
    </div>
  );
};

export default PackingInvoiceDetails;
