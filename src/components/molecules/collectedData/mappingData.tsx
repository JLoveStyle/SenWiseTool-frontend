import { Button } from "@/components/ui/button";
import { mappingData, MappingTableColumns } from "@/utiles/services/constants";
import React, { useState } from "react";
import XLSX from "sheetjs-style";
import * as FileSaver from "file-saver";
import xlsx, { IJsonSheet } from "json-as-xlsx";

type Props = {};

export default function MappingData({}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // const exportExcel = () => {
  //   const fileType =
  //     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8";
  //   const fileExtention = ".xlsx";
  //   const fileName = "données_mapping";

  //   const ws = XLSX.utils.json_to_sheet(mappingData);
  //   const wb = { Sheets: { data: ws }, sheetNames: ["data"] };
  //   console.log(wb)
  //   const excellBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  //   console.log(excellBuffer)
  //   const data = new Blob([excellBuffer], { type: fileType });
  //   FileSaver.saveAs(data, fileName + fileExtention);
  // };

  const downloadExcell = () => {
    const columns: IJsonSheet[] = [
      {
        sheet: "Données_Mapping",
        columns: [
          {
            label: "Nom du producteur",
            value: "nom_producteur",
          },
          {
            label: "statut du producteur",
            value: "statut_producteur",
          },
          {
            label: "N° CNI",
            value: "no_cni",
          },
          {
            label: "Date de creation de la plantation",
            value: "date_de_creation_plant",
          },
          {
            label: "Village",
            value: "village",
          },
          {
            label: "Nom du mappeur",
            value: "nom_du_mappeur",
          },
          {
            label: "Date",
            value: "date",
          },
          {
            label: "Superficie estimé",
            value: "superficie_estimé",
          },
          {
            label: "Photo de la plantation",
            value: "photo_plantation",
          },
          {
            label: "Photo planteur",
            value: "photo_planteur",
          },
          {
            label: "Coordonées",
            value: "coordinate",
          },
        ],
        content: mappingData,
      },
    ];

    const settings = {
      fileName: "Mapping_data", // Name of the resulting spreadsheet
      extraLength: 3, // A bigger number means that columns will be wider
      writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
      writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
    };

    xlsx(columns, settings);
  };

  

  // FETCH ALL PROJECTS OF TYPE MAPPING

  return (
    <div className=" p-6 md:w-full h-screen">
      <h1 className="text-center pb-5 font-semibold text-lg flex justify-center">
        Data collected from field
      </h1>
      <div className="">
        <table>
          <thead className="">
            <tr>
              {MappingTableColumns.map((item, idx) => (
                <th className="px-2 border" key={idx}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {mappingData.map((item, idx) => (
              <tr key={idx}>
                <td className="px-2 border w-fit">{idx + 1}</td>
                <td className="px-2 border">{item.nom_producteur}</td>
                <td className="px-2 border">{item.statut_producteur}</td>
                <td className="px-2 border">{item.contact_du_producteur}</td>
                <td className="px-2 border">{item.no_cni}</td>
                <td className="px-2 border">{item.date_de_creation_plant}</td>
                <td className="px-2 border">{item.village}</td>
                <td className="px-2 border">{item.nom_du_mappeur}</td>
                <td className="px-2 border">{item.date}</td>
                <td className="px-2 border">{item.superficie_estimé}</td>
                <td className="px-2 border">{item.photo_plantation}</td>
                <td className="px-2 border">{item.photo_planteur}</td>
                <td className="px-2 border flex flex-col gap-2 max-h-[250px] overflow-y-scroll">
                  {item.coordinate?.map((coord: any, i: number) => (
                    <>
                      <span key={i}>long:{coord.log}</span>
                      <span className="border-b" key={i}>
                        lat:{coord.lat}
                      </span>
                    </>
                  ))}
                  <button className="bg-tertiary text-white mb-2 py-1 rounded-lg">
                    Export
                  </button>
                </td>
                {/* <td className="px-2 border">
                  <button>Export</button>
                </td> */}
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
            className="mt-4 border hover:bg-green-500 bg-green-500 text-white  hover:rounded-full"
            
          >
            Export as kml
          </Button>
        </div>
      </div>
    </div>
  );
}
