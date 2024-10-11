"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Route } from "@/lib/route";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { CampaignType } from "@/types/api-types";
import { DashboardSidebarOption } from "@/types/app-link";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";

import clsx from "clsx";
import Link from "next/link";
import { Logo } from "../logo";
import { Spinner } from "../spinner/spinner";

interface Props {
  options: DashboardSidebarOption[];
}

export default function Sidebar({ options }: Props) {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const setCurrentCampaign = useCampaignStore(
    (state) => state.setCurrentCampaign
  );
  const campaigns = useCampaignStore((state) => state.campaigns);

  async function handleCampagneObject(currentCampaign: CampaignType) {
    console.log("current campaign: ", currentCampaign);
    setCurrentCampaign(currentCampaign);
    setShowDropDown((prev) => !prev);
  }

  return (
    <div className={clsx("px-3 h-full relative")}>
      <div className="mt-4">
        <Link href={Route.home}>
          <Logo size="large" />
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center gap-7 pt-10">
        {options &&
          options.map((opt, index) => (
            <>
              {opt.details ? (
                <DropdownMenu key={index}>
                  <DropdownMenuTrigger
                    className="flex gap-[0.3rem] hover:cursor-pointer"
                    asChild
                  >
                    <div className="flex flex-col items-center justify-center">
                      {opt.option.icon && <opt.option.icon size={30} />}
                      <span className="font-normal leading-3 text-[12px]">
                        {opt.option.label}
                      </span>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="">
                    <DropdownMenuLabel>{opt.option.label}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {!opt.details?.length ? (
                        <div className="flex justify-center mx-auto">
                          <Spinner size="small" />
                        </div>
                      ) : (
                        <>
                          {opt.details.map((detail, indx) => (
                            <DropdownMenuItem
                              key={indx}
                              onClick={() => console.log(detail.id)}
                            >
                              {detail.icon && (
                                <detail.icon className="mr-2 h-4 w-4" />
                              )}
                              <span>{detail.label}</span>
                              {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                            </DropdownMenuItem>
                          ))}
                        </>
                      )}
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href={opt.option.baseUrl}
                  key={index}
                  className="flex gap-[0.3rem] hover:cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center">
                    {opt.option.icon && <opt.option.icon size={30} />}
                    <span className="font-normal leading-3 text-[12px]">
                      {opt.option.label}
                    </span>
                  </div>
                </Link>
              )}
            </>
          ))}
      </div>

      <div className="flex flex-col justify-center items-center absolute bottom-5 pl-2">
        <UserButton />
        {/* <OrganizationSwitcher /> */}
      </div>
    </div>
  );
}
