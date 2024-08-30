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
import Popup from "../organisms/popup";
import CreateAdgForm from "./createAdgForm";
import CreateMemeberForm from "./createMemberForm";
import CustomHoverCard from "../organisms/hoverCard";
import Link from "next/link";
import { Route } from "@/lib/route";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { tableRaw } from "@/utiles/services/constants";
import { Project } from "@/types/gestion";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent } from "../ui/dialog";

type Props = {
  placeholder: string;
};

export default function NavDashboard({ placeholder }: Props) {
  const [showAdgForm, setShowAdgForm] = useState<boolean>(false);
  const [showMemberForm, setShowMemberForm] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();
  const [id, setId] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    const localId = LOCAL_STORAGE.get("projectId");
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
      label: "Member",
      function: () => {
        setShowMemberForm((prev) => !prev);
        setOpenDropdown(false);
      },
    },
  ];

  return (
    <nav className="flex justify-between px-3 bg-tertiary shadow-md z-50 fixed w-screen">
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
        <div className="input justify-center flex text-[#3a3737] bg-white w-[60%] mx-auto md:w-full items-center p-2 gap-2 ">
          <input
            type="search"
            placeholder={placeholder}
            className="w-full  outline-none bg-transparent"
          />
          <Search size={20} />
        </div>
      </div>

      {/* CREATE SUB ACCOUNT BUTTON */}
      <div
        className="flex flex-col"
        onClick={() => setOpenDropdown((prev) => !prev)}
      >
        <div className="my-auto">
          <CustomHoverCard content="Create sub-account">
            <div className="flex gap-2 rounded-[10px] font-semibold bg-white text-slate-700 p-3 hover:cursor-pointer">
              {/* <p className="hidden md:flex">Create sub-account</p> */}
              <UserPlus className="" />
              <ChevronDown
                className={
                  openDropdown
                    ? "rotate-180 duration-500 transition-transform"
                    : "duration-500"
                }
              />
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
      <Dialog
        onOpenChange={() => {
          setOpenDropdown(false);
          setShowAdgForm((prev) => !prev);
        }}
        open={showAdgForm}
      >
        <DialogContent className="sm:max-w-[400px]">
          <CreateAdgForm closeModal={() => setShowAdgForm((prev) => !prev)} />
        </DialogContent>
      </Dialog>

      <Dialog
        onOpenChange={() => {
          setShowMemberForm((prev) => !prev);
          setOpenDropdown(false);
        }}
        open={showMemberForm}
      >
        <DialogContent className="sm:max-w-[400px]">
          <CreateMemeberForm
            closeModal={() => setShowMemberForm((prev) => !prev)}
          />
        </DialogContent>
      </Dialog>
    </nav>
  );
}
