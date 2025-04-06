import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InspectionConclusionDataType } from "@/types/api-types";
import React from "react";

type Props = {
  conclusionData: InspectionConclusionDataType;
};

export default function Inspectionconclusion({ conclusionData }: Props) {
  return (
    <div className="">
      <h1 className="font-semibold text-center">
        Recommendations de non conformité
      </h1>
      <div className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>N°</TableHead>
              <TableHead>Commentaire</TableHead>
              <TableHead>Delai</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {conclusionData?.nonConformityRecom &&
              conclusionData?.nonConformityRecom.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.req_number}</TableCell>
                  <TableCell>{item.comment}</TableCell>
                  <TableCell>{item.deadline}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="py-4">
        <div className="py-4">
          <span>Recommendation pour l'année prochaine: </span>
          <p className="font-semibold">
            {conclusionData?.metadata.nextYearRecom ?? ""}
          </p>
        </div>
        <div className="flex justify-between">
          <div className="">
            <p className="font-semibold pb-4">Signature agent</p>
            <img
              src={conclusionData.metadata.agent_signature}
              alt="agent_signature"
            />
          </div>
          <div className="">
            <p className="font-semibold pb-4">Signature planteur</p>
            <img
              src={conclusionData.metadata.farmer_signature}
              alt="agent_signature"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
