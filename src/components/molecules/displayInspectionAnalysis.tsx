import { InspectionDataType } from "@/types/api-types";
import React from "react";

type Props = {
  inspectionData?: InspectionDataType;
};

export default function DisplayInspectionAnalysis({ inspectionData }: Props) {
  console.log("result from comp", inspectionData);
  // Pourcentage C par chapitre
  const pourcentageC = (totalConforme: number, totalApplicable: number) => {
    return (totalConforme / totalApplicable) * 100;
  };

  // Pourcentage NC par chap
  const pourcentageNC = (totalNc: number, totalA: number) => {
    return (totalNc / totalA) * 100;
  };

  // Pourcentage NA par chap
  const pourcentageNA = (totalNA: number, totalA: number) => {
    return (totalNA / totalA) * 100;
  };

  // %tage general

  return (
    <>
      <h1 className="font-bold text-center">Pourcentage par chapitre</h1>
      <div className="flex gap-4 justify-evenly ">
        <div className="">
          <h1 className="font-semibold py-3 ">Chapitre 1</h1>
          <ul>
            <li className="list-disc font-bold">
              C:{" "}
              {pourcentageC(
                inspectionData?.chapter1.C ?? 0,
                inspectionData?.total_A ?? 1
              )}{" "}
              %
            </li>
            <li className="list-disc font-bold">
              NC:{" "}
              {pourcentageNC(
                inspectionData?.chapter1.NC ?? 0,
                inspectionData?.total_A ?? 1
              )}{" "}
              %
            </li>
            <li className="list-disc font-bold">
              NA:{" "}
              {pourcentageNA(
                inspectionData?.chapter1.NA ?? 0,
                inspectionData?.total_A ?? 1
              )}{" "}
              %
            </li>
          </ul>

          <h1 className="font-semibold py-3">Chapitre 2</h1>
          <ul className="">
            <li className="list-disc font-bold">
              C:{" "}
              {pourcentageC(
                inspectionData?.chapter2.C ?? 0,
                inspectionData?.total_A ?? 1
              )}{" "}
              %
            </li>
            <li className="list-disc font-bold">
              NC:{" "}
              {pourcentageNC(
                inspectionData?.chapter2.NC ?? 0,
                inspectionData?.total_A ?? 1
              )}{" "}
              %
            </li>
            <li className="list-disc font-bold">
              NA:{" "}
              {pourcentageNA(
                inspectionData?.chapter2.NA ?? 0,
                inspectionData?.total_A ?? 1
              )}{" "}
              %
            </li>
          </ul>
          <h1 className="font-semibold py-3">Chapitre 3</h1>
          <ul className="">
            <li className="list-disc font-bold">
              C:{" "}
              {pourcentageC(
                inspectionData?.chapter3.C ?? 0,
                inspectionData?.total_A ?? 1
              )}{" "}
              %
            </li>
            <li className="list-disc font-bold">
              NC:{" "}
              {pourcentageNC(
                inspectionData?.chapter3.NC ?? 0,
                inspectionData?.total_A ?? 1
              )}{" "}
              %
            </li>
            <li className="list-disc font-bold">
              NA:{" "}
              {pourcentageNA(
                inspectionData?.chapter3.NA ?? 0,
                inspectionData?.total_A ?? 1
              )}{" "}
              %
            </li>
          </ul>
        </div>
        <div>
          <h1 className="font-semibold py-3 ">Chapitre 4</h1>
          <ul className="">
            <li className="list-disc font-bold">
              C:{" "}
              {pourcentageC(
                inspectionData?.chapter4.C ?? 0,
                inspectionData?.total_A ?? 1
              )}{" "}
              %
            </li>
            <li className="list-disc font-bold">
              NC:{" "}
              {pourcentageNC(
                inspectionData?.chapter4.NC ?? 0,
                inspectionData?.total_A ?? 1
              )}{" "}
              %
            </li>
            <li className="list-disc font-bold">
              NA:{" "}
              {pourcentageNA(
                inspectionData?.chapter4.NA ?? 0,
                inspectionData?.total_A ?? 1
              )}{" "}
              %
            </li>
          </ul>
          <h1 className="font-semibold py-3 ">Chapitre 5</h1>
          <ul className="">
            <li className="list-disc font-bold">
              C:{" "}
              {pourcentageC(
                inspectionData?.chapter5.C ?? 0,
                inspectionData?.total_A ?? 1
              )}{" "}
              %
            </li>
            <li className="list-disc font-bold">
              NC:{" "}
              {pourcentageNC(
                inspectionData?.chapter5.NC ?? 0,
                inspectionData?.total_A ?? 1
              )}{" "}
              %
            </li>
            <li className="list-disc font-bold">
              NA:{" "}
              {pourcentageNA(
                inspectionData?.chapter5.NA ?? 0,
                inspectionData?.total_A ?? 1
              )}{" "}
              %
            </li>
          </ul>
          <h1 className="font-semibold py-3 ">Chapitre 6</h1>
          <ul className="">
            <li className="list-disc font-bold">
              C:{" "}
              {pourcentageC(
                inspectionData?.chapter6.C ?? 0,
                inspectionData?.total_A ?? 1
              )}
              %
            </li>
            <li className="list-disc font-bold">
              NC:{" "}
              {pourcentageNC(
                inspectionData?.chapter6.NC ?? 0,
                inspectionData?.total_A ?? 1
              )}{" "}
              %
            </li>
            <li className="list-disc font-bold">
              NA:{" "}
              {pourcentageNA(
                inspectionData?.chapter6.NA ?? 0,
                inspectionData?.total_A ?? 1
              )}{" "}
              %
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center py-3">
        <h1 className="font-bold py-3 ">Pourcentage general</h1>
        <ul className="">
          <li className="list-disc font-bold">C: 14%</li>
          <li className="list-disc font-bold">NC: 75%</li>
          <li className="list-disc font-bold">NA: 25%</li>
        </ul>
      </div>
    </>
  );
}
