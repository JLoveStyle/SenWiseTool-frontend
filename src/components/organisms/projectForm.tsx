import { ProjectType } from "@/types/api-types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Route } from "@/lib/route";
import { mutateUpApiData } from "@/utiles/services/mutations";
import { Bounce, toast } from "react-toastify";
import FinalFormData from "../molecules/chapters-table-data/finalFormData";
import slugify from "slugify";
import { useCompanyStore } from "@/lib/stores/companie-store";
import PrintContent from "../atoms/print-and-edit-content";
import InspectionConclusion from "../molecules/inspection-conclusion";

type Props = {
  projectObject: ProjectType | undefined;
};

export default function ProjectForm({ projectObject }: Props) {
  const router = useRouter();
  const [personalInfo, setPersonalInfo] = useState({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const company = useCompanyStore((state) => state.company);

  const jsonString = JSON.stringify(projectObject?.project_structure);
  const finalJson = JSON.parse(jsonString);

  const firstHalfMetaData = finalJson?.metaData.slice(
    0,
    Math.round(finalJson?.metaData.length / 2)
  );
  const secondHalfMetaData = finalJson?.metaData.slice(
    Math.round(finalJson?.metaData.length / 2),
    finalJson?.metaData.length
  );

  // HANDLE INPUT CHANGE
  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = { ...personalInfo, [e.target.name]: e.target.value };
    setPersonalInfo(data);
  };

  // DEPLOY PROJECT
  async function deployProject() {
    if (projectObject?.status === "DEPLOYED") {
      toast.warning('Projet deja deployé')
      return
    }
    setIsLoading((prev) => !prev);
    await mutateUpApiData(
      Route.projects,
      { status: "DEPLOYED" },
      projectObject?.id
    )
      .then((response) => {
        console.log(response);
        if (response.status <= 204) {
          toast.success("Projet deployé", {
            transition: Bounce,
            autoClose: 3000,
          });
          setIsLoading(false)
        }
        if (response.statusCode >= 205) {
          toast.error(`Une erreur est survenue au serveur`, {
            transition: Bounce,
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        console.log("An error occured", error);
        toast.error("Echec de déploiment. Veillez réessayer", {
          transition: Bounce,
          autoClose: 1000,
        });
      });
  }

  const handleBackBtn = () => {
    if (projectObject?.type == "AUTO_EVALUATION") {
      router.push(Route.autoEvaluation);
    } else if (projectObject?.type == "INITIAL_INSPECTION") {
      router.push(Route.inspectionInitial);
    } else if (projectObject?.type == "INTERNAL_INSPECTION") {
      router.push(Route.inspectionInterne);
    }
  };

  return (
    <PrintContent
    showBackBtn={false}
    isDeploying={isLoading}
    handleExitPage={handleBackBtn}
    onClick={() => router.push(Route.editProject + `/${projectObject?.id}`)}
    deployProject={() => deployProject()}
    filename="formulaire-d'inspection"
    >
      <div className="my-10 md:w-[80%] mx-auto borderp-6 ">
        {/* DIFFERENT LOGOS (COMPANY AND RAINFOREST LOGO) */}
        <div className="flex items-baseline justify-between py-2 mx-auto">
          {/* COMPANY LOGO */}
          {company && (
            <img
              src={company?.logo}
              alt="company logo"
              className="h-[100px] w-[100px]"
            />
          )}
          <img
            src="/images/logo_forest.jpg"
            alt="rainforest aliance logo"
            className="h-[60px] w-[100px]"
          />
          {/* Partner logo */}

          {projectObject?.another_logo && (
            <img
              src={projectObject?.another_logo}
              alt="Pathner logo"
              className="h-[70px] w-[100px]"
            />
          )}
        </div>
        <h1 className="font-bold text-2xl text-center py-8 ">
          Titre: {projectObject?.title}
        </h1>

        {/* METADATA */}
        <div className=" mx-auto ">
          <h2 className="font-semibold text-center text-xl py-4">
            Information sur le planteur
          </h2>
          <div className="flex gap-5">
            <div className="w-1/2">
              {firstHalfMetaData.map((item: any, idx: number) => (
                <div key={idx} className=" flex py-2 gap-3">
                  <label htmlFor={item} className="font-semibold">
                    {item}:
                  </label>
                  <input
                    type="text"
                    id={item}
                    name={slugify(item)}
                    onChange={(e) => handleChangeEvent(e)}
                    className="border py-1 px-2 w-full"
                  />
                </div>
              ))}
            </div>
            <div className="w-1/2">
              {secondHalfMetaData.map((item: any, idx: number) => (
                <div key={idx} className="flex py-2 gap-3">
                  <label htmlFor={item} className="font-semibold">
                    {item}:
                  </label>
                  <input
                    type="text"
                    id={item}
                    name={item}
                    onChange={(e) => handleChangeEvent(e)}
                    className="border py-1 px-2 w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LIST OF REQUIREMENTS TABULATED */}
        <div className=" mx-auto pt-5">
          <FinalFormData selectedProjects={finalJson?.requirements} />
        </div>
        <InspectionConclusion/>
      </div>
    </PrintContent>
  );
}
