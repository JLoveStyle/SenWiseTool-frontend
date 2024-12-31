import { InspectionDataPops, InspectionDataType } from "@/types/api-types";
import React, { useEffect, useState } from "react";
import { fetchApiData } from "@/utiles/services/queries";
import { Route } from "@/lib/route";
import { toast } from "react-toastify";
import { Spinner } from "@/components/atoms/spinner/spinner";
import dayjs from "dayjs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  handleAnalysis,
  overallStatistics,
} from "@/utiles/services/Data-analysis/single-inspection-analysis";
import { Button } from "@/components/ui/button";
import { downloadInspectionDataAsCsv, inspectionDataAsCsv } from "./downloadCsv";

const DisplayInspectionAnalysis = dynamic(
  () => import("../inspection-data-statistics/displayInspectionAnalysis"),
  {
    ssr: false,
  }
);

const DisplaySingleInspectionData = dynamic(
  () => import("../inspection-data-statistics/displaySingleInspectionData"),
  {
    ssr: false,
  }
);

type Props = {
  project_id: string;
  projectName: string;
};

export default function InspectionData({ project_id, projectName }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [singleInspectionData, setSingleInspectionData] =
    useState<InspectionDataPops>();
  const [data, setData] = useState<InspectionDataPops[]>([]);

  const [openModal, setOpenModal] = useState<boolean>(false);

  // fetch all projects with answers by type. this will come from project_audit table
  async function fetchAllInpectionData(id: string) {
    // setIsLoading((prev) => !prev);
    await fetchApiData(Route.inspectionData + `/${id}`, "current")
      .then((response) => {
        if (response.status === 201) {
          console.log("response =>", response.data);
          setData(response.data);
          setIsLoading(false);
          return;

          // setInspectionDatas(response.data);
        } else {
          setIsLoading(false);
          // toast.error("Could not fetch inspection data of this project");
          return;
        }
      })
      .catch((error) => {
        setIsLoading((prev) => !prev);
        console.log(error);
        toast.error("Something went wrong. Please refresh this page");
      });
  }

  useEffect(() => {
    fetchAllInpectionData("cm3lgtlxd000b124xckbu2muw");
  }, [project_id]);

  return (
    <div className="md:w-full h-full">
      {isLoading ? (
        <div className="flex justify-center my-auto">
          <Spinner />
        </div>
      ) : data.length ? (
        <div className="bg-[#f3f4f6] h-full md:w-full">
          <div className="flex px-6">
            <h2 className="text-center py-6 flex-1">
              Titre projet:{" "}
              <span className=" font-semibold">{projectName}</span>
            </h2>
            <Button
              // onClick={() => downloadInspectionDataAsCsv([], data)}
              onClick={() => inspectionDataAsCsv(data)}
              className="bg-tertiary hover:bg-tertiary hover:opacity-90 my-auto"
            >
              Export
            </Button>
          </div>
          <div className="flex justify-between gap-3">
            <div className=" px-6">
              <table>
                <thead>
                  <tr>
                    <th className="p-2  border">N°</th>
                    <th className="p-2  border">Nom planteur</th>
                    <th className="p-2  border">CNI</th>
                    <th className="p-2  border">Village</th>
                    <th className="p-2  border">Nom agent</th>
                    <th className="p-2  border">Contact agent</th>
                    <th className="p-2  border">Date inspection</th>
                    <th className="p-2  border">Année de certification</th>
                    <th className="p-2  border">Weed application</th>
                    <th className="p-2  border">
                      Qté angrais (kg/ha)
                    </th>
                    <th className="p-2  border">Photo planteur</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, idx) => (
                    <tr
                      key={idx}
                      onClick={() => {
                        setOpenModal((prev) => !prev);
                        handleAnalysis(
                          item.project_data.project_data.requirements
                        );
                        setSingleInspectionData(item as InspectionDataPops);
                      }}
                      className="hover:cursor-pointer hover:!bg-[#b43636] py-3 "
                    >
                      <td className="p-2  border bg-white">{idx + 1}</td>
                      <td className="p-2  border bg-white hover:underline ">
                        {item.project_data.project_data.metaData.farmer_name}{" "}
                      </td>
                      <td className="p-2 bg-white border ">
                        {
                          item.project_data.project_data.metaData
                            .farmer_ID_card_number
                        }{" "}
                      </td>
                      <td className="p-2 bg-white border ">
                        {item.project_data.project_data.metaData.village}
                      </td>
                      <td className="p-2 bg-white border ">
                        {item.project_data.project_data.metaData.inspector_name}{" "}
                      </td>
                      <td className="p-2 bg-white border ">
                        {
                          item.project_data.project_data.metaData
                            .inspector_contact
                        }{" "}
                      </td>
                      <td className="p-2 bg-white border ">
                        {dayjs(item.collected_at).toString().slice(0, -4)}{" "}
                      </td>
                      <td className="p-2 bg-white border ">
                        {
                          item.project_data.project_data.metaData
                            .certification_year
                        }{" "}
                      </td>
                      <td className="p-2 bg-white border ">
                        {
                          item.project_data.project_data.metaData
                            .weed_application
                        }{" "}
                      </td>
                      <td className="p-2 bg-white border ">
                        {
                          item.project_data.project_data.metaData
                            .weed_application_quantity
                        }{" "}
                      </td>
                      <td className="p-2 bg-white border ">
                        <img
                          src={
                            item.project_data.project_data.metaData
                              .farmer_photos &&
                            item.project_data.project_data.metaData
                              ?.farmer_photos[0]
                          }
                          alt="farmer picture"
                          className="h-[50px] w-[70px]"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="md:w-[450px] bg-white md:mr-6">
              <h1
                className="font-bold py-2 text-center border-b"
                onClick={() => overallStatistics(data)}
              >
                Statistiques global
              </h1>
              <DisplayInspectionAnalysis
                totalQuestions={
                  singleInspectionData &&
                  singleInspectionData?.project_data.project_data.requirements
                    .length * data.length
                }
                inspectionData={overallStatistics(data)}
              />
            </div>
          </div>

          <div className="md:w-[500px] px-4 bg-red-300">
            <Dialog
              open={openModal}
              onOpenChange={() => setOpenModal((prev) => !prev)}
            >
              <DialogContent>
                {/* THIS HIDES UNWANTED COMPONENTS ON THE BROWSER */}
                <VisuallyHidden.Root>
                  <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription></DialogDescription>
                  </DialogHeader>
                </VisuallyHidden.Root>
                <DisplaySingleInspectionData
                  incomingData={singleInspectionData}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mx-auto">Aucune donnée collectée</div>
      )}
    </div>
  );
}
