import Image from "next/image";
import React from "react";

const termsAndConditions = [
  "100% payment advance along with purchase order.",
  "Delivery time depends on quantity.",
  "Packing, forwarding & transportation shall be charged extra.",
  "All disputes are subject to Delhi jurisdiction only. Interest @24% PA will be charged on delayed payment not made.",
  "Order once placed shall not be canceled and advance shall not be refunded in any condition.",
  "The customer is responsible to provide proper road permit/ Transit form without which Maskeen Toys Private Limited shall not take any responsibility for the delivery. Any tax Obligation or penalty shall be paid by buyer only.",
  "Installation Extra.",
];

const BankDetails = ({ terms }: { terms?: any }) => {
  const termExist = terms && terms.length > 0 ? terms : termsAndConditions;

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mt-6">
      {/* Header */}
      <div className="bg-red-400 text-white font-semibold text-lg px-2 pb-4 border-b border-gray-200">
        Bank Details
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3">
        {/* Left Section - Bank Details */}
        <div className="col-span-2 border-r border-gray-200 p-2 text-sm">
          <h6 className="mb-1">
            <strong>Name:</strong> Bank Of India
          </h6>
          <h6 className="mb-1">
            <strong>Branch:</strong> Sme Branch Delhi 110087
          </h6>
          <h6 className="mb-1">
            <strong>Account Number:</strong> 6049 3011 000 260
          </h6>
          <h6 className="mb-1">
            <strong>Branch IFSC:</strong> BKID0006049
          </h6>

          {/* Terms and Conditions */}
          <div className="mt-4">
            <h6 className="font-semibold text-base mb-2 underline">
              Terms and Conditions
            </h6>
            <ul className="pl-1 text-xs leading-4">
              {termExist.map((term: string, index: number) => (
                <li key={index}>
                  {index + 1}. {term}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Section - Signature */}
        <div className="p-2 text-right text-sm flex flex-col justify-between">
          <p className="text-base font-bold text-gray-700">
            MASKEEN TOYS PRIVATE LIMITED
          </p>
          <div className="">
            <Image
              width={200}
              height={80}
              priority
              unoptimized
              alt="Company Logo"
              className="object-contain w-fit ml-auto"
              src="/assets/logo/logo.jpg"
            />
            {/* <p className="text-base font-semibold">
              Authorized Signatory
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
