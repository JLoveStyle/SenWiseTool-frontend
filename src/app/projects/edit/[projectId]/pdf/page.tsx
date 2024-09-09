"use client";
import { deployableFormColumn } from "@/components/atoms/colums-of-tables/deployableForm";
import PrintContent from "@/components/atoms/print-content";
import PrintableFormTable from "@/components/molecules/chapters-table-data/printableFormTable";
import { Route } from "@/lib/route";
import { deployedPro } from "@/utiles/services/constants";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import slugify from 'slugify'

type Props = {};

export default function page({}: Props) {
  const router = useRouter();
  const [personalInfo, setPersonalInfo] = useState({})
  const projectData = LOCAL_STORAGE.get("project_data");
  const metaData: { [key: string]: string }[] =
    LOCAL_STORAGE.get("formMetadata");
  const firstHalfMetaData = metaData.slice(0, Math.round(metaData.length / 2));
  const secondHalfMetaData = metaData.slice(
    Math.round(metaData.length / 2),
    metaData.length
  );

  const handleChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = {...personalInfo, [e.target.name]: e.target.value };
    setPersonalInfo(data)
  };

  console.log(personalInfo)

  return (
    <PrintContent onClick={() => router.push(Route.editProject + "/45")}>
      <div className="my-10 md:w-[80%] mx-auto borderp-6 ">
        {/* DIFFERENT LOGOS (COMPANY AND RAINFOREST LOGO) */}
        <div className="flex justify-between py-2 md:w-[500px] mx-auto">
          <img
            src="https://syndustricam.org/wp-content/uploads/2023/07/013-image-0125-1.png"
            alt="rainforest aliance logo"
            width={200}
            height={200}
          />
          <Image
            src="/images/logo_forest.jpg"
            alt="rainforest aliance logo"
            width={200}
            height={200}
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
              {firstHalfMetaData.map((item, idx: number) => (
                <div key={idx} className=" flex py-2 gap-3">
                  <label htmlFor={item.val} className="font-semibold">
                    {item.val}:
                  </label>
                  <input
                    type="text"
                    id={item.val}
                    name={slugify(item.val)}
                    onChange={(e) => handleChangeEvent(e)}
                    className="border py-1 px-2 w-full"
                  />
                </div>
              ))}
            </div>
            <div className="w-1/2">
              {secondHalfMetaData.map((item, idx: number) => (
                <div key={idx} className="flex py-2 gap-3">
                  <label htmlFor={item.val} className="font-semibold">
                    {item.val}:
                  </label>
                  <input
                    type="text"
                    id={item.val}
                    name={item.val}
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
          <PrintableFormTable
            incomingColumns={deployableFormColumn}
            incomingData={deployedPro}
            chapter={"deploy"}
          />
        </div>
        {/* <div className="flex justify-end gap-6 pt-5" data-html2canvas-ignore>
            <Link href={}>
              <Button className=" border border-primary hover:bg-white hover:text-black px-8 ">
                Edit
              </Button>
            </Link>
            <Button className=" border border-primary hover:bg-white hover:text-black ">
              Print & Download
            </Button>
        </div> */}
      </div>
    </PrintContent>
  );
}
