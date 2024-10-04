"use client";

import { Spinner } from "@/components/atoms/spinner/spinner";
import CustomHoverCard from "@/components/organisms/hoverCard";
import { DeleteReceipt } from "@/components/organisms/tracability/receipt/delete-receipt";
import { PrintableReceipt } from "@/components/organisms/tracability/receipt/printable-receipt";
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
    // console.log("ddddddddddd", currentReceipt);
  }, [currentReceipt]);

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <LayoutDashboardTemplate title="Traçabilité - Les Details du Reçu">
      <div className="flex justify-between pb-4 pt-2 px-6 w-3/4">
        <h1 className="text-xl font-semibold">
          <Link
            className="flex gap-1 items-center hover:font-medium"
            href={Route.receipt}
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
                <div className="bg-gray-100 shadow-md rounded-lg overflow-hidden m-4 ">
                  <div className="relative">
                    <img
                      src={
                        currentReceipt.picture_of_sale.url ?? "/svg/empty.svg"
                      }
                      alt="Sale"
                      className="w-full h-64 object-cover rounded-md"
                    />
                    <div className="flex justify-between gap-10 items-center px-10">
                      <span className="text-gray-400 text-xs">
                        {currentReceipt.picture_of_sale.gps_location}
                      </span>
                      <span className="text-gray-400 text-xs">
                        {currentReceipt.picture_of_sale.date_hour}
                      </span>
                    </div>
                    <button
                      onClick={togglePopup}
                      className="absolute top-4 right-4 bg-blue-500 text-white py-1 px-3 rounded-md shadow-lg"
                    >
                      Preview
                    </button>
                  </div>

                  <h2 className="text-2xl font-semibold text-gray-800 mb-4 p-6 text-center">{`Market ${currentReceipt.market_id}`}</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
                    <DetailCard
                      label="Village"
                      value={currentReceipt.village}
                    />
                    <DetailCard
                      label="Farmer ID"
                      value={currentReceipt.farmer_id}
                    />
                    <DetailCard label="Date" value={currentReceipt.date} />
                    <DetailCard
                      label="Net Weight"
                      value={`${currentReceipt.net_weight_in_kg} kg`}
                    />
                    <DetailCard
                      label="Quantity"
                      value={`${currentReceipt.quantity_in_bags} bags`}
                    />
                    <DetailCard
                      label="Humidity Level"
                      value={`${currentReceipt.humidity_level_of_product}%`}
                    />
                    <DetailCard
                      label="Buyer"
                      value={currentReceipt.buyer}
                      colSpan={2}
                    />
                  </div>

                  <div className="flex justify-between items-center mt-6 py-6 px-24">
                    <SignatureCard
                      src={currentReceipt.farmer_signature}
                      label="Farmer Signature"
                    />
                    <SignatureCard
                      src={currentReceipt.buyer_signature}
                      label="Buyer Signature"
                    />
                  </div>

                  {isOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                      <div className="relative bg-white rounded-lg p-4 w-4/5 h-4/5">
                        <button
                          onClick={togglePopup}
                          className="absolute top-4 right-4 text-xl text-gray-600"
                        >
                          &times;
                        </button>
                        <img
                          src={
                            currentReceipt.picture_of_sale.url ??
                            "/svg/empty.svg"
                          }
                          alt="Preview"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                  )}
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
                <div className="container mx-auto">
                  <PrintableReceipt data={currentReceipt} />
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
              <span>Nombre de sac</span>
              <span>{currentReceipt?.quantity_in_bags}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Poids net vendu</span>
              <span>{currentReceipt?.net_weight_for_sale}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Poids net en Kg</span>
              <span>{currentReceipt?.net_weight_in_kg}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Humidité en %</span>
              <span>{currentReceipt?.humidity_level_of_product}</span>
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

const DetailCard: React.FC<{
  label: string;
  value: string;
  colSpan?: number;
}> = ({ label, value, colSpan }) => {
  return (
    <div
      className={`bg-gray-50 p-4 rounded-md text-center ${
        colSpan ? "col-span-2" : ""
      }`}
    >
      <p className="text-sm text-gray-600">{label}</p>
      <div className="text-xl font-bold text-gray-800">{value}</div>
    </div>
  );
};

const SignatureCard: React.FC<{ src: string; label: string }> = ({
  src,
  label,
}) => {
  return (
    <div className="text-center">
      <img src={src} alt={label} className="w-24 h-auto rounded-md mb-2" />
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );
};