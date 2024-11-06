"use client";

import { ButtonUI } from "@/components/atoms/disign-system/button-ui";
import { Spinner } from "@/components/atoms/spinner/spinner";
import CustomHoverCard from "@/components/organisms/hoverCard";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { Route } from "@/lib/route";
import { MarketDBProps } from "@/types/api-types";
import { marketData } from "@/utiles/tracability.const/market";
import { Archive, Delete, MoveLeft, UserPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { IoReceipt } from "react-icons/io5";

type TProps = Promise<{id: string}>;

export default function ReceiptDetails(props: {params: TProps}) {
  const params = use(props.params)
  const id = params.id
  const router = useRouter();
  const [currentMarket, setCurrentMarket] = useState<MarketDBProps>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [preview, setPreview] = useState<{
    status: boolean;
    url: string | null;
  }>({ status: false, url: null });

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

  const togglePopup = (url?: string | null) => {
    url
      ? setPreview({ status: true, url: url })
      : setPreview({ status: false, url: null });
  };

  return (
    <LayoutDashboardTemplate title="Traçabilité - Les Détails du Marché">
      <div className="flex justify-between pb-4 pt-2 px-6 w-3/4">
        <h1 className="text-xl font-semibold">
          <Link
            className="flex gap-1 items-center hover:font-medium"
            href={Route.markets}
          >
            <MoveLeft />
            Marchés
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
            {isLoading ? (
              <Spinner size="very-small" color="#999" />
            ) : (
              <Delete />
            )}
          </CustomHoverCard>
        </div>
      </div>

      <div className="flex gap-5">
        <div className="w-3/4 max-h-[480px] overflow-y-auto relative">
          {isLoading ? (
            <div className="flex justify-center text-center w-full">
              <Spinner color="#999" size="large" />
            </div>
          ) : currentMarket ? (
            <div className="bg-gray-100 shadow-md rounded-lg overflow-hidden m-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 p-6 text-center">{`Marché ${currentMarket.code} - ${currentMarket.type_of_market}`}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
                <DetailCard label="Code" value={currentMarket.code || "N/A"} />
                <DetailCard
                  label="Statut"
                  value={currentMarket.status || "Non spécifié"}
                />
                <DetailCard
                  label="Campagne"
                  value={currentMarket.campaign_id}
                />
                <DetailCard
                  label="Prix par jour"
                  value={`${currentMarket.price_of_theday} XAF`}
                />
                <DetailCard
                  label="Fournisseur"
                  value={currentMarket.supplier}
                />
                <DetailCard
                  label="Date de début"
                  value={new Date(
                    currentMarket.start_date
                  ).toLocaleDateString()}
                />
                <DetailCard
                  label="Date de fin"
                  value={new Date(currentMarket.end_date).toLocaleDateString()}
                />
                <DetailCard
                  label="Description"
                  value={`${currentMarket.description}`}
                />
              </div>
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

        <div className="bg-slate-100 w-1/4 relative">
          <div className="p-3">Metadata</div>
          <hr />
          <div className="p-3 text-xs flex flex-col gap-5">
            {/* <Metadata label="Status" value={currentMarket?.status || "N/A"} />
            <Metadata label="Nombre de sac" value={currentMarket?.code} />
            <Metadata label="Poids net vendu" value={currentMarket?.code} />
            <Metadata label="Poids net en Kg" value={currentMarket?.status} />
            <Metadata label="Humidité en %" value={currentMarket?.price_of_day} /> */}
            <div className="flex justify-center items-center gap-10 bg-transparent absolute bottom-5">
              <ButtonUI
                size="small"
                className="flex gap-1 items-center bg-black hover:bg-gray-950"
                baseURL={Route.factoryAccompaniementSheet}
              >
                <IoReceipt /> Reçus
              </ButtonUI>
              {currentMarket?.sale_slip && (
                <ButtonUI
                  size="small"
                  className="flex gap-1 items-center bg-blue-500 hover:bg-blue-400"
                  action={() => togglePopup(currentMarket.sale_slip)}
                >
                  Bordoreau Vente
                </ButtonUI>
              )}
              {currentMarket?.store_entry_voucher && (
                <ButtonUI
                  size="small"
                  className="flex gap-1 items-center bg-blue-500 hover:bg-blue-400"
                  action={() => togglePopup(currentMarket.store_entry_voucher)}
                >
                  Bon Entrée Magasin
                </ButtonUI>
              )}
            </div>
          </div>
        </div>
      </div>
      {preview.status && currentMarket?.store_entry_voucher && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-lg p-4 w-4/5 h-4/5">
            <button
              onClick={() => togglePopup()}
              className="absolute top-4 right-4 text-xl text-gray-600"
            >
              &times;
            </button>
            <img
              src={currentMarket?.store_entry_voucher}
              alt="Preview bordoreau de vente"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </LayoutDashboardTemplate>
  );
}

const DetailCard: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="bg-gray-50 p-4 rounded-md">
    <p className="text-sm text-gray-600">{label}</p>
    <div className="text-xl font-bold text-gray-800">{value}</div>
  </div>
);

const Metadata: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div className="flex justify-between items-center">
    <span>{label}</span>
    <span className="text-red-500 font-medium">{value}</span>
  </div>
);
