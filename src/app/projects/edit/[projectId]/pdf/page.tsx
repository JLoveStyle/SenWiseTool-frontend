"use client";
import { deployableFormColumn } from "@/components/atoms/colums-of-tables/deployableForm";
import PrintContent from "@/components/atoms/print-content";
import { ChaptersRequirements } from "@/components/molecules/chapters-table-data/chapterOne";
import PrintableFormTable from "@/components/molecules/chapters-table-data/printableFormTable";
import { Button } from "@/components/ui/button";
import { Route } from "@/lib/route";
import { deployedPro, requirements } from "@/utiles/services/constants";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

export default function page({}: Props) {
  const projectData = LOCAL_STORAGE.get("project_data");
  const metaData: { [key: string]: string }[] =
    LOCAL_STORAGE.get("formMetadata");
  const firstHalfMetaData = metaData.slice(0, Math.round(metaData.length / 2));
  const secondHalfMetaData = metaData.slice(
    Math.round(metaData.length / 2),
    metaData.length
  );

  const [chap1, chap2] = requirements
  const ctn=chap1.chapter1
  console.log(ctn)
  // console.log(metaData);

  return (
    <PrintContent>
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
                    name={item.val}
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
          {/* <ChaptersRequirements
          incomingColumns={deployableFormColumn}
          incomingData={deployedPro}
          chapter={"deploy"}
        /> */}
        </div>
        <div className="flex justify-end gap-6 pt-5" data-html2canvas-ignore>
          <Link href={Route.editProject + "/45"}>
            <Button className=" border border-primary hover:bg-white hover:text-black px-8 ">
              Edit
            </Button>
          </Link>
          <Button className=" border border-primary hover:bg-white hover:text-black ">
            Print & Download
          </Button>
        </div>
      </div>
    </PrintContent>
  );
}
