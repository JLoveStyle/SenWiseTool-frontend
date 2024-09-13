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
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "../atoms/logo";

interface Props {
  options: DashboardSidebarOption[];
}

export default function SideNav({ options }: Props) {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  const campagn: { [key: string]: any }[] = [
    {
      id: "1",
      name: "2022-2023",
    },
    {
      id: "2",
      name: "2023-2024",
    },
    {
      id: 3,
      name: "2024-2025",
    },
    {
      id: "4",
      name: "2025-2026",
    },
    {
      id: "5",
      name: "2026-2027",
    },
    {
      id: "6",
      name: "2027-2028",
    },
    {
      id: "7",
      name: "2028-2029",
    },
  ];

  async function handleCampagneObject(id: string) {
    console.log(id);
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
          options.map((opt) => (
            <DropdownMenu>
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
                    {opt.details.map((detail) => (
                      <DropdownMenuItem>
                        {detail.icon && (
                          <detail.icon className="mr-2 h-4 w-4" />
                        )}
                        <span>{detail.label}</span>
                        {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                      </DropdownMenuItem>
                    ))}
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
