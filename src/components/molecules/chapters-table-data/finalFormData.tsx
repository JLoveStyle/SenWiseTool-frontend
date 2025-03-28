import { DeployableFormMetadata } from "@/components/atoms/colums-of-tables/deployableForm";
import React from "react";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

type Props = {
  selectedProjects: DeployableFormMetadata[];
};

export default function FinalFormData({ selectedProjects }: Props) {
  return (
    <div>
      <table>
        <thead className="">
          <tr>
            <th className="px-2 border">#</th>
            <th className="px-2 border">Exigence principal</th>
            <th className="px-2 border">Petit expl. agri</th>
            <th className="px-2 border">Grande expl. agri</th>
            <th className="px-2 border">Direction de group</th>
            <th className="px-2 border">C</th>
            <th className="px-2 border">NC</th>
            <th className="px-2 border">NA</th>
            <th className="px-2 border">Commentaire</th>
          </tr>
        </thead>
        <tbody>
          {selectedProjects?.map((item, idx) => (
            <tr key={idx}>
              <td className="px-2 border">{item.number}</td>
              <td className="px-2 border">
                <div
                  dangerouslySetInnerHTML={{
                    __html: item.principal_requirement,
                  }}
                ></div>
              </td>
              <td className="px-2 border">
                {item.certif_de_group.petite_exploitation_agricole === "YES" ? (
                  <FaCheck color="green" />
                ) : item.certif_de_group.petite_exploitation_agricole ===
                  "NO" ? (
                  <ImCross color="red" />
                ) : (
                  ""
                )}
              </td>
              <td className="px-2 border">
                {item.certif_de_group.grande_exploitation_agricole === "YES" ? (
                  <FaCheck color="green" />
                ) : item.certif_de_group.grande_exploitation_agricole ===
                  "NO" ? (
                  <ImCross color="red" />
                ) : (
                  ""
                )}
              </td>
              <td className="px-2 border">
                {item.certif_de_group.direction_du_group === "YES" ? (
                  <FaCheck color="green" />
                ) : item.certif_de_group.direction_du_group === "NO" ? (
                  <ImCross color="red" />
                ) : (
                  ""
                )}
              </td>
              <td className="px-2 border">
                <input type="radio" id="C" name="C" />
              </td>
              <td className="px-2 border">
                <input type="radio" id="NC" name="C" />
              </td>
              <td className="px-2 border">
                <input type="radio" id="NA" name="C" />
              </td>
              <td className="px-2 border">
                <textarea className="p-2 border-none h-full" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
