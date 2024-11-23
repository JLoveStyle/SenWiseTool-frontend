import { InspectionDataType } from "@/types/api-types";
import React from "react";

type Props = {
  inspectionData?: InspectionDataType;
  totalQuestions?: number // this is the total number of requirements times the number of farmers
};

export default function DisplayInspectionAnalysis({ inspectionData, totalQuestions }: Props) {
  console.log("result from comp", inspectionData);
  // Pourcentage C par Chapter
  const pourcentageC = (totalConforme: number, totalApplicable: number) => {
    return ((totalConforme / totalApplicable) * 100).toFixed(2);
  };

  // Pourcentage NC par chap
  const pourcentageNC = (totalNc: number, totalA: number) => {
    return ((totalNc / totalA) * 100).toFixed(2);
  };

  // Pourcentage NA par chap
  const pourcentageNA = (totalNA: number, totalA: number) => {
    return ((totalNA / totalA) * 100).toFixed(2);
  };

  // %tage general
  const pourcentageGeneral = () => {
    let total: { C: number; NC: number; NA: number } = {
      C: 0,
      NC: 0,
      NA: 0,
    };
    Object.values(inspectionData as {}).forEach((item: any) => {
      if (typeof item === "object") {
        total["C"] += item.C;
        total["NA"] += item.NA;
        total["NC"] += item.NC;
      }
    });

    console.log('in %tage general =>', total)

    return total;
  };

  return (
    <>
      <h1 className="font-bold text-center pt-2">Percentages per chapters</h1>
      <div className="flex gap-4 justify-evenly ">
        <div className="">
          <h1
            className="font-semibold py-3 "
            onClick={() => pourcentageGeneral()}
          >
            Chapter 1
          </h1>
          <ul>
            <li className="list-disc font-bold">
              C:{" "}
              {pourcentageC(
                inspectionData?.chapter1.C ?? 0,
                inspectionData?.chapter1.TA && inspectionData?.chapter1.TA > 0
                  ? (inspectionData?.chapter1.TA as number)
                  : 1
              )}{" "}
              %
            </li>
            <li className="list-disc font-bold">
              NC:{" "}
              {pourcentageNC(
                inspectionData?.chapter1.NC ?? 0,
                inspectionData?.chapter1.TA && inspectionData?.chapter1.TA > 0
                  ? (inspectionData?.chapter1.TA as number)
                  : 1
              )}{" "}
              %
            </li>
            <li className="list-disc font-bold">
              NA:{" "}
              {pourcentageNA(
                inspectionData?.chapter1.NA ?? 0,
                inspectionData?.chapter1.TA && inspectionData?.chapter1.TA > 0
                  ? (inspectionData?.chapter1.TA as number)
                  : 1
              )}{" "}
              %
            </li>
          </ul>

          <h1 className="font-semibold py-3">Chapter 2</h1>
          <ul className="">
            <li className="list-disc font-bold">
              C:{" "}
              {pourcentageC(
                inspectionData?.chapter2.C ?? 0,
                inspectionData?.chapter2.TA && inspectionData?.chapter2.TA > 0
                  ? (inspectionData?.chapter2.TA as number)
                  : 1
              )}{" "}
              %
            </li>
            <li className="list-disc font-bold">
              NC:{" "}
              {pourcentageNC(
                inspectionData?.chapter2.NC ?? 0,
                inspectionData?.chapter2.TA && inspectionData?.chapter2.TA > 0
                  ? (inspectionData?.chapter2.TA as number)
                  : 1
              )}{" "}
              %
            </li>
            <li className="list-disc font-bold">
              NA:{" "}
              {pourcentageNA(
                inspectionData?.chapter2.NA ?? 0,
                inspectionData?.chapter2.TA && inspectionData?.chapter2.TA > 0
                  ? (inspectionData?.chapter2.TA as number)
                  : 1
              )}{" "}
              %
            </li>
          </ul>
          <h1 className="font-semibold py-3">Chapter 3</h1>
          <ul className="">
            <li className="list-disc font-bold">
              C:{" "}
              {pourcentageC(
                inspectionData?.chapter3.C ?? 0,
                inspectionData?.chapter3.TA && inspectionData?.chapter3.TA > 0
                  ? (inspectionData?.chapter3.TA as number)
                  : 1
              )}{" "}
              %
            </li>
            <li className="list-disc font-bold">
              NC:{" "}
              {pourcentageNC(
                inspectionData?.chapter3.NC ?? 0,
                inspectionData?.chapter3.TA && inspectionData?.chapter3.TA > 0
                  ? (inspectionData?.chapter3.TA as number)
                  : 1
              )}{" "}
              %
            </li>
            <li className="list-disc font-bold">
              NA:{" "}
              {pourcentageNA(
                inspectionData?.chapter3.NA ?? 0,
                inspectionData?.chapter3.TA && inspectionData?.chapter3.TA > 0
                  ? (inspectionData?.chapter3.TA as number)
                  : 1
              )}{" "}
              %
            </li>
          </ul>
        </div>
        <div>
          <h1 className="font-semibold py-3 ">Chapter 4</h1>
          <ul className="">
            <li className="list-disc font-bold">
              C:{" "}
              {pourcentageC(
                inspectionData?.chapter4.C ?? 0,
                inspectionData?.chapter4.TA && inspectionData?.chapter4.TA > 0
                  ? (inspectionData?.chapter4.TA as number)
                  : 1
              )}{" "}
              %
            </li>
            <li className="list-disc font-bold">
              NC:{" "}
              {pourcentageNC(
                inspectionData?.chapter4.NC ?? 0,
                inspectionData?.chapter4.TA && inspectionData?.chapter4.TA > 0
                  ? (inspectionData?.chapter4.TA as number)
                  : 1
              )}{" "}
              %
            </li>
            <li className="list-disc font-bold">
              NA:{" "}
              {pourcentageNA(
                inspectionData?.chapter4.NA ?? 0,
                inspectionData?.chapter4.TA && inspectionData?.chapter4.TA > 0
                  ? (inspectionData?.chapter4.TA as number)
                  : 1
              )}{" "}
              %
            </li>
          </ul>
          <h1 className="font-semibold py-3 ">Chapter 5</h1>
          <ul className="">
            <li className="list-disc font-bold">
              C:{" "}
              {pourcentageC(
                inspectionData?.chapter5.C ?? 0,
                inspectionData?.chapter5.TA && inspectionData?.chapter5.TA > 0
                  ? (inspectionData?.chapter5.TA as number)
                  : 1
              )}{" "}
              %
            </li>
            <li className="list-disc font-bold">
              NC:{" "}
              {pourcentageNC(
                inspectionData?.chapter5.NC ?? 0,
                inspectionData?.chapter5.TA && inspectionData?.chapter5.TA > 0
                  ? (inspectionData?.chapter5.TA as number)
                  : 1
              )}{" "}
              %
            </li>
            <li className="list-disc font-bold">
              NA:{" "}
              {pourcentageNA(
                inspectionData?.chapter5.NA ?? 0,
                inspectionData?.chapter5.TA && inspectionData?.chapter5.TA > 0
                  ? (inspectionData?.chapter5.TA as number)
                  : 1
              )}{" "}
              %
            </li>
          </ul>
          <h1 className="font-semibold py-3 ">Chapter 6</h1>
          <ul className="">
            <li className="list-disc font-bold">
              C:{" "}
              {pourcentageC(
                inspectionData?.chapter6.C ?? 0,
                inspectionData?.chapter6.TA && inspectionData?.chapter6.TA > 0
                  ? (inspectionData?.chapter6.TA as number)
                  : 1
              )}{" "}
              %
            </li>
            <li className="list-disc font-bold">
              NC:{" "}
              {pourcentageNC(
                inspectionData?.chapter6.NC ?? 0,
                inspectionData?.chapter6.TA && inspectionData?.chapter6.TA > 0
                  ? (inspectionData?.chapter6.TA as number)
                  : 1
              )}{" "}
              %
            </li>
            <li className="list-disc font-bold">
              NA:{" "}
              {pourcentageNA(
                inspectionData?.chapter6.NA ?? 0,
                inspectionData?.chapter6.TA && inspectionData?.chapter6.TA > 0
                  ? (inspectionData?.chapter6.TA as number)
                  : 1
              )}{" "}
              %
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center py-3">
        <h1 className="font-bold py-3 ">Pourcentage general</h1>
        <ul className="">
          <li className="list-disc font-bold">
            C:{" "}
            {(
              (pourcentageGeneral().C / (totalQuestions ? totalQuestions : (inspectionData?.total_A ?? 1))) *
              100
            ).toFixed(2)}{" "}
            %
          </li>
          <li className="list-disc font-bold">
            NC:{" "}
            {(
              (pourcentageGeneral().NC / (totalQuestions ? totalQuestions : (inspectionData?.total_A ?? 1))) *
              100
            ).toFixed(2)}{" "}
            %
          </li>
          <li className="list-disc font-bold">
            NA:{" "}
            {(
              (pourcentageGeneral().NA / (totalQuestions ? totalQuestions : (inspectionData?.total_A ?? 1))) *
              100
            ).toFixed(2)}{" "}
            %
          </li>
        </ul>
      </div>
    </>
  );
}
