"use client";

import Profile from "./Profile";
import Modal from "./common/Modal";
import Notification from "./Notification";
import { useEffect, useState } from "react";
// import { IoSearch } from "react-icons/io5";
// import { debounce } from "@/hooks/general";
import FormRenderer from "./common/FormRender";
import DarkLightToggle from "./DarkLightToggle";
import { useAuth } from "../context/AuthContext";
import FullScreenButton from "./FullScreenButton";
// import { HiOutlineMenuAlt1 } from "react-icons/hi";

const Navbar: React.FC = () => {
  const { token } = useAuth();
  const [formConfig, setFormConfig] = useState<any>({});
  const [stateReady, setStateReady] = useState(false);
  // const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    setStateReady(true);
  }, []);

  // const fetchFilteredData = () => {
  //   // Implement your search logic here
  // };

  const handleLead = () => {
    setIsModalVisible(true);
    setFormConfig({ type: "Lead" });
  };
  const handleQuotation = () => {
    setIsModalVisible(true);
    setFormConfig({ type: "Quotation" });
  };

  return (
    <>
      {stateReady && token && (
        <nav
          className={`fixed bg-whiteBg w-[83%] ml-[17%] z-50 px-4 py-2 text-black`}
        >
          {/* Modals */}
          <Modal
            isVisible={isModalVisible}
            onClose={handleCloseModal}
            formtype={"Add " + formConfig.type}
          >
            <FormRenderer
              data={{}}
              setPaginate={() => {}}
              onClose={handleCloseModal}
              setFilteredData={() => {}}
              formType={formConfig?.type}
            />
          </Modal>

          <div className="flex justify-between items-center">
            <div className="flex w-1/2 justify-start items-center gap-2">
              {/* <HiOutlineMenuAlt1
                size={25}
                className="text-iconBlack font-black"
              />
              <div className="flex w-full items-center">
                <input
                  type="text"
                  value={searchTerm ?? ""}
                  placeholder="Search for Results..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-y border-l bg-infobg border-primary px-4 placeholder:text-gray-500 text-sm py-2.5 rounded-l-full outline-none text-gray-500 w-full"
                />
                <button
                  type="button"
                  className="border-y border-r bg-infobg border-primary text-gray-400 rounded-r-full py-[11px] pr-4 text-lg"
                  onClick={debounce(() => fetchFilteredData(), 500)}
                >
                  <IoSearch />
                </button>
              </div> */}
              <button
                type="button"
                onClick={handleLead}
                className="bg-secondary text-white whitespace-nowrap px-4 py-2 rounded-xl"
              >
                Add Lead
                <sup>+</sup>
              </button>
              <button
                type="button"
                onClick={handleQuotation}
                className="bg-secondary text-white whitespace-nowrap px-4 py-2 rounded-xl"
              >
                Add Quotation
                <sup>+</sup>
              </button>
            </div>
            <div className="flex w-1/2 text-iconBlack justify-end items-center gap-2">
              <DarkLightToggle />
              <Notification />
              <FullScreenButton />
              <Profile />
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
