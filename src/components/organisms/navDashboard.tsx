"use client";
import { Route } from "@/lib/route";
import { Project } from "@/types/gestion";
import { tableRaw } from "@/utiles/services/constants";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { ClipboardType } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "../atoms/logo";

type Props = {};

export default function NavDashboard({}: Props) {
  const [selectedProject, setSelectedProject] = useState<Project | undefined>();
  const [id, setId] = useState<string | undefined | null>("");
  const pathname = usePathname();

  useEffect(() => {}, []);

  return (
    <nav className=" bg-tertiary  text-white z-50 flex justify-between ">
      <div className=" px-2 items-center flex justify-between mr-0 top-0  left-[100px]">
        {/* LOGO & PROJECT NAME IF DEFINED */}
        <div className="flex justify-between gap-10">
          <Logo variant="text" />
          <div
            className={
              pathname === Route.details + `/455`
                ? "flex gap-4 my-auto absolute left-[330px] top-6"
                : "hidden"
            }
          >
            <ClipboardType />
            <p className="text-xl font-semibold ">{"selectedProject?.title"}</p>
          </div>
        </div>
      </div>

      <div
        className={
          pathname !== Route.inspectionInterne + `/${id}`
            ? "my-auto hidden md:flex px-6 text-center md:border-white "
            : "hidden"
        }
      >
        {pathname === Route.autoEvaluation ? (
          <h1 className="font-bold text-center">AUTO EVALAUTION</h1>
        ) : pathname === Route.inspectionInitial ? (
          <h1 className="font-bold text-center">INITIAL INSPECTION</h1>
        ) : pathname === Route.inspectionInterne ? (
          <h1 className="font-bold text-center">INTERNAL INSPECTION</h1>
        ) : pathname === Route.trainingProject ? (
          <h1 className="font-bold text-center">FORMATIONS</h1>
        ) : (
          ""
        )}
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
