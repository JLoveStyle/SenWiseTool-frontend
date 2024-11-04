import { Button } from "@/components/ui/button";
import {
  columns,
  mappingData,
  MappingTableColumns,
} from "@/utiles/services/constants";
import React, { useState, useEffect } from "react";
import xlsx, { IJsonSheet } from "json-as-xlsx";
import tokml from "tokml";
import slugify from "slugify";
import Link from "next/link";
import Image from "next/image";
import { fetchApiData } from "@/utiles/services/queries";
import { Route } from "@/lib/route";
import { toast } from "react-toastify";
import { MappingDataType } from "@/types/api-types";
import { Spinner } from "@/components/atoms/spinner/spinner";

type Props = {
  project_id: string;
};

export default function MappingData({ project_id }: Props) {
  const [kmlFile, setKmlFile] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [mappingDatas, setMappingDatas] = useState<MappingDataType[]>([]);

  const coordinates: { [key: string]: string }[] = [];
  for (const cord of mappingData) {
    coordinates.push(cord.coordinate);
  }

  // Download excell sheet
  const downloadExcell = () => {
    const cordinateColumns: IJsonSheet[] = [
      {
        sheet: "Farm_cordinates",
        columns: [
          {
            label: "Longitude",
            value: "log",
          },
          {
            label: "Latitude",
            value: "lat",
          },
        ],
        content: coordinates.flat(),
      },
    ];

    const settings = {
      fileName: "Mapping_data", // Name of the resulting spreadsheet
      extraLength: 3, // A bigger number means that columns will be wider
      writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
      writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
    };

    xlsx(columns, settings);
    xlsx(cordinateColumns, settings);
  };

  // EXPORT AS GEOJSON
  const exportAsGeojson = (
    name: string,
    village: string,
    surfaceArea: string,
    code: string
  ) => {};

  // construct coordinates for polygon of type [][][] from {long: , lat:}[] form field
  const constructCordinates = (
    coordinates: { longitude: number; latitude: number }[]
  ) => {
    const finalCordinates: any[] = [];
    let selObject: any[] = [];
    for (const coordinate of coordinates) {
      selObject.push(Object.values(coordinate));
    }
    finalCordinates.push(selObject);
    return finalCordinates;
  };

  // CONVERT TO KML FILE
  const convertTokml = (
    name: string,
    village: string,
    surfaceArea: string,
    code: string,
    coordinates: { latitude: number; longitude: number }[]
  ) => {
    const finalCordinates = constructCordinates(coordinates);
    const polygon = {
      type: "Feature",
      properties: {
        name: name,
        code: code,
        superficie: surfaceArea,
        village: village,
        description: `Ce polygone illustre la plantation de Mr ${name} situé au village ${village} qui s'étant sur une superficie de ${surfaceArea} `,
      },
      geometry: {
        type: "Polygon",
        coordinates: finalCordinates,
      },
    };

    const kml = tokml(polygon, {
      name: name,
      description: `Ce polygone montre la plantation de Mr ${name} situé au village ${village} qui s'étant sur une superficie de ${surfaceArea} `,
    });
    setKmlFile(kml);
  };

  // DOWNLOAD ALL FILES AS A SINGLE KML FILE
  const downloadTokml = () => {
    console.log(
      `data:application/vnd.google-earth,${encodeURIComponent(kmlFile)}`
    );
  };

  async function fetchAllMappingData(id: string) {
    await fetchApiData(Route.inspectionData + `/${id}`, "current")
      .then((response) => {
        if (response.status === 201) {
          console.log("mapping data", response.data);
          setMappingDatas(response.data);
          setIsLoading(false);
          return;

          // setInspectionDatas(response.data);
        } else if (response.status === 404) {
          setIsLoading((prev) => !prev);
          toast.warning("No mapping data yet");
          return;
        } else {
          setIsLoading(false);
          toast.error("Could not fetch inspection data of this project");
          return;
        }
      })
      .catch((error) => {
        setIsLoading((prev) => !prev);
        console.log(error);
        toast.error("Something went wrong. Please refresh this page");
      });
  }

  console.log("MApping data\n\n =>", mappingDatas[0]?.project_data.project_data.farmer_name);

  // FETCH DATA OF SINGLE MAPPING PROJECT
  useEffect(() => {
    fetchAllMappingData("cm2qoqb3r00074lymnp0qpmtu");
  }, []);

  return (
    <div className=" p-6 md:w-full h-screen">
      <h1 className="text-center pb-5 font-semibold text-lg flex justify-center">
        Data collected from field
      </h1>
      <div className="">
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Spinner />
          </div>
        ) : (
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
                <tr key={item.id}>
                  <td className="px-2 border w-fit">{idx + 1}</td>
                  <td className="px-2 border">
                    {item.project_data.project_data.farmer_name}
                  </td>
                  <td className="px-2 border">
                    {item.project_data.project_data.farmer_status}
                  </td>
                  <td className="px-2 border">
                    {item.project_data.project_data.farmer_contact}
                  </td>
                  <td className="px-2 border">
                    {item.project_data.project_data.farmer_ID_card_number}
                  </td>
                  <td className="px-2 border">
                    {item.project_data.project_data.plantation_creation_date}
                  </td>
                  <td className="px-2 border">
                    {item.project_data.project_data.village}
                  </td>
                  <td className="px-2 border">
                    {item.project_data.project_data.collector_name}
                  </td>
                  <td className="px-2 border">
                    {item.project_data.project_data.date}
                  </td>
                  <td className="px-2 border">
                    {item.project_data.project_data.estimated_area}
                  </td>
                  <td className="px-2 border">
                    {item.project_data.project_data.plantation_photos?.map(
                      (photo, idx) => (
                        <div
                          className="max-h-[300px] overflow-y-auto"
                          key={idx}
                        >
                          <Link
                            className=""
                            target="_blank"
                            href={
                              item.project_data.project_data.plantation_photos[
                                idx
                              ]
                            }
                          >
                            <img
                              className="h-[100px] w-[500px]"
                              src={
                                item.project_data.project_data
                                  .plantation_photos[idx]
                              }
                              alt={item.project_data.project_data.farmer_name}
                              // height={100}
                              // width={100}
                            />
                            <div className="w-[200px] hover:underline truncate text-blue-500">
                              {
                                item.project_data.project_data
                                  .plantation_photos[idx]
                              }
                            </div>
                          </Link>
                        </div>
                      )
                    )}
                  </td>
                  <td className="px-2 border">
                    {item.project_data.project_data.farmer_photos?.map(
                      (photo, idx) => (
                        <div
                          className="max-h-[300px] overflow-y-auto"
                          key={idx}
                        >
                          <Link
                            className=""
                            target="_blank"
                            href={
                              item.project_data.project_data.farmer_photos[idx]
                            }
                          >
                            <img
                              className="h-[100px] w-[500px]"
                              src={
                                item.project_data.project_data.farmer_photos[
                                  idx
                                ]
                              }
                              alt={item.project_data.project_data.farmer_name}
                              // height={100}
                              // width={100}
                            />
                            <div className="w-[200px] hover:underline truncate text-blue-500">
                              {
                                item.project_data.project_data.farmer_photos[
                                  idx
                                ]
                              }
                            </div>
                          </Link>
                        </div>
                      )
                    )}
                  </td>
                  <td className="px-2 border flex flex-col gap-2 max-h-[250px] overflow-y-scroll">
                    {item.project_data.project_data.coordinates?.map(
                      (coord: any, i: number) => (
                        <div className="flex border-b gap-2" key={i + 1.1}>
                          <span className="">long:{coord.longitude}</span>
                          <span className="">lat:{coord.latitude}</span>
                          {/* <span key={i + 110}>long:{coord.log}</span>
                      <span className="border-b" key={i + 1.5}>
                        lat:{coord.lat}
                      </span> */}
                        </div>
                      )
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          convertTokml(
                            item.project_data.project_data.farmer_name,
                            item.project_data.project_data.village,
                            item.project_data.project_data.estimated_area,
                            item.id, // this should be the farmer code
                            item.project_data.project_data.coordinates
                          )
                        }
                        className="bg-tertiary text-white mb-2 p-2 hover:rounded-full"
                      >
                        <a
                          href={`data:application/vnd.google-earth,${encodeURIComponent(
                            kmlFile
                          )}`}
                          download={
                            slugify(
                              item.project_data.project_data.farmer_name
                            ) + ".kml"
                          }
                        >
                          Export as kml
                        </a>
                      </button>
                      <button className="bg-tertiary text-white mb-2 py-1 hover:rounded-full">
                        <a
                          href={`data:application/vnd.google-earth,${encodeURIComponent(
                            kmlFile
                          )}`}
                          download={
                            slugify(
                              item.project_data.project_data.farmer_name
                            ) + ".geojson"
                          }
                        >
                          Export as geoJson
                        </a>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="flex justify-center gap-4">
          <Button
            className="mt-4 text-white bg-blue-500 hover:bg-blue-500 hover:rounded-full"
            onClick={downloadExcell}
          >
            Export as excell sheet
          </Button>
          <Button
            variant={"outline"}
            className="mt-4 border hover:bg-green-500 bg-green-500 text-white  hover:rounded-full hover:text-white"
            onClick={downloadTokml}
          >
            Export all as kml
          </Button>
        </div>
      </div>
    </div>
  );
}
