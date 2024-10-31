"use client";
import { Route } from "@/lib/route";
import { Project } from "@/types/gestion";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { ClipboardType } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "../logo";

interface Props {
  title?: string;
}

export default function Navbar({ title }: Props) {
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();
  const [id, setId] = useState<string | undefined | null>("");
  const pathname = usePathname();

  return (
    <nav className=" bg-tertiary  text-white z-50 flex justify-between ">
      <div className=" px-2 items-center flex justify-between mr-0 top-0  left-[100px]">
        {/* LOGO & PROJECT NAME IF DEFINED */}
        <div className="flex justify-between gap-10">
          <Logo variant="text" />
          {/* <div
            className={
              pathname === Route.details + `/455`
                ? "flex gap-4 my-auto absolute left-[330px] top-6"
                : "hidden"
            }
          >
            <ClipboardType />
            <p className="text-xl font-semibold ">{"selectedProject?.title"}</p>
          </div> */}
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
