"use client";

import { ButtonUI } from "@/components/atoms/disign-system/button-ui";
import FilePreview from "@/components/atoms/file-preview";
import { Spinner } from "@/components/atoms/spinner/spinner";
import CustomHoverCard from "@/components/organisms/hoverCard";
import ModalContent from "@/components/organisms/modalContent";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { Route } from "@/lib/route";
import { MarketDBProps } from "@/types/api-types";
import { mutateDelApiData, mutateUpApiData } from "@/utiles/services/mutations";
import { fetchApiData } from "@/utiles/services/queries";
import { Archive, MoveLeft, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { IoReceipt } from "react-icons/io5";
import { toast } from "react-toastify";

type TProps = Promise<{ id: string }>;

export default function ReceiptDetails(props: { params: TProps }) {
  const params = use(props.params);
  const id = params.id;
  const [deleteMarket, setDeleteMarket] = useState<boolean>(false);
  const [closeMarket, setCloseMarket] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [currentMarket, setCurrentMarket] = useState<MarketDBProps>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [preview, setPreview] = useState<{
    status: boolean;
    url: string | null;
  }>({ status: false, url: null });

  // fetch single market
  async function fetchSingleMarket(marketId: string) {
    await fetchApiData(Route.marketRequest, marketId)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data); 
          setCurrentMarket(response.data);
          setIsLoading(false);
          return;
        } else {
          setIsLoading(false);
          return;
        }
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchSingleMarket(id);
  }, []);

  // Delete market
  async function handleDeleteMarket() {
    setIsDeleting((prev) => !prev);
    await mutateDelApiData(Route.marketRequest, currentMarket?.id)
      .then((response: any) => {
        if (response.status === 204) {
          toast.success("Market deleted");
          setIsDeleting((prev) => !prev);
          return;
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("something went wrong. please try again");
      });
  }

  // close Market
  async function handleCloseMarket() {
    setIsDeleting((prev) => !prev);
    await mutateUpApiData(
      Route.marketRequest,
      { status: "CLOSED" },
      currentMarket?.id
    )
      .then((response) => {
        setIsDeleting((prev) => !prev);
        if (response.status === 200) {
          toast.success("Market closed");
          setCloseMarket((prev) => !prev);
        } else {
          toast.error("Something went wrong. Please try again");
          setCloseMarket((prev) => !prev);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsDeleting((prev) => !prev);
      });
  }

  const togglePopup = (url?: string | null) => {
    url
      ? setPreview({ status: true, url: url })
      : setPreview({ status: false, url: null });
  };

  return (
    <LayoutDashboardTemplate title="Details du Marché">
      <div className="flex justify-between pb-4 pt-2 px-6 w-3/4">
        <h1 className="text-xl font-semibold">
          <Link
            className="flex gap-1 items-center hover:font-medium hover:underline"
            href={Route.markets}
          >
            <MoveLeft />
            Back
          </Link>
        </h1>
        <div className="flex items-center gap-4 text-gray-500">
          <CustomHoverCard content="archive project">
            <Archive
              onClick={() => setCloseMarket((prev) => !prev)}
              className={
                isLoading
                  ? "cursor-not-allowed"
                  : "text-black hover:cursor-pointer"
              }
            />
          </CustomHoverCard>
          <CustomHoverCard content="Delete Project">
            <Trash2
              onClick={() => setDeleteMarket((prev) => !prev)}
              className={
                isLoading
                  ? "cursor-not-allowed"
                  : "text-black hover:cursor-pointer"
              }
            />
          </CustomHoverCard>
        </div>
        <ModalContent
          openModal={deleteMarket}
          isProcessing={isDeleting}
          action={"Delete"}
          dialogTitle="Delete Market"
          dialogDescription={"Are you sure you want to delete this market?"}
          cancelationFunction={() => setDeleteMarket((prev) => !prev)}
          actionFunction={handleDeleteMarket}
          updateOpenModalState={() => setDeleteMarket((prev) => !prev)}
        />
        <ModalContent
          openModal={closeMarket}
          isProcessing={isDeleting}
          action={"Close"}
          dialogTitle="Market done ?"
          dialogDescription={"Are you sure you want to Close this market?"}
          cancelationFunction={() => setCloseMarket((prev) => !prev)}
          actionFunction={handleCloseMarket}
          updateOpenModalState={() => setCloseMarket((prev) => !prev)}
        />
      </div>

      <div className="flex gap-5">
        <div className="w-2/3 max-h-[480px] overflow-y-auto relative">
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
                  label="Prix du jour"
                  value={`${currentMarket.price_of_theday} XAF`}
                />
                <DetailCard label="Supplier" value={currentMarket.supplier} />
                <DetailCard
                  label="Date de debut"
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
              <div className="">
                <h1 className="font-semibold text-xl text-center py-5">
                  Transaction details
                </h1>
                {currentMarket?.transaction.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6"
                  >
                    <DetailCard
                      label="Nom du chauffeur"
                      value={`${item.driver_name}`}
                    />
                    <DetailCard
                      label="N° d'immatriculation du vehicule"
                      value={`${item.vehicule_immatriculation_number}`}
                    />
                    <DetailCard
                      label="Quantité"
                      value={item?.quantity ? `${item.quantity}` : ""}
                    />
                    <DetailCard
                      label="Humidité"
                      value={item?.humidity ? `${item.humidity}` : ""}
                    />
                    <DetailCard
                      label="Poid net en thone"
                      value={
                        item?.net_weight_declared_in_Ton
                          ? `${item.net_weight_declared_in_Ton}`
                          : ""
                      }
                    />
                    <DetailCard
                      label="Niveau d'humidité du produit"
                      value={
                        item.humidity_level_of_product
                          ? `${item.humidity_level_of_product}`
                          : ""
                      }
                    />
                    <DetailCard
                      label="Quantité total en sacs"
                      value={
                        item.total_quantity_in_bags
                          ? `${item.total_quantity_in_bags}`
                          : ""
                      }
                    />
                    <DetailCard
                      label="Nom du receveur"
                      value={`${item.receiver_name}`}
                    />
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm text-gray-600">Signature du chauffeur</p>
                      <div className="text-xl font-bold text-gray-800">
                        <FilePreview
                          // url={item.driver_signature[0]}
                          url={
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr6zMHpg5uZxN6kLIFPDK8nknCoihHQ2At3A&s"
                          }
                        />
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <p className="text-sm text-gray-600">Signature de l'envoyeur</p>
                      <div className="text-xl font-bold text-gray-800">
                        <FilePreview
                          // url={item.sender_signature[0]}
                          url={
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr6zMHpg5uZxN6kLIFPDK8nknCoihHQ2At3A&s"
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
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

        <div className="bg-slate-100 w-1/3 relative max-h-[480px] overflow-y-auto">
          <div className="p-3 text-sm text-gray-600">Meta donnée</div>
          <hr />
          <div className="p-3 text-xs flex flex-col gap-5">
            <div className="flex flex-wrap gap-2">
              {currentMarket?.bordereau_vente_url && (
                <div className="">
                  <FilePreview
                    url={currentMarket?.bordereau_vente_url as string}
                  />
                  <p className="font-semibold py-2">Bordereau de vente</p>
                </div>
              )}
              {currentMarket?.transmission_url && (
                <div className="">
                  <FilePreview
                    url={currentMarket?.transmission_url as string}
                  />
                  <p className="font-semibold py-2">Fiche de transmission</p>
                </div>
              )}
              {currentMarket?.accompanying_url && (
                <div className="">
                  <FilePreview
                    url={currentMarket?.accompanying_url as string}
                  />
                  <p className="font-semibold py-2">Fiche de d'accompagnement</p>
                </div>
              )}
              {currentMarket?.bon_entree_magazin_url && (
                <div className="">
                  <FilePreview
                    url={currentMarket?.accompanying_url as string}
                  />
                  <p className="font-semibold py-2">Bon d'entrée en magazin</p>
                </div>
              )}
            </div>
            {/* <Metadata label="Status" value={currentMarket?.status || "N/A"} />
            <Metadata label="Nombre de sac" value={currentMarket?.code} />
            <Metadata label="Poids net vendu" value={currentMarket?.code} />
            <Metadata label="Poids net en Kg" value={currentMarket?.status} />
            <Metadata label="Humidité en %" value={currentMarket?.price_of_day} /> */}
            <div className="flex justify-center items-center gap-10 bg-transparent  bottom-5">
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
                  Bordereau de vente
                </ButtonUI>
              )}
              {currentMarket?.store_entry_voucher && (
                <ButtonUI
                  size="small"
                  className="flex gap-1 items-center bg-blue-500 hover:bg-blue-400"
                  action={() => togglePopup(currentMarket.store_entry_voucher)}
                >
                  Bon d'entrer au magazin
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
