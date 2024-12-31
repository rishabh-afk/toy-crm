"use client";

import { Delete } from "@/hooks/apiUtils";
import { useEffect, useState } from "react";
import { FaEdit, FaTimes } from "react-icons/fa";

const ManageSlot = ({
  group,
  fetched,
  loading,
  therapist_id,
  fetchSlotData,
}: {
  group: any;
  fetched: any;
  loading: any;
  fetchSlotData: any;
  therapist_id: string;
}) => {
  const [editingDate, setEditingDate] = useState<string | null>(null);

  useEffect(() => {
    fetchSlotData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetched]);

  const handleRemoveSlot = async (slotId: string) => {
    const response: any = await Delete("auth/user/slot/delete-slot", {
      slot_id: slotId,
      therapist_id: therapist_id,
    });
    if (response.message === "Slot deleted successfully") fetchSlotData();
    else setEditingDate(null);
  };

  const handleEditClick = (date: string) => {
    if (editingDate === date) setEditingDate(null);
    else setEditingDate(date);
  };

  if (loading === "loading")
    return (
      <div className="flex justify-start text-primary text-2xl">
        Please wait...
      </div>
    );
  if (loading === "fetched")
    return (
      <div className="flex justify-start text-primary text-2xl">
        No Slots found!
      </div>
    );
  return (
    <div>
      <h2 className="text-2xl font-bold pb-5">Availability</h2>
      <div className="grid grid-cols-3 gap-10">
        {Object.keys(group).map((date) => {
          return (
            <div key={date} className="px-4">
              <h2 className="font-bold text-primary flex justify-between items-center">
                {date}
                <span
                  onClick={() => handleEditClick(date)}
                  className="flex text-xs font-normal gap-1 text-nowrap hover:bg-primary hover:text-white rounded-md px-2 py-px cursor-pointer"
                >
                  {editingDate !== date && <FaEdit className="mt-[2px]" />}
                  {editingDate === date ? "Cancel" : "Edit"}
                </span>
              </h2>
              <ul className="grid lg:grid-cols-3 gap-2 mt-4">
                {group[date].map((slot: any) => (
                  <li
                    key={slot._id}
                    className="text-center relative shadow-md text-primary font-semibold p-1 rounded-md text-xs text-nowrap bg-white"
                  >
                    <span>{slot.startTime}</span>
                    {editingDate === date && (
                      <FaTimes
                        className="absolute p-px rounded-full -top-1 bg-primary text-white -right-1 cursor-pointer ml-2"
                        onClick={() => handleRemoveSlot(slot._id)}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ManageSlot;
