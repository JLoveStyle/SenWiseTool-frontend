import PrintContent from "@/components/atoms/print-content";
import { ReceiptProps } from "@/types/tracability/receipt";
import Image from "next/image";

interface Props {
  data: ReceiptProps;
}

export const PrintableReceipt = ({ data }: Props) => {
  const backgroundImageUrl = "/images/texture-bg.png"; // Texture de l'arrière-plan

  return (
    <PrintContent className="py-10 px-6">
      <div
        className="relative bg-cover bg-center p-10 rounded-md shadow-md"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
        }}
      >
        {/* Logo de l'entreprise */}
        <div className="flex justify-center items-center mb-6">
          <Image
            src="/images/logo-lg-senima.png"
            alt="company logo"
            width={300}
            height={150}
          />
        </div>

        {/* Contenu du reçu */}
        <div className="bg-white bg-opacity-80">
          <div className="text-center mb-10">
            <u className="text-2xl font-bold uppercase text-orange-500">
              Reçu de Paiement #{data.id}
            </u>
          </div>

          {/* Détails du reçu */}
          <div className="text-lg leading-7 text-gray-800 space-y-4">
            <p>
              Moi, Mr / Mme / Mlle{" "}
              <span className="font-semibold">{data.farmer_id}</span> affirme
              avoir vendu{" "}
              <span className="font-semibold">{data.net_weight_in_kg} kg</span>{" "}
              de cacao au prix de
              <span className="font-semibold"> 1000 FCFA </span>à Mr / Mme /
              Mlle
              <span className="font-semibold"> {data.buyer} </span> au village
              <span className="font-semibold"> {data.village} </span> le
              <span className="font-semibold"> {data.date} </span> selon les
              exigences de la norme Rainforest.
            </p>
            <p>
              J'atteste que le cacao vendu lors du marché
              <span className="font-semibold"> {data.market_id} </span> de la
              campagne
              <span className="font-semibold"> 2024 - 2025 </span> a un poids
              net de
              <span className="font-semibold">
                {" "}
                {data.net_weight_in_kg} kg{" "}
              </span>
              et a été chargé dans
              <span className="font-semibold">
                {" "}
                {data.quantity_in_bags} sacs{" "}
              </span>
              avec
              <span className="font-semibold">
                {data.humidity_level_of_product}%
              </span>
              d'humidité.
            </p>
            <p>
              Ce présent reçu fait office de preuve de vente et peut être
              présenté partout où besoin se fera.
            </p>
          </div>

          {/* Signatures */}
          <div className="flex justify-between items-center mt-10 space-x-6">
            <div className="w-1/2 p-4 text-center">
              <p className="text-sm text-gray-600">Signature du Vendeur</p>
              <div className="text-xl font-bold text-gray-800">
                <img
                  src={data.farmer_signature}
                  alt="Signature du Vendeur"
                  className="w-24 h-auto rounded-md mb-2"
                />
              </div>
            </div>
            <div className="w-1/2 p-4 text-center">
              <p className="text-sm text-gray-600">Signature de l'Acheteur</p>
              <div className="text-xl font-bold text-gray-800">
                <img
                  src={data.buyer_signature}
                  alt="Signature de l'Acheteur"
                  className="w-24 h-auto rounded-md mb-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </PrintContent>
  );
};
