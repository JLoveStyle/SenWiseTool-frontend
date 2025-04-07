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
import { DashboardSidebarOption } from "@/types/app-link";
import { UserButton } from "@clerk/nextjs";
import { ChevronDown } from "lucide-react";
import { memo, useState } from "react";
import { MdCampaign } from "react-icons/md";
import { CampaignType } from "@/types/api-types";
import { useCampaignStore } from "@/lib/stores/campaign-store";

import clsx from "clsx";
import Link from "next/link";
import { Logo } from "../atoms/logo";
import { Spinner } from "../atoms/spinner/spinner";
import React from "react";

interface Props {
  options: DashboardSidebarOption[];
}

export default function SideNav({ options }: Props) {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const setCurrentCampaign = useCampaignStore(
    (state) => state.setCurrentCampaign
  );
  const currentCampaign = useCampaignStore((state) => state.currentCampaign);

  async function handleCampagneObject(currentCampaign: CampaignType) {
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
              {opt.details && (
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
                        {/* DISPLAY CAMPAINS */}
                        {opt.details.map((detail, indx) => (
                          <DropdownMenuItem
                            key={indx}
                            onClick={() => console.log('detail.id')}
                          >
                            {detail.icon && (
                              <detail.icon className="mr-2 h-4 w-4" />
                            )}
                            <span
                              className={
                                (detail.label as string)?.slice(0, 4) ===
                                new Date().getFullYear().toString()
                                  ? "text-primary"
                                  : ""
                              }
                            >
                              {detail.label}
                            </span>
                            {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                          </DropdownMenuItem>
                        ))}
                      </>
                    )}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          ))}
      </div>

      <div className="flex flex-col justify-center items-center absolute bottom-5 pl-2">
        <UserButton />
        {/* <OrganizationSwitcher /> */}
      </div>
    </div>
  );
}
