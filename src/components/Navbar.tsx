"use client";

import Profile from "./Profile";
import Modal from "./common/Modal";
import Notification from "./Notification";
import { useEffect, useState } from "react";
import { includes } from "@/hooks/polyfills";
import { usePathname } from "next/navigation";
import FormRenderer from "./common/FormRender";
import DarkLightToggle from "./DarkLightToggle";
import { useAuth } from "../context/AuthContext";
import FullScreenButton from "./FullScreenButton";

const Navbar: React.FC = () => {
  const { token } = useAuth();
  const pathname = usePathname();
  const [formConfig, setFormConfig] = useState<any>({});
  const [stateReady, setStateReady] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const list = ["/auth/login", "/login", "/auth"];
    if (!includes(list, pathname)) localStorage.setItem("pathname", pathname);
    else localStorage.removeItem("pathname");
  }, [pathname]);

  useEffect(() => {
    setStateReady(true);
  }, []);

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
