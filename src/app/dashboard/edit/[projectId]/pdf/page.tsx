"use client";
import PrintContent from "@/components/atoms/print-and-edit-content";
import FinalFormData from "@/components/molecules/chapters-table-data/finalFormData";
import { Route } from "@/lib/route";
import { mutateUpApiData } from "@/utiles/services/mutations";
import { fetchApiData } from "@/utiles/services/queries";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import slugify from "slugify";

type Props = {};

export default function page({ }: Props) {
  const router = useRouter();
  const [personalInfo, setPersonalInfo] = useState({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [project, setProject] = useState<{ [key: string]: any }>({});
  const projectData = LOCAL_STORAGE.get("project");
  const finalJson = LOCAL_STORAGE.get("finalJson");

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

  async function getProjectById() {
    await fetchApiData(Route.projects, projectData?.id)
      .then((response) => {
        console.log("Here is the response", response);
        setProject(response);
      })
      .catch((error) => {
        console.log("error occured", error);
      });
  }

  useEffect(() => {
    // Fetch project by id
    getProjectById();
  }, []);

  async function deployProject() {
    setIsLoading((prev) => !prev);
    await mutateUpApiData(
      Route.projects,
      { status: "DEPLOYED" },
      projectData?.id
    )
      .then((response) => {
        console.log(response);
        if (response.status <= 204) {
          toast.success("Project deployed", {
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
        toast.error("Fail to deploy. Try again", {
          transition: Bounce,
          autoClose: 1000,
        });
      });
  }

  return (
    <PrintContent
      filename="fiche d'inspection"
      deployProject={() => deployProject()}
      onClick={() => router.push(Route.editProject + `/${projectData?.id}`)}
      handleExitPage={() => router.push(Route.dashboard)}
    >
      <div className="my-10 md:w-[80%] mx-auto borderp-6 ">
        {/* DIFFERENT LOGOS (COMPANY AND RAINFOREST LOGO) */}
        <div className="flex justify-between py-2 mx-auto">
          {/* COMPANY LOGO */}
          <img
            src="https://syndustricam.org/wp-content/uploads/2023/07/013-image-0125-1.png"
            alt="rainforest aliance logo"
            width={250}
            height={200}
          />

          <Image
            src="/images/logo_forest.jpg"
            alt="rainforest aliance logo"
            width={100}
            height={100}
          />
          {/* Partner logo */}
          <Image
            src="/images/logo-senima.png"
            alt="rainforest aliance logo"
            width={100}
            height={100}
          />
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
          {/* <PrintableFormTable
            // incomingColumns={deployableFormColumn}
            incomingColumns={printableFormColumns}
            incomingData={deployedPro}
          /> */}
        </div>
      </div>
    </PrintContent>
  );
}