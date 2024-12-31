"use client";
import { Logo } from "@/components/atoms/logo";
import { Footer } from "@/components/molecules/footer";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

type Props = {};

export default function Home({}: Props) {
  const [language, setLanguage] = useState<boolean>(true);
  return (
    <div className="">
      <div className="flex justify-between p-4 w-full bg-gray-100">
        <div className="logo flex items-center gap-2 ">
          <Logo size="large" />
          <span className="font-extrabold text-xl hidden md:block">
            SenWiseTool
          </span>
        </div>
        <Button
          className="rounded-full"
          onClick={() => setLanguage((prev) => !prev)}
        >
          {language ? "Français" : "English"}
        </Button>
      </div>
      <div className="relative">
        {language ? (
          <div className="text-gray-100 absolute text-center top-1/2 right-1/2 md:ml-[100px] ">
            <h1 className="text-4xl font-bold pb-4 font-serif">Legal</h1>
            <p className="text-xl font-semibold">
              Everything you must know in one place
            </p>
          </div>
        ) : (
          <div className="font-serif text-gray-100 absolute text-center top-1/2 right-1/2 md:ml-[100px] ">
            <h1 className="text-4xl font-bold pb-4">Légal</h1>
            <p className="text-xl font-semibold">
              Tout ce que vous devez savoir au même endroit
            </p>
          </div>
        )}
        <img
          src="https://cowenpartners.com/wp-content/uploads/2022/05/AdobeStock_229719876-1130x660.jpeg"
          alt="legal picture"
          className="w-full h-[650px] legal-image"
          loading="lazy"
        />
      </div>

      {language ? (
        <section className=" my-5 w-3/4 mx-auto text-gray-600 leading-loose">
          <div className="">
            <h1 className="text-3xl font-bold font-serif py-6 text-center">
              FOREWORD
            </h1>
            <p className="">
              The parties to this agreement in relation to the application
              senwisetool believe that public interest is best served by
              creating an intellectual environment whereby efforts, innovations
              are encouraged and rewarded adequately in the field of ‘cocoa
              production’ in Cameroon. This encompasses a follow up from the
              nursing of the cocoa seed, passing through breeding of the cocoa
              plants in conformity with international norms and the securing of
              a market for the turnover of the cocoa produce. This application
              helps the cocoa producer to check on the quality of their product,
              trace the product from nursing to the final consumer. This check
              of conformity and certification of the cocoa’s quality is done by
              Rainforest Alliance.
            </p>
            <h2 className="text-2xl font-semibold py-2">Article 1. Parties</h2>
            <p className="">
              This is a tripartite agreement between the owner of the website,
              Rainforest Alliance, [an international non-governmental
              organization operating in more than 70 countries founded in 1987
              in the agricultural field] on the one hand and the Economic
              Interest Group(EIG) and cooperatives either involved in the
              production or sale of cocoa in Cameroon.
            </p>
            <p className="text-2xl font-semibold py-2">
              Article 2- Obligations
            </p>
            <ol className="">
              <li className="">
                2.1-Rainforest Alliance aims at setting out norms for quality
                cocoa and improving the living conditions of cocoa farmers by
                ensuring agricultural training and a better price for products
                in the cocoa sector on Certified the cocoa produce in Cameroon.
              </li>
              <li className="">
                <span className="italic">2.2-senwisetool application</span>{" "}
                provides a platform of exchange and traceability of the cocoa.
                It carries out investigations, diagnoses problems of any nature,
                identifies any malpractices, any disease attack on the plant and
                notifies the cooperative or EIG in question as soon as possible.
              </li>
              <li className="">
                2.3-Cooperatives and the IEG; Subscription to the application
                guarantees a period of free services during the promotion period
                decided by the owner of the application. Subscribers will be
                subject to an annual registration fee as per the packaging
                elected. This annual fee shall be decided by the owner of the
                application.
              </li>
            </ol>
            <h2 className="text-2xl font-semibold py-2">
              Article 3- About the Application
            </h2>
            <ol className="">
              <li className="">
                3.1 - This application and all its content, information, or
                material is a copyright of senwisetool, together with
                cooperatives or famers that have subscribed to the application
                or any other licensor. The use of this application does not
                constitute a license or attribute ownership to the user.
              </li>
              <li className="">
                3.2 - This application provides reliable information to
                Rainforest Alliance who automatically provides certification of
                the cocoa’s fitness for the international market. The cocoa
                produce in respect of these norms will be henceforth referred to
                as a{" "}
                <span className="font-semibold">
                  ‘certified cocoa under the Rainforest Alliance’
                </span>
                .
              </li>
            </ol>
            <h2 className="text-2xl font-semibold py-2">Article 4-Privacy</h2>
            <ol className="">
              <li className="">
                4.1 - Except to the extent permitted, any form of use,
                reproduction or redistribution of part of all of the content,
                information or material on this application in any form is
                prohibited.
              </li>
              <li className="">
                4.2 - You may not, except otherwise with prior permission and
                express consent, copy, download, print, extract, exploit, adapt,
                publicly display, duplicate or distribute any content of this
                application for non-personal or commercial purposes.
              </li>
              <li className="">
                4.3 - However, all those who have subscribed for the application
                are permitted to copy the content, information, or material for
                personal use, educational use of individual third parties,
                government use or any other use permitted under this convention
                provided the author of any such content, information or material
                is acknowledged.
              </li>
            </ol>
            <h2 className="text-2xl font-semibold py-2">
              Article 5-Disclaimer
            </h2>
            <ol className="">
              <li className="">
                5.1 - <span className="">Senwisetool</span> will not be
                responsible for the accuracy, completeness of the content,
                information, or material on this application.
              </li>
              <li className="">
                5.2 - <span className="">senwisetool</span> will not be
                responsible for the fluctuation in the price of cocoa on the
                international market.
              </li>
            </ol>
          </div>
        </section>
      ) : (
        <section className=" my-5 w-3/4 mx-auto text-gray-600 leading-loose">
          <div className="">
            <h1 className="text-3xl font-bold font-serif py-6 text-center">
              AVANT-PROPOS
            </h1>
            <p className="">
            Les parties au présent accord relatif à l’application senwisetool estiment que l'intérêt public est mieux servi par la création d'un environnement intellectuel dans lequel les efforts, les innovations sont encouragées et récompensées de manière adéquate dans le domaine de la <span className="font-semibold">"production de cacao"</span> au Cameroun. Ceci englobe le suivi de la culture de la graine de cacao, en passant par la sélection des plantes de cacao en conformité avec les normes internationales et la sécurisation d'un marché pour le chiffre d'affaires de la production de cacao. Cette application permet au producteur de cacao de vérifier la qualité de son produit, de le tracer depuis la culture jusqu'au consommateur final. Ce contrôle de conformité et la certification de la qualité du cacao sont effectués par Rainforest Alliance.
            </p>
            <h2 className="text-2xl font-semibold py-2">Article 1. Parties</h2>
            <p className="">
            Il s’agit d’un accord tripartite entre le propriétaire du site web, Rainforest Alliance, [une organisation internationale non gouvernementale opérant dans plus de 70 pays et fondée en 1987 dans le domaine agricole] d’une part, et les coopératives et Groupement d’Intérêt Economique (GIE) dans la production et vente de cacao d’autre part.
            </p>
            <p className="text-2xl font-semibold py-2">
            Article 2 – Obligations
            </p>
            <ol className="">
              <li className="">
              2.1 – Rainforest Alliance a pour objectif de définir des normes de qualité requis pour le cacao et d’améliorer les conditions de vie des cultivateurs de cacao au travers des GIEs et les coopératives en leur assurant une formation agricole et un meilleur prix pour les produits du secteur du cacao.
              </li>
              <li className="">
                <span className="italic">2.2 - L’application senwisetool</span>{" "}
                fournit une plateforme d’échange et de traçabilité du cacao. Elle effectue des enquêtes, diagnostique les problèmes de toute nature, identifie toute malversation, toute attaque de maladie sur la plante et en informe la coopérative, qui en informera l’agriculteur concerné aussi tôt.
              </li>
              <li className="">
                2.3 - Les Coopératives et GIEs ; L’abonnement à l’application garantit un an de services gratuits pour une période promotionnelle. Les abonnés seront soumis à un droit d’inscription annuel selon les conditions choisies par les propriétaires de l’application et en fonctions du pack choisi par l’utilisateur de l’application.
              </li>
            </ol>
            <h2 className="text-2xl font-semibold py-2">
              Article 3 - A propos de l’application
            </h2>
            <ol className="">
              <li className="">
                3.1 - Cette application et tout son contenu, information ou matériel est la propriété de senwisetool, ainsi que des coopératives et GIEs qui ont souscrit à l’application ou de tout autre concédant de licence. L’utilisation de cette application ne constitue pas une licence et n’attribue pas la propriété à l’utilisateur.
              </li>
              <li className="">
                3.2 - Cette application fournit des informations fiables à Rainforest Alliance qui certifie automatiquement la qualité du cacao à être commercialisé sur le marché international. Le cacao qui respecte les normes édictées sera désormais appelé{" "}
                <span className="font-semibold">
                  "cacao certifié par Rainforest Alliance"
                </span>
                .
              </li>
            </ol>
            <h2 className="text-2xl font-semibold py-2">Article 4 - Confidentialité</h2>
            <ol className="">
              <li className="">
                4.1 - Sauf dans la mesure où cela est autorisé, toute forme d'utilisation, de reproduction ou de redistribution d'une partie ou de la totalité du contenu, des informations ou du matériel de cette application, sous quelque forme que ce soit, est interdite.
              </li>
              <li className="">
                4.2 - Vous ne pouvez pas, sauf autorisation préalable et consentement exprès, copier, télécharger, imprimer, extraire, exploiter, adapter, afficher publiquement, dupliquer ou distribuer tout contenu de cette application à des fins non personnelles ou commerciales.
              </li>
              <li className="">
                4.3 - Toutefois, tous ceux qui ont souscrit à l'application sont autorisés à copier le contenu, les informations ou le matériel à des fins personnelles, à des fins éducatives pour des tiers individuels, à des fins gouvernementales ou à toute autre fin autorisée par la présente convention, à condition que l'auteur de ce contenu, de ces informations ou de ce matériel soit mentionné.
              </li>
            </ol>
            <h2 className="text-2xl font-semibold py-2">
              Article 5 - Clause de non-responsabilité
            </h2>
            <ol className="">
              <li className="">
                5.1 - <span className="">Senwisetool</span> n'est pas responsable de l'exactitude et de l'exhaustivité du contenu, des informations ou du matériel de cette application.
              </li>
              <li className="">
                5.2 - <span className="">senwisetool</span> n'est pas responsable de la fluctuation du prix du cacao sur le marché international.
              </li>
            </ol>
          </div>
        </section>
      )}
      <Footer />
    </div>
  );
}
