import { Button } from "@/components/ui/button";
import { mappingData, MappingTableColumns } from "@/utiles/services/constants";
import React, { useState } from "react";
import XLSX from "sheetjs-style";
import * as FileSaver from "file-saver";

type Props = {};

export default function MappingData({}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const exportExcel = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8";
    const fileExtention = ".xlsx";
    const fileName = "données_mapping";

    const ws = XLSX.utils.json_to_sheet(mappingData);
    const wb = { Sheets: { data: ws }, sheetNames: ["data"] };
    const excellBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excellBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtention);
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
        <Button
          className="flex justify-center mx-auto mt-4 items-center bg-black hover:bg-black hover:rounded-full"
          onClick={exportExcel}
        >
          Export as excell sheet
        </Button>
      </div>
    </div>
  );
}
