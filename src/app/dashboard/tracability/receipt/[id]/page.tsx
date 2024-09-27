"use client";

import { Spinner } from "@/components/atoms/spinner/spinner";
import { AttendanceSheetForm } from "@/components/atoms/training/attendance-sheet-form";
import CustomHoverCard from "@/components/organisms/hoverCard";
import { DeleteReceipt } from "@/components/organisms/tracability/receipt/delete-receipt";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { Button } from "@/components/ui/button";
import { Route } from "@/lib/route";
import { ReceiptProps } from "@/types/tracability/receipt";
import { db_get_receipts } from "@/utiles/services/tracability/receipt";
// import dayjs from "dayjs";
import { Archive, MoveLeft, Trash2, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { PiFilesFill, PiPrinterFill } from "react-icons/pi";
interface Props {
  displayForm: boolean;
}

type TProps = {
  params: {
    id: string;
  };
};

export default function ReceiptDetails({ params: { id } }: TProps) {
  const [currentReceipt, setCurrentReceipt] = useState<ReceiptProps>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [displayComponent, setDisplayComponent] = useState<
    "trainingDetails" | "attendanceSheet"
  >("trainingDetails");

  useEffect(() => {
    const fetchData = async () => {
      // const result = await LOCAL_STORAGE.get("trainings");

      // const training = result.find(
      //   (training: LocalReceiptProps) => training.id == id
      // );
      const receipt = (await db_get_receipts(undefined, id)) as ReceiptProps;
      // setDbcurrentReceipt(training);

      if (receipt) {
        setCurrentReceipt(receipt), setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("ddddddddddd", currentReceipt);
  }, [currentReceipt]);

  return (
    <LayoutDashboardTemplate title="Traçabilité - Les Details du Reçu">
      <div className="flex justify-between pb-4 pt-2 px-6 w-3/4">
        <h1 className="text-xl font-semibold">
          <Link
            className="flex gap-1 items-center hover:font-medium"
            href={Route.trainingProject}
          >
            <MoveLeft />
            Projects
          </Link>
        </h1>
        <div className="flex items-center gap-4 text-gray-500">
          <CustomHoverCard content="archive project">
            <Archive className="hover:cursor-pointer" />
          </CustomHoverCard>
          <CustomHoverCard content="Share project">
            <UserPlus className="hover:cursor-pointer" />
          </CustomHoverCard>
          <CustomHoverCard content="Delete Project">
            {isLoading && <Spinner size="very-small" color="#999" />}
            {!isLoading && currentReceipt !== undefined && (
              <DeleteReceipt
                receipt={currentReceipt}
                header={<Trash2 className="hover:cursor-pointer" />}
              />
            )}
          </CustomHoverCard>
        </div>
      </div>

      <div className="flex gap-5">
        <div className="w-3/4 max-h-[480px] overflow-y-auto scrool-bar-hidden relative">
          {displayComponent === "trainingDetails" && (
            <>
              {isLoading ? (
                <div className="flex justify-center text-center w-full">
                  <Spinner color="#999" size="large" />
                </div>
              ) : !isLoading && currentReceipt ? (
                <div className="bg-gray-50 p-5 shadow-md flex items-center text-center flex-col gap-8">
                  <span className="text-xl text-gray-700">
                    {currentReceipt.buyer}
                  </span>
                  <div className="flex flex-col items-center gap-2">
                    <div className="font-medium text-xs">
                      Information sur la date de formation
                    </div>
                    <div className="flex gap-5">
                      <div>
                        <span className="text-gray-700">Du </span>
                        <span className="text-gray-400">
                          {currentReceipt.farmer_id}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-700">Au </span>
                        <span className="text-gray-400">
                          {currentReceipt.net_weight_in_kg}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="text-gray-700">À</span>
                      <span className="text-gray-400">
                        {currentReceipt.net_weight_for_sale}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center mt-28">
                  <Image
                    src="/svg/empty.svg"
                    height={250}
                    width={350}
                    alt="Empty illustation"
                    className="animate-empty-image"
                  />
                </div>
              )}
            </>
          )}
          {displayComponent === "attendanceSheet" && (
            <div>
              {currentReceipt ? (
                <AttendanceSheetForm row={12} data={currentReceipt} />
              ) : (
                <div className="flex items-center justify-center mt-28">
                  <Image
                    src="/svg/empty.svg"
                    height={250}
                    width={350}
                    alt="Empty illustation"
                    className="animate-empty-image"
                  />
                </div>
              )}

              <Button
                size="sm"
                className="absolute z-50 top-1 right-5 text-gray-700 bg-transparent hover:bg-transparent hover:text-red-500 font-medium"
                onClick={() => setDisplayComponent("trainingDetails")}
              >
                <IoClose size={25} className="fixed" />
              </Button>
            </div>
          )}
        </div>
        <div className="bg-slate-100 w-1/4 relative">
          <div className="p-3">Metadata</div>
          <hr />
          <div className="p-3 text-xs flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <span>Status</span>
              <span className="text-red-500 font-medium">BUYED</span>
            </div>
            <div className="flex justify-between items-center">
              <span>No Fiche de presence</span>
              <span>0</span>
            </div>
            <div className="flex justify-between items-center gap-5 bg-transparent absolute bottom-5">
              <Button
                size="sm"
                variant="outline"
                className="flex gap-1 items-center"
              >
                <PiFilesFill /> Tout voir
              </Button>
              <Button
                size="sm"
                className="flex gap-1 items-center bg-black hover:bg-gray-900"
                onClick={() => setDisplayComponent("attendanceSheet")}
              >
                <PiPrinterFill /> Imprimer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </LayoutDashboardTemplate>
  );
}
