import { Button } from "@/components/ui/button";
import { mappingData, MappingTableColumns } from "@/utiles/services/constants";
import React, { useState, useEffect } from "react";
import xlsx, { IJsonSheet } from "json-as-xlsx";
import slugify from "slugify";
import Link from "next/link";
import Image from "next/image";
import { fetchApiData } from "@/utiles/services/queries";
import { Route } from "@/lib/route";
import { MappingDataType, MappingProjectData } from "@/types/api-types";
import { Spinner } from "@/components/atoms/spinner/spinner";
import { toast } from "react-toastify";
// import { tokml } from "tokml";
import tokml from "geojson-to-kml";

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

  // Download excell sheet
  const downloadExcell = () => {
    // COLUMNS FOR EXCELL SHEET
    const columns: IJsonSheet[] = [
      {
        sheet: "Données_Mapping",
        columns: [
          {
            label: "Nom du producteur",
            value: "farmer_name",
          },
          {
            label: "Contact du planteur",
            value: "farmer_contact",
          },

          {
            label: "statut du producteur",
            value: "farmer_status",
          },
          {
            label: "N° CNI",
            value: "farmer_ID_card_number",
          },
          {
            label: "Date de creation de la plantation",
            value: "plantation_creation_date",
          },
          {
            label: "Village",
            value: "village",
          },
          {
            label: "Nom du mappeur",
            value: "collector_name",
          },
          {
            label: "Date",
            value: "date",
          },
          {
            label: "Superficie estimé",
            value: "estimated_area",
          },
          {
            label: "Photo de la plantation",
            value: "plantation_photos[0]",
          },
          {
            label: "Photo planteur",
            value: "farmer_photos[0]",
          },
          {
            label: "Coordonées",
            value: "coordinates",
          },
        ],
        content: mappingDatas as any[],
      },
    ];

    const cordinateColumns: IJsonSheet[] = [
      {
        sheet: "Farm_cordinates",
        columns: [
          {
            label: "Longitude",
            value: "longitude",
          },
          {
            label: "Latitude",
            value: "latitude",
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
    xlsx(cordinateColumns, {
      fileName: "Mapping_coordinates",
      extraLength: 3,
      writeMode: "writeFile",
    });
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

  // DOWNLOAD SINGLE GEOJSON FILE
  const downloadGeoJSON = (
    coordinates: { longitude: number; latitude: number }[],
    name: string
  ) => {
    const geoJsonData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: constructCordinates(coordinates),
          },
          properties: {
            name: name,
            // area: surfaceArea,
            // image: image
          },
        },
      ],
    };

    const blob = new Blob([JSON.stringify(geoJsonData)], {
      type: "application/geo+json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = (name+'.geojson').replaceAll(" ", ""); // removes white space ithin the string
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  //DOWNLOAD SINGLE KML FILE
  function convertToKml(
    name: string,
    coordinates: { latitude: number; longitude: number }[]
  ) {
    console.log("hello");

    const geoJsonData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "Polygon",
            coordinates: constructCordinates(coordinates),
          },
          properties: {
            name: name,
            // area: surfaceArea,
            // image: image
          },
        },
      ],
    };
    const kmlDataFile = tokml(geoJsonData)
    setKmlFile(kmlDataFile);
  }

  // DOWNLOAD ALL KML FILES AS A SINGLE KML FILE
  const downloadTokml = () => {
    let mergedGeoJson: { type: string; features: any[] } = {
      type: "FeatureCollection",
      features: [],
    };

    let globalGeoJson = mappingDatas.map((data) => ({
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: constructCordinates(data.coordinates),
      },
      properties: {
        name: data.farmer_name,
      },
    }));
    console.log("globalGeoJson", globalGeoJson);
    mergedGeoJson["features"] = globalGeoJson;
    console.log("Merged geojson\n =>", mergedGeoJson);
    setAllKmlFiles(tokml(mergedGeoJson));
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
    fetchAllMappingData("cm3c2d2xw0002ejml2e8it3af");
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
                onClick={downloadExcell}
              >
                Export as excell sheet
              </Button>
              <Button
                variant={"outline"}
                className="mt-4 border hover:bg-green-500 bg-green-500 text-white  hover:rounded-full hover:text-white"
                onClick={downloadTokml}
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
