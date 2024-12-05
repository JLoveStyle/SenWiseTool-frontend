import { Button } from "@/components/ui/button";
import { MappingTableColumns } from "@/utiles/services/constants";
import React, { useState, useEffect } from "react";
import slugify from "slugify";
import Link from "next/link";
import { fetchApiData } from "@/utiles/services/queries";
import { Route } from "@/lib/route";
import { MappingProjectData } from "@/types/api-types";
import { Spinner } from "@/components/atoms/spinner/spinner";
import { toast } from "react-toastify";
import { mappingCsvDownload } from "./downloadCsv";
import {
  downlaodSingleKml,
  downloadAllAskml,
  downloadGeoJSON,
} from "./downloadKml";

type Props = {
  project_id: string;
};

export default function MappingData({ project_id }: Props) {
  const [kmlFile, setKmlFile] = useState("");
  const [allKmlFiles, setAllKmlFiles] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [mappingDatas, setMappingDatas] = useState<MappingProjectData[]>([]);

  const coordinates: any[] = [];
  for (const cord of mappingDatas) {
    coordinates.push(cord.coordinates);
  }

  //DOWNLOAD SINGLE KML FILE
  async function convertToKml(
    name: string,
    coordinates: { latitude: number; longitude: number }[]
  ) {
    setKmlFile(await downlaodSingleKml(name, coordinates));
  }

  // DOWNLOAD ALL KML FILES AS A SINGLE KML FILE
  const downloadAllTokml = async () => {
    setAllKmlFiles(await downloadAllAskml(mappingDatas));
  };

  async function fetchAllMappingData(id: string) {
    let mapData = [];
    await fetchApiData(Route.inspectionData + `/${id}`, "current")
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          console.log("mapping data", response.data);
          for (const data of response.data) {
            mapData.push(data.project_data.project_data);
          }
          setMappingDatas(mapData);
          setIsLoading(false);
          return;

          // setInspectionDatas(response.data);
        } else if (response.status === 404) {
          setIsLoading(false);
          toast.warning("No mapping data yet");
          return;
        } else {
          setIsLoading(false);
          toast.error("Something went wrong. Please refresh");
          return;
        }
      })
      .catch((error) => {
        setIsLoading((prev) => !prev);
        console.log(error);
        toast.error("Something went wrong. Please refresh this page");
      });
  }


  // FETCH DATA OF SINGLE MAPPING PROJECT
  useEffect(() => {
    fetchAllMappingData("cm3lg7sdw000bcic9x8h219zj");
  }, []);

  return (
    <div className=" p-6 md:w-full h-screen">
      <h1 className="text-center pb-5 font-semibold text-lg flex justify-center">
        Data collected from field
      </h1>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : mappingDatas.length ? (
        <>
          <div className="">
            <table>
              <thead className="">
                <tr>
                  {MappingTableColumns?.map((item, idx) => (
                    <th className="px-2 border" key={idx}>
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white">
                {mappingDatas?.map((item, idx) => (
                  <tr key={idx}>
                    {/* <td className="px-2 border w-fit">{idx + 1}</td> */}
                    <td>{idx + 1}</td>
                    <td className="px-2 border">{item.farmer_name}</td>
                    <td className="px-2 border">{item.farmer_status}</td>
                    <td className="px-2 border">{item.farmer_contact}</td>
                    <td className="px-2 border">
                      {item.farmer_ID_card_number}
                    </td>
                    <td className="px-2 border">
                      {item.plantation_creation_date}
                    </td>
                    <td className="px-2 border">{item.village}</td>
                    <td className="px-2 border">{item.collector_name}</td>
                    <td className="px-2 border">{item.date}</td>
                    <td className="px-2 border">{item.estimated_area}</td>
                    <td className="px-2 border">
                      {typeof item !== "undefined"
                        ? item.plantation_photos?.map((photo, idx) => (
                            <div
                              className="max-h-[300px] overflow-y-auto"
                              key={idx}
                            >
                              <Link className="" target="_blank" href={photo}>
                                <img
                                  className="h-[100px] w-[500px]"
                                  src={photo}
                                  alt={
                                    typeof item !== "undefined"
                                      ? item.farmer_name
                                      : ""
                                  }
                                  // height={100}
                                  // width={100}
                                />
                                <div className="w-[200px] hover:underline truncate text-blue-500">
                                  {photo}
                                </div>
                              </Link>
                            </div>
                          ))
                        : ""}
                    </td>
                    <td className="px-2 border">
                      {typeof item !== "undefined"
                        ? item.farmer_photos?.map((photo, idx) => (
                            <div
                              className="max-h-[300px] overflow-y-auto"
                              key={idx}
                            >
                              <Link className="" target="_blank" href={photo}>
                                <img
                                  className="h-[100px] w-[500px]"
                                  src={photo}
                                  alt={
                                    typeof item !== "undefined"
                                      ? item.farmer_name
                                      : ""
                                  }
                                  // height={100}
                                  // width={100}
                                />
                                <div className="w-[200px] hover:underline truncate text-blue-500">
                                  {typeof item !== "undefined"
                                    ? item.farmer_photos[idx]
                                    : ""}
                                </div>
                              </Link>
                            </div>
                          ))
                        : ""}
                    </td>
                    <td className="px-2 border flex flex-col gap-2 max-h-[250px] overflow-y-scroll">
                      {typeof item !== "undefined"
                        ? item.coordinates?.map((coord: any, i: number) => (
                            <div className="flex border-b gap-2" key={i + 1.1}>
                              <span className="">long:{coord.longitude}</span>
                              <span className="">lat:{coord.latitude}</span>
                            </div>
                          ))
                        : ""}
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            convertToKml(item.farmer_name, item.coordinates)
                          }
                          className="bg-tertiary text-white mb-2 p-2 hover:rounded-full"
                        >
                          <a
                            href={`data:application/vnd.google-earth,${encodeURIComponent(
                              kmlFile
                            )}`}
                            download={
                              slugify(
                                typeof item !== "undefined" || ""
                                  ? item.farmer_name
                                  : "Polygone_plantation"
                              ) + ".kml"
                            }
                          >
                            Export as kml
                          </a>
                        </button>
                        <button
                          onClick={() =>
                            downloadGeoJSON(item.coordinates, item.farmer_name)
                          }
                          className="bg-tertiary text-white mb-2 py-1 hover:rounded-full"
                        >
                          export as geojson
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-center gap-4">
              <Button
                className="mt-4 text-white bg-blue-500 hover:bg-blue-500 hover:rounded-full"
                onClick={() => mappingCsvDownload(mappingDatas, coordinates)}
              >
                Export as excell sheet
              </Button>
              <Button
                variant={"outline"}
                className="mt-4 border hover:bg-green-500 bg-green-500 text-white  hover:rounded-full hover:text-white"
                onClick={downloadAllTokml}
              >
                <a
                  href={`data:application/vnd.google-earth,${encodeURIComponent(
                    allKmlFiles
                  )}`}
                  download={"Polygons.kml"}
                >
                  Export all as kml
                </a>
              </Button>
            </div>
          </div>
        </>
      ) : (
        <p className="flex justify-center mx-auto md:pt-30">
          No Data collected yet
        </p>
      )}
    </div>
  );
}
