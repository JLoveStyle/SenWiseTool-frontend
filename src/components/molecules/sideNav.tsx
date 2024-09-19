"use client";
import { UserButton } from "@clerk/nextjs";
import { ChevronDown } from "lucide-react";
import { memo, useState } from "react";
import { MdCampaign } from "react-icons/md";
import { CampaignType } from "@/types/api-types";
import { useCampaignStore } from "@/lib/stores/campaign-store";


type Props = {
  // campaigns: CampaignType[] | [];
};

const SideNav = function () {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const setCurrentCampaign = useCampaignStore((state) => state.setCurrentCampaign);
  const campaigns = useCampaignStore((state) => state.campaigns);

  async function handleCampagneObject(currentCampaign: CampaignType) {
    console.log("current campaign: ", currentCampaign);
    setCurrentCampaign(currentCampaign);
    setShowDropDown((prev) => !prev);
  }

  return (
    <div className="bg-tertiary w-fit h-screen px-3 ">
      <div
        onClick={() => setShowDropDown((prev) => !prev)}
        className="flex gap-2 hover:cursor-pointer pt-[87px]"
      >
        <h2 className="font-semibold">
          <MdCampaign />
        </h2>
        <ChevronDown
          className={
            showDropDown
              ? "rotate-180 transition-transform duration-500"
              : "duration-500"
          }
        />
      </div>
      {showDropDown && (
        <div className="z-50 absolute bg-tertiary">
          {campaigns.map((item) => (
            <p
              key={item.id}
              onClick={() => handleCampagneObject(item)}
              className="hover:bg-white w-full p-2 hover:cursor-pointer"
            >
              {item.name}
            </p>
          ))}
        </div>
      )}
      <div className="flex flex-col justify-center absolute bottom-3 left-14 ">
        <UserButton />
        {/* <OrganizationSwitcher /> */}
      </div>
    </div>
  );
}

export default memo(SideNav);
