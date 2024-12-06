import React from "react";
import { Input } from "../ui/input";

type Props = {};

export default function InspectionConclusion({}: Props) {
  const tableCell = [
    "Nombre d'exigence",
    "Nombre d'exigence applicable",
    "Conformité par chaplitre",
    "% par chapitre",
  ];
  return (
    <div className="">
      <h1 className="text-center py-6 text-xl font-semibold underline">
        Recapitulatifs des scores par chapitre
      </h1>
      <table>
        <thead>
          <tr className="font-semibold">
            <th className="px-2 border">Libellé</th>
            <th className="px-2 border">Chapitre 1</th>
            <th className="px-2 border">Chapitre 2</th>
            <th className="px-2 border">Chapitre 3</th>
            <th className="px-2 border">Chapitre 4</th>
            <th className="px-2 border">Chapitre 5</th>
            <th className="px-2 border">Chapitre 6</th>
            <th className="px-2 border">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {tableCell.map((item, index) => (
            <tr key={index} className="px-2 border">
              <td className="px-2 border">{item} </td>
              <td className="px-2 border">
                <Input type="text" />
              </td>
              <td className="px-2 border">
                <Input type="text" />
              </td>
              <td className="px-2 border">
                <Input type="text" />
              </td>
              <td className="px-2 border">
                <Input type="text" />
              </td>
              <td className="px-2 border">
                <Input type="text" />
              </td>
              <td className="px-2 border">
                <Input type="text" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1 className="underline py-6 text-center font-semibold">
        CONCLUSION DE L'INSPECTION
      </h1>
      <table className="w-full">
        <thead className="w-full">
          <tr>
            <th className="p-2 border w-[10%]">Non conformité</th>
            <th className="p-2 border w-[20%] ">{""}</th>
            <th className="p-2 border w-[60%]">
              Mesures correctives pour l'année en cours
            </th>
            <th className="px-2 border w-[10%]">DELAI</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((item, index) => (
            <tr key={index} className="px-2 border">
              <td className="p-2 border">
                <input type="text" />
              </td>
              <td className="p-2 border">
                <input type="text" />
              </td>
              <td className="p-2 border">
                <input type="text" />
              </td>
              <td className="p-2 border">
                <input type="text" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <table className="w-full">
        <thead>
          <tr className="p-2 border">
            <th className="p-2 border">
              Recommendation pour la prochaine année (en cas d'approbation sous
              condition)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="p-2 border">
            <td className="p-2 border">
              <input type="text" />
            </td>
          </tr>
        </tbody>
      </table>
      <h1 className="underline font-semibold py-5 text-center text-xl ">
        Déclaration
      </h1>
      <p className="text-center pb-5">
        Le planteur confirme sous ce pli que les Informations données dans ce
        rapport sont correctes et
      </p>
      <table className="w-full ">
        <thead>
          <tr className="p-2 border">
            <th className="p-2 border">Signature du planteur</th>
            <th className="p-2 border">Signature de l'inspecteur interne</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border h-10 py-10">
              <input type="text" />
            </td>
            <td className="p-2 border h-10 py-10">
              <input type="text" />
            </td>
          </tr>
        </tbody>
      </table>
      <h1 className="py-5 text-center font-semibold text-xl underline">
        B - SUIVI DES INSPECTIONS INTERNES (VERIFICATION)
      </h1>
      <table className="w-full">
        <thead>
          <tr className="p-2 border">
            <th className="p-2 border w-[8%]">EXIGENCES NON CONFORME</th>
            <th className="p-2 border w-[30%]">{""}</th>
            <th className="p-2 border ">
              MESURES/ACTIONS CORRECTIVES PROPOSES
            </th>

            <th className="p-2 border">OBSERVATION DU SUIVI</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((item, index) => (
            <tr key={index} className="p-2 border">
              <td className="p-2 border">
                <input type="" />
              </td>
              <td className="p-2 border">
                <input type="" />
              </td>
              <td className="p-2 border">
                <input type="" />
              </td>
              <td className="p-2 border">
                <input type="" />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="p-2 border h-10 py-10 text-lg font-semibold">
            <td className="p-2 border py-10">Date de vérification</td>
            <td className="p-2 text-center py-10">
              Nom et signature du vérificateur interne
            </td>
          </tr>
        </tfoot>
      </table>
      <h1 className="py-5 text-center font-semibold text-xl underline">
        C - DECISION DU COMITE D'APPROBATIONS ET SANCTIONS
      </h1>
      <table className="w-full">
        <thead>
          <tr className="p-2 border h-10 py-10 text-lg font-semibold">
            <th className="p-2 border py-10 w-[8%]">Apprové sans condition</th>
            <th className="p-2 border py-10 w-[24%]">{""}</th>
            <th className="p-2 border py-10 w-[16%]">{""}</th>
            <th className="p-2 border py-10 w-[8%]">Apprové sous condition</th>
            <th className="p-2 border py-10 w-[24%]">{""} </th>
            <th className="p-2 border py-10 w-[8%]">Non approvué</th>
            <th className="p-2 border py-10 w-[16%]">{""}</th>
          </tr>
        </thead>
        <tfoot>
          <tr className="p-2 border py-10">
            <td className="p-2 border py-5">{""} </td>
            <td className="p-2 border py-5">{""}</td>
            <td className="p-2 border py-5">NOM ET SIGNATURE DU MEMBRE DU CAS</td>
            <td className="p-2 py-5">{""}</td>
            <td className="p-2 py-5">{""}</td>
            <td className="p-2 py-5">{""}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
