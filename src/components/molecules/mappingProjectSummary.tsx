"use client";
import { Route } from "@/lib/route";
import { ProjectType } from "@/types/api-types";
import { mutateUpApiData } from "@/utiles/services/mutations";
import {
  ChevronRight,
  ClipboardType,
  Eye,
  FilePenLine,
  Rocket,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";
import { Spinner } from "../atoms/spinner/spinner";
import dayjs from "dayjs";

type Props = {
  projectObject: ProjectType | undefined;
  showData: (val: boolean) => void;
  showForm: (val: boolean) => void;
  isDataLoading?: boolean;
};

export default function ProjectSummary({
  projectObject,
  showData,
  showForm,
  isDataLoading,
}: Props) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log("projectObject", projectObject);

  const lienRapide: { [key: string]: any } = [
    {
      firstIcon: <ClipboardType />,
      text: "Données collectés",
      secondIcon: <ChevronRight />,
      function: () => showData(true),
    },
    {
      firstIcon: <Rocket />,
      text: "Deployer projet",
      secondIcon: (
        <div className="flex gap-6">
          {isLoading ? <Spinner size="small" /> : ""}
          <ChevronRight />
        </div>
      ),
      function: async () => {
        // First check if the status of the project is different from DEPLOYED
        if (projectObject?.status !== "DEPLOYED") {
          setIsLoading((prev) => !prev);
          await mutateUpApiData(
            Route.projects,
            { status: "DEPLOYED" },
            projectObject?.id
          )
            .then((response) => {
              setIsLoading((prev) => !prev);
              if (response.status <= 205) {
                toast.success("Projet déployer", {
                  transition: Bounce,
                  autoClose: 3000,
                });
              } else {
                toast.error("Une erreur est survenu. Veillez réessayer", {
                  autoClose: 3000,
                  transition: Bounce,
                });
              }
            })
            .catch((error) => {
              console.log("could not update project", error);
              setIsLoading(false);
              toast.error("Une erreur est survenu. Veillez réessayer", {
                autoClose: 3000,
                transition: Bounce,
              });
            });
        } else {
          toast.warning("Project deployed already", {
            transition: Bounce,
            autoClose: 3000,
          });
        }
      },
    },
    {
      firstIcon: <FilePenLine />,
      text: "Edit form",
      secondIcon: <ChevronRight />,
      function: () => {
        router.push(Route.editProject + `/${projectObject?.id}`);
        // router.push(Route.editProject + `/${id}`);
      },
    },
    {
      firstIcon: <Eye />,
      text: "View form",
      secondIcon: <ChevronRight />,
      function: () => {
        showForm(true);
      },
    },
  ];

  return (
    <div className="bg-[#f3f4f6] p-6 md:w-full flex justify-between gap-10 h-full">
      <div className="md:w-[70%]">
        <p className="">Details du projet de Mapping</p>
        <div className="bg-white md:w-full p-5 shadow">
          {/* project title */}
          <div className="flex gap-4 justify-center items-baseline m-auto py-4 border-b">
            <span className="text-sm text-gray-500 ">Titre: </span>
            {isDataLoading ? (
              <div className="h-3 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            ) : (
              <span className=" font-semibold text-lg px-2 rounded-lg">
                {projectObject?.title ?? ""}
              </span>
            )}
          </div>
          <div className="border-b py-4">
            <span className="text-sm font-semibold text-gray-500">
              Description
            </span>
            {isDataLoading ? (
              <div className="h-3 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
            ) : (
              <p className="font-semibold">
                {projectObject?.description ?? ""}{" "}
              </p>
            )}
          </div>
          <div className="flex justify-between md:w-full py-4 border-b ">
            <div className="flex md:w-[500px] justify-between">
              <div className="flex flex-col gap-2 py-2">
                <span className="text-sm text-gray-500 ">Status</span>
                <span className="bg-green-200 font-semibold text-sm px-2 rounded-lg">
                  {projectObject?.status ?? ""}
                </span>
              </div>
              <div className="flex flex-col gap-2 py-2">
                <span className="text-sm text-gray-500 ">Date de création</span>
                <span className=" text-sm text-center rounded-lg font-semibold">
                  {projectObject &&
                    dayjs(projectObject?.created_at).toString().slice(0, -4)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-between md:w-full py-4 border-b ">
            <div className="flex md:w-[500px] justify-between">
              <div className="flex flex-col gap-2 py-2">
                <span className="text-sm text-center text-gray-500 ">
                  Dernière mise à jour
                </span>
                <span className=" text-sm text-center rounded-lg font-semibold">
                  {/* {dayjs(projectObject?.updated_at).toString().slice(0, -4)} */}
                  {projectObject &&
                  (projectObject?.updated_at as string).includes("1969")
                    ? "--"
                    : dayjs(projectObject?.updated_at).toString().slice(0, -4)}
                </span>
              </div>
              <div className="flex flex-col gap-2 py-2">
                <span className="text-sm text-center text-gray-500 ">
                  Date de deploiment
                </span>
                <span className=" text-sm text-center rounded-lg font-semibold">
                  {/* {dayjs(projectObject?.updated_at).toString().slice(0, -4)} */}
                  {projectObject &&
                  (projectObject?.deployed_at as string).includes("1969")
                    ? "--"
                    : dayjs(projectObject?.deployed_at).toString().slice(0, -4)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-between md:w-full pt-4">
            <div className="flex md:w-[500px] justify-between">
              <div className="flex flex-col gap-2 py-2">
                <span className="text-sm text-center text-gray-500 ">
                  Pays
                </span>
                <span className=" text-sm text-center rounded-lg font-semibold">
                  {projectObject?.country ?? ""}
                </span>
              </div>
              <div className="flex flex-col gap-2 py-2">
                <span className="text-sm text-center text-gray-500 ">
                  village
                </span>
                <span className=" text-sm text-center rounded-lg font-semibold">
                  {projectObject?.city ?? ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RAPID LINKS */}
      <div className="md:w-[30%]">
        <p className="">Liens</p>
        <div className="bg-white px-5 shadow">
          {lienRapide.map((link: any, index: number) => (
            <div
              onClick={link.function}
              key={index}
              className="hover:cursor-pointer gap-4 flex justify-between py-2 border-b hover:text-lg"
            >
              <div className="flex gap-4">
                <div className="">{link.firstIcon}</div>
                <p>{link.text}</p>
              </div>
              <div className="">{link.secondIcon}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
