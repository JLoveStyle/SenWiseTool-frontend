"use client";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Logo } from "../logo";
import Link from "next/link";
import { Route } from "@/lib/route";

interface Props {
  title?: string;
  className?: string;
}

export default function Navbar({ title, className }: Props) {
  return (
    <nav
      className={` bg-tertiary  text-white z-50 flex justify-between ${className}`}
    >
      <div className=" px-2 items-center flex justify-between mr-0 top-0  left-[100px]">
        <div className="flex justify-between gap-10">
          <Link href={Route.dashboard}>
            <Logo variant="text" />
          </Link>
        </div>
      </div>

      <div className="my-auto hidden md:flex px-6 text-center md:border-white">
        <h1 className="font-bold text-center">{title}</h1>
      </div>
      {/* CREATE SUB ACCOUNT BUTTON */}
      <OrganizationSwitcher
        appearance={{
          elements: {
            organizationPreviewMainIdentifier: "text-white",
          },
        }}
      />
    </nav>
  );
}
