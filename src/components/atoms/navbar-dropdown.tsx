"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AppLink } from "@/types/app-link";
import clsx from "clsx";
import { Grip } from "lucide-react";
import React from "react";
import { ActiveLink } from "./active-link";
import { Icon } from "./icon";

interface Props {
  navLinks: AppLink[];
  loginButtons: React.ReactNode;
}

export const NavbarDropdown = ({ navLinks, loginButtons }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={clsx(
          "transition-transform outline-none border-none duration-300 hover:rotate-45 hover:text-primary after:hover:text-primary"
        )}
      >
        <Icon icon={{ icon: Grip }} size={25} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-svw">
        {navLinks.map((navLink) => (
          <DropdownMenuItem className="p-0">
            <ActiveLink
              baseUrl={navLink.baseUrl}
              className="whitespace-nowrap font-medium py-2 px-3"
              style="font-bold bg-secondary w-full"
              label={navLink.label}
            />
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="float-right">
          {loginButtons}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
