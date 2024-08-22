"use state";
import React, { useState } from "react";
import { Logo } from "../atoms/logo";
import { ChevronDown, Search, UserPlus } from "lucide-react";
import Popup from "../organisms/popup";
import CreateAdgForm from "./createAdgForm";
import CreateMemeberForm from "./createMemberForm";
import CustomHoverCard from "../organisms/hoverCard";

type Props = {
  placeholder: string;
};

export default function NavDashboard({ placeholder }: Props) {
  const [showAdgForm, setShowAdgForm] = useState<boolean>(false);
  const [showMemberForm, setShowMemberForm] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const createdRole: { [key: string]: any }[] = [
    {
      label: "ADG",
      function: () => {
        setShowAdgForm((prev) => !prev);
        setOpenDropdown(false);
      },
    },
    {
      label: "Member",
      function: () => {
        setShowMemberForm((prev) => !prev);
        setOpenDropdown(false);
      },
    },
  ];
  return (
    <div className="flex justify-between px-3 bg-tertiary">
      <Logo size="very-large" />
      <div className=" my-auto hidden md:flex px-6 w-[600px] md:border-white">
        <div className="input justify-center flex text-[#3a3737] bg-white w-[60%] mx-auto md:w-full items-center py-3 px-2 gap-2 ">
          <input
            type="search"
            placeholder={placeholder}
            className="w-full  outline-none bg-transparent"
          />
          <Search size={20} />
        </div>
      </div>
      <div
        className="flex flex-col"
        onClick={() => setOpenDropdown((prev) => !prev)}
      >
        <div className="my-auto">
          <CustomHoverCard content="Create sub-account">
            <div className="flex gap-2 rounded-[10px] font-semibold bg-white text-slate-700 p-3 hover:cursor-pointer">
              {/* <p className="hidden md:flex">Create sub-account</p> */}
              <UserPlus className="" />
              <ChevronDown className={openDropdown ? "rotate-180" : ""} />
            </div>
          </CustomHoverCard>
        </div>

        {openDropdown && (
          <div className="absolute top-[60px] right-0 bg-slate-50 w-[198px] rounded-b-[12px]">
            {createdRole.map((item, idx) => (
              <p
                key={idx}
                onClick={item.function}
                className="hover:bg-tertiary w-full p-2 hover:cursor-pointer"
              >
                {item.label}
              </p>
            ))}
          </div>
        )}
      </div>
      {showAdgForm && (
        <Popup
          isVisible={showAdgForm}
          onCloseModal={() => setShowAdgForm((prev) => !prev)}
          modalOpen={() => setShowAdgForm(true)}
        >
          <CreateAdgForm closeModal={() => setShowAdgForm((prev) => !prev)} />
        </Popup>
      )}
      {showMemberForm && (
        <Popup
          isVisible={showMemberForm}
          onCloseModal={() => setShowMemberForm((prev) => !prev)}
          modalOpen={() => setShowMemberForm(true)}
        >
          <CreateMemeberForm
            closeModal={() => setShowMemberForm((prev) => !prev)}
          />
        </Popup>
      )}
    </div>
  );
}
