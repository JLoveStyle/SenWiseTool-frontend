"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import DisplayInspectionAnalysis from "./displayInspectionAnalysis";
import { InspectionDataPops } from "@/types/api-types";
import { LOCAL_STORAGE } from "@/utiles/services/storage";

type Props = {
  incomingData?: InspectionDataPops;
};

export default function DisplaySingleInspectionData({ incomingData }: Props) {
  const [displayTable, setDipslayTable] = useState<boolean>(true);
  const [displayStatistics, setDipslayStatistics] = useState<boolean>(false);
  const [displayConclusion, setDisplayConclusion] = useState<boolean>(false)
  // Headings to display
  const headings: string[] = ["Data", "Statistics", "Conclusion"];

  const resultData = LOCAL_STORAGE.get('insection-data')
  // const resultData: InspectionDataType = JSON.parse(localStorage.getItem('insection-data') || '{}')

  return (
    <div className="max-h-[700px] px-3 py-4">
      <p className="text-white">.</p>
      <Tabs
        defaultValue={headings[0]}
        className=" flex justify-center mx-auto pb-5"
      >
        <TabsList className={`grid w-full grid-cols-${headings.length}`}>
          {headings.map((item, idx) => (
            <TabsTrigger
              key={idx}
              value={item}
              onClick={() => {
                if (item === "Data") {
                  setDipslayTable(true);
                  setDipslayStatistics(false);
                  setDisplayConclusion(false)
                } else if (item === "Statistics") {
                  setDipslayTable(false);
                  setDipslayStatistics(true);
                  setDisplayConclusion(false)
                } else if (item === 'Conclusion') {
                  setDisplayConclusion(true)
                  setDipslayTable(false);
                  setDipslayStatistics(false);
                }
              }}
            >
              {item}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      {displayTable && (
        <div className="overflow-y-auto md:max-h-[500px]">
          <Table>
            <TableCaption>Données d'une plantation.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>N° exigence</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Comments</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incomingData?.project_data.project_data.requirements.map(
                (item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.req_number}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.comment}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>
      )}
      {displayStatistics && (
        <div className="overflow-y-auto md:max-h-[500px]">
          <DisplayInspectionAnalysis inspectionData={resultData}/>
        </div>
      )}
      {displayConclusion && (
        <div className="md:max-h-[500px] overflow-y-auto">
          Here is conclusion
        </div>
      )}
    </div>
  );
}
