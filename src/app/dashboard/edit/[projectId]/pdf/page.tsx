"use client";
import PrintContent from "@/components/atoms/print-and-edit-content";
import FinalFormData from "@/components/molecules/chapters-table-data/finalFormData";
import InspectionConclusion from "@/components/molecules/inspection-conclusion";
import { Route } from "@/lib/route";
import { ProjectType } from "@/types/api-types";
import { mutateUpApiData } from "@/utiles/services/mutations";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Bounce, toast } from "react-toastify";
import slugify from "slugify";

type Props = {};

export default function page({}: Props) {
  const router = useRouter();
  const [personalInfo, setPersonalInfo] = useState({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const projectData: ProjectType = LOCAL_STORAGE.get("project");
  const finalJson = LOCAL_STORAGE.get("finalJson");
  const company = LOCAL_STORAGE.get("company");

  const firstHalfMetaData = finalJson.metaData.slice(
    0,
    Math.round(finalJson.metaData.length / 2)
  );
  const secondHalfMetaData = finalJson.metaData.slice(
    Math.round(finalJson.metaData.length / 2),
    finalJson.metaData.length
  );

  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = { ...personalInfo, [e.target.name]: e.target.value };
    setPersonalInfo(data);
  };

  async function deployProject() {
    if (projectData.status === "DEPLOYED") {
      toast.warning("projet déjà deployé", {
        transition: Bounce,
        autoClose: 3000,
      });
      return;
    }
    setIsLoading((prev) => !prev);
    await mutateUpApiData(
      Route.projects,
      { status: "DEPLOYED" },
      projectData?.id
    )
      .then((response) => {
        console.log(response);
        setIsLoading((prev) => !prev);
        if (response.status <= 204) {
          toast.success("Projet deployé", {
            transition: Bounce,
            autoClose: 3000,
          });
        }
        if (response.statusCode >= 205) {
          toast.error(`Sorry something went wrong`, {
            transition: Bounce,
            autoClose: 3000,
          });
        }
      })
      .catch((error) => {
        console.log("An error occured", error);
        setIsLoading((prev) => !prev);
        toast.error("Fail to deploy. Try again", {
          transition: Bounce,
          autoClose: 3000,
        });
      });
  }

  const handleBackBtn = () => {
    if (projectData?.type == "AUTO_EVALUATION") {
      router.push(Route.autoEvaluation);
    } else if (projectData?.type == "INITIAL_INSPECTION") {
      router.push(Route.inspectionInitial);
    } else if (projectData?.type == "INTERNAL_INSPECTION") {
      router.push(Route.inspectionInterne);
    }
  };

  return (
    <PrintContent
      isDeploying={isLoading}
      handleExitPage={handleBackBtn}
      onClick={() => router.push(Route.editProject + `/${projectData?.id}`)}
      deployProject={() => deployProject()}
      filename="formulaire-d'inspection"
    >
      <div className="my-10 md:w-[80%] mx-auto borderp-6 ">
        {/* DIFFERENT LOGOS (COMPANY AND RAINFOREST LOGO) */}
        <div className="flex items-baseline justify-between py-2 mx-auto">
          {/* COMPANY LOGO */}
          <img
            src={company.logo}
            alt="company logo"
            className="h-[70px] w-[100px]"
          />

          <img
            src="/images/logo_forest.jpg"
            alt="rainforest aliance logo"
            className="h-[70px] w-[100px]"
          />
          {/* Partner logo */}

          {projectData?.another_logo && (
            <img
              src={projectData?.another_logo}
              alt="Pathner logo"
              className="h-[70px] w-[100px]"
            />
          )}
        </div>
        <h1 className="font-bold text-2xl text-center py-8 ">
          Project title: {projectData.title}
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
          <FinalFormData selectedProjects={finalJson.requirements} />
        </div>

        {/* INSPECTION CONCLUSION */}
        <div className="">
          <InspectionConclusion/>
        </div>
      </div>
    </PrintContent>
  );
}
