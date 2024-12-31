"use client";

import Link from "next/link";
// import Image from "next/image";
import { tabs } from "@/data/tabs";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { RiArrowDropDownLine } from "react-icons/ri";

const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const [list, showList] = useState<any>({ tab: "", list: [] });
  const { token, user } = useAuth();
  if (!token) return null;

  const userPermissions = user?.permissions;
  const filteredTabs = tabs.filter((tab) =>
    userPermissions.includes(tab.permission)
  );

  return (
    <div
      className={`fixed w-[17%] text-white bg-primary h-full overflow-y-scroll no-scrollbar`}
    >
      <div className="flex justify-center border-b border-b-secondary bg-primary w-[17%] items-center py-[11px] fixed top-0">
        <Link href={"/dashboard"}>
          {/* <Image
            priority
            width={150}
            height={50}
            alt="Unfazed_Logo"
            unoptimized
            src={"/assets/logo/logo.jpg"}
          /> */}
          <h1 className="text-3xl">MASKEEN</h1>
        </Link>
      </div>
      <nav className="flex flex-col gap-2 justify-center items-center mt-[72px]">
        {filteredTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <React.Fragment key={tab?.id}>
              <Link
                href={tab?.href}
                aria-label={tab?.label}
                onMouseEnter={() => {
                  if (tab?.tabs && tab?.tabs.length > 0)
                    showList({ tab: tab?.permission, list: tab?.tabs });
                }}
                className={`py-3 pl-5 mr-auto w-[90%] text-sm cursor-pointer hover:bg-secondary transition rounded-r-full md:text-base text-info flex justify-between gap-2 items-center border-primary hover:text-white ${
                  pathname === tab?.href &&
                  "bg-secondary rounded-r-full text-white font-semibold"
                }`}
              >
                <span className="flex gap-5 items-center">
                  <Icon size={18} /> {tab?.label}
                </span>
                {tab?.tabs && tab?.tabs.length > 0 && (
                  <RiArrowDropDownLine size={20} className="w-fit" />
                )}
              </Link>
              {list?.tab === tab?.permission && (
                <div
                  onMouseEnter={() =>
                    showList({ tab: tab?.permission, list: tab?.tabs })
                  }
                  className="flex flex-col w-full bg-primary/20"
                >
                  {list?.list &&
                    list?.list.length > 0 &&
                    list?.list.map((tabChild: any, index: number) => {
                      const Icon = tabChild.icon;
                      return (
                        <Link
                          href={tabChild?.href}
                          key={`index+${index}`}
                          aria-label={tabChild?.label}
                          className="w-full text-xs pr-2 pl-9 py-2 flex justify-between gap-2 items-center hover:bg-primary hover:text-white"
                        >
                          <span className="flex">
                            <Icon size={15} className="w-7" /> {tabChild?.label}
                          </span>
                        </Link>
                      );
                    })}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
