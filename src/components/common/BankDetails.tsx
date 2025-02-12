import React from "react";

const BankDetails = () => {
  return (
    <div className="border mt-5 border-black">
      {/* Header */}
      <div className="bg-gray-200 font-semibold pb-4 px-2 border-b border-black">
        Bank Details
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3">
        {/* Left Section - Bank Details */}
        <div className="col-span-2 border-r border-black px-3 pb-4 text-xs text-wrap">
          <h6>
            <strong>Name</strong> : Bank Of India
          </h6>
          <h6>
            <strong>Branch</strong> : Sme Branch Delhi 110087
          </h6>
          <h6>
            <strong>Account Number</strong> : 6049 3011 000 260
          </h6>
          <h6>
            <strong>Branch IFSC</strong> : BKID0006049
          </h6>
          {/* Terms and Conditions */}
          <div className="mt-2">
            <h6 className="font-semibold text-sm">Terms and Conditions</h6>
            <div className="mt-2 text-[10px] leading-3">
              <h6>1. 100% payment advance along with purchase order.</h6>
              <h6>2. Delivery time depends on quantity.</h6>
              <h6>
                3. Packing, forwarding & transportation shall be charged extra.
              </h6>
              <h6>
                4. All disputes are subject to Delhi jurisdiction only. Interest
                @24% PA will be charged on delayed payment not made.
              </h6>
              <h6>
                5. Order once placed shall not be canceled and advance shall not
                be refunded in any condition.
              </h6>
              <h6>
                6. The customer is responsible to provide proper road permit/
                Transit form without which Maskeen Toys Private Limited shall
                not take any responsibility for the delivery. Any tax Obligation
                or penalty shall be paid by buyer only.
              </h6>
              <h6>7. Installation Extra.</h6>
            </div>
          </div>
        </div>

        {/* Right Section - Signature */}
        <div className="p-3 text-right text-sm text-wrap flex flex-col justify-between">
          <p className="text-base leading-5">
            <strong>MASKEEN TOYS PRIVATE LIMITED</strong>
          </p>
          <p className="mt-10">Authorized Signatory</p>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
