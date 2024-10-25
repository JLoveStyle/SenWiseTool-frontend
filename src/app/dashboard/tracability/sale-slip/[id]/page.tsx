"use client";

import { ButtonUI } from "@/components/atoms/disign-system/button-ui";
import { Spinner } from "@/components/atoms/spinner/spinner";
import CustomHoverCard from "@/components/organisms/hoverCard";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { Button } from "@/components/ui/button";
import { Route } from "@/lib/route";
import { MarketDBProps } from "@/types/api-types";
import { marketData } from "@/utiles/tracability.const/market";
import { Archive, Delete, MoveLeft, UserPlus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PiPrinterFill } from "react-icons/pi";

type TProps = {
  params: {
    id: string;
  };
};

export default function TransmissionAndDeclarationSheetDetail({
  params: { id },
}: TProps) {
  const router = useRouter();
  const [currentMarket, setCurrentMarket] = useState<MarketDBProps>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const market = marketData.find((market) => market?.code === id);
      if (market) {
        setCurrentMarket(market);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <LayoutDashboardTemplate title="Traçabilité - Les Détails du Marché">
      <div className="flex justify-between pb-4 pt-2 px-6 w-3/4">
        <ButtonUI
          className="mx-10 p-0 bg-transparent hover:bg-transparent text-gray-950 hover:text-gray-500"
          icon={{ icon: MoveLeft }}
          size="very-small"
          baseURL={Route.transmissionAndDeclarationSheet}
        />
        <div className="flex items-center gap-4 text-gray-500">
          <CustomHoverCard content="archive project">
            <Archive className="hover:cursor-pointer" />
          </CustomHoverCard>
          <CustomHoverCard content="Share project">
            <UserPlus className="hover:cursor-pointer" />
          </CustomHoverCard>
          <CustomHoverCard content="Delete Project">
            {isLoading ? (
              <Spinner size="very-small" color="#999" />
            ) : (
              <Delete />
            )}
          </CustomHoverCard>
        </div>
      </div>

      <div className="flex items-center w-full gap-5 px-2">
        <div className="bg-slate-50 w-5/6 mt-3">
          {isLoading ? (
            <div className="flex justify-center text-center w-full">
              <Spinner color="#999" size="large" />
            </div>
          ) : currentMarket ? (
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 p-6 text-center">{`Fiche de transmission ${currentMarket.code}`}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6">
                <DetailCard
                  label="Transmetteur"
                  value={currentMarket.sender || "N/A"}
                />
                <DetailCard
                  label="Recepteur"
                  value={currentMarket.Receiver || "Non spécifié"}
                />
                <DetailCard
                  label="Vehicule immatriculation"
                  value={currentMarket.car_number || "Non spécifié"}
                />
                <DetailCard
                  label="Nom du chauffeur"
                  value={currentMarket.driver_name || "Non spécifié"}
                />
                <DetailCard
                  label="Nombre de sacs"
                  value={currentMarket.quantity_in_bags_tone || "Non spécifié"}
                />
                <DetailCard
                  label="Date de fin"
                  value={currentMarket.quantity_product || "Non spécifié"}
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
                      src="/svg/market-preview.svg"
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
                alt="Empty illustration"
                className="animate-empty-image"
              />
            </div>
          )}
        </div>

        <div className="bg-slate-100 w-1/6 h-full p-3">
          <div className="w-full">
            <div className="p-3">Metadata</div>
            <hr />
            <div className="flex flex-col gap-10 justify-between h-full">
              <div className="p-3 text-xs flex flex-col gap-3 h-full">
                <div className="flex justify-between items-center">
                  <span>Status</span>
                  <span className="text-green-500 font-medium">OPEN</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Nombre de sac</span>
                  <span>0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Poids net vendu</span>
                  <span>0 Kg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Poids net en Kg</span>
                  <span>0 Kg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Humidité en %</span>
                  <span>0 %</span>
                </div>
              </div>
              <div className="flex justify-center items-center gap-10 bg-transparent">
                <Button
                  size="sm"
                  className="flex gap-1 items-center bg-black hover:bg-gray-900"
                >
                  <PiPrinterFill /> Imprimer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutDashboardTemplate>
  );
}

const DetailCard: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <div className="bg-white p-4 rounded-md">
    <p className="text-sm text-gray-600">{label}</p>
    <div className="text-xl font-bold text-gray-800">{value}</div>
  </div>
);
