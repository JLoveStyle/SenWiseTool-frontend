"use client";
import React, { useEffect, useState } from "react";
import { Logo } from "../atoms/logo";
import {
  ChevronDown,
  ClipboardType,
  FilePenLine,
  Search,
  UserPlus,
} from "lucide-react";
import CreateAdgForm from "../molecules/createAdgForm";
import CreateMemeberForm from "../molecules/createMemberForm";
import CustomHoverCard from "./hoverCard";
import Link from "next/link";
import { Route } from "@/lib/route";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { tableRaw } from "@/utiles/services/constants";
import { Project } from "@/types/gestion";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent } from "../ui/dialog";
import { OrganizationSwitcher } from "@clerk/nextjs";

type Props = {};

export default function NavDashboard({}: Props) {
  const [showAdgForm, setShowAdgForm] = useState<boolean>(false);
  const [showMemberForm, setShowMemberForm] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();
  const [id, setId] = useState<string | undefined | null>("");
  const pathname = usePathname();

  useEffect(() => {
    const localId: string | undefined | null = LOCAL_STORAGE.get("projectId");
    setId(localId);
    setSelectedProject(tableRaw.find((item) => item.id === localId));
  }, []);

  const createdRole: { [key: string]: any }[] = [
    {
      label: "ADG",
      function: () => {
        setOpenDropdown(false);
        setShowAdgForm((prev) => !prev);
        console.log("ADG");
      },
    },
    {
      label: "Auditor",
      function: () => {
        setShowMemberForm((prev) => !prev);
        setOpenDropdown(false);
      },
    },
  ];

  return (
    <nav className="flex justify-between px-3 bg-tertiary z-50 fixed w-screen">
      {/* LOGO & PROJECT NAME IF DEFINED */}
      <div className="flex justify-between md:w-[250px]">
        <Link href={Route.home}>
          <Logo size="very-large" />
        </Link>
        <div
          className={
            pathname === Route.inspectionInterne + `/${id}`
              ? "flex gap-4 my-auto absolute left-[330px] top-6"
              : "hidden"
          }
        >
          <ClipboardType />
          <p className="text-xl font-semibold ">{selectedProject?.title}</p>
        </div>
      </div>

      {/* SEARCH BAR IF PROJECT NAME ISN'T DEFINED */}
      <div
        className={
          pathname !== Route.inspectionInterne + `/${id}`
            ? "my-auto hidden md:flex px-6 w-[600px] md:border-white"
            : "hidden"
        }
      >
        {pathname === Route.autoEvaluation ? (
          <h1 className="font-bold text-center">AUTO EVALAUTION</h1>
        ) : pathname === Route.inspectionInitial ? (
          <h1 className="font-bold text-center">INITIAL INSPECTION</h1>
        ) : pathname === Route.inspectionInterne ? (
          <h1 className="font-bold text-center">INTERNAL INSPECTION</h1>
        ) : (
          ""
        )}
        {/* <div className="input justify-center flex text-[#3a3737] bg-white w-[60%] mx-auto md:w-full items-center p-2 gap-2 ">
          <input
            type="search"
            placeholder={placeholder}
            className="w-full  outline-none bg-transparent"
          />
          <Search size={20} />
        </div> */}
      </div>

      {/* CREATE SUB ACCOUNT BUTTON */}
      <OrganizationSwitcher />
    </nav>
  );
}
