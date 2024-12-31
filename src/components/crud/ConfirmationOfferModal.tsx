"use client";

import { endpoints } from "@/data/endpoints";
import { Fetch } from "@/hooks/apiUtils";
import { toast } from "react-toastify";

const ConfirmationOfferModal = ({
  closeModal,
  setOfferModalID,
  setFilteredData,
  showOfferModalID,
}: {
  closeModal: any;
  setOfferModalID: any;
  showOfferModalID: any;
  setFilteredData: any;
}) => {
  const handleSendMessge = async () => {
    try {
      const response: any = await Fetch(
        `admin/offer/send-offer/${showOfferModalID}`
      );
      if (response?.success && response?.message === "sent") {
        const currentEndpoint = endpoints["Offer"].fetchAll;
        const response: any = await Fetch(currentEndpoint);
        if (response?.success) setFilteredData(response?.data?.result);
        else window.location.reload(); // TODO: this should be done in future
        return toast.success("Successfully sent offer");
      } else if (response?.success) return toast.error(response?.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
      console.log("Error: ", error);
    } finally {
      closeModal();
      setOfferModalID("");
    }
  };
  return (
    <div className="flex flex-col py-10 justify-center items-center gap-5">
      <h4 className="text-3xl font-semibold w-2/3 mx-auto text-center">
        Do you really want to Send Notification to all the users?
      </h4>
      <div className="flex justify-center items-center gap-5">
        <button
          onClick={handleSendMessge}
          className="px-6 py-2 text-white text-2xl rounded-xl bg-primary hover:bg-primary-dark"
        >
          Confirm
        </button>
        <button
          onClick={closeModal}
          className="px-6 py-2 text-white text-2xl rounded-xl bg-gray-800 hover:bg-gray-900"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmationOfferModal;
