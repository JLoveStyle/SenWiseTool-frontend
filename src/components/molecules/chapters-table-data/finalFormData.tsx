import { DeployableFormMetadata } from "@/components/atoms/colums-of-tables/deployableForm";
import React from "react";

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
              <td className="px-2 border">{item.principal_requirement}</td>
              <td className="px-2 border">
                {item.certif_de_group.petite_exploitation_agricole}
              </td>
              <td className="px-2 border">
                {item.certif_de_group.grande_exploitation_agricole}
              </td>
              <td className="px-2 border">
                {item.certif_de_group.direction_du_group}
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
