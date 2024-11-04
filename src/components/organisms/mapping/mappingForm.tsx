import Print from "@/components/atoms/print";
import PrintContent from "@/components/atoms/print-and-edit-content";
import { Input } from "@/components/ui/input";
import { MappingTableColumns } from "@/utiles/services/constants";
import React from "react";

type Props = {};

export default function MappingForm({}: Props) {
  const rows = Array.from({ length: 8 }, () =>
    Array.from({ length: 7 }, () => "")
  );
  return (
    <Print fileName="Mapping-form" onClick={() => {}} deployProject={() => {}}>
      <div className="px-6 mt-4">
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr className="bg-gray-100">
              {MappingTableColumns.map((item, idx) => (
                <th key={idx} className="border w-fit border-gray-300">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* CREATE 20 LINES */}
            {[...Array(20)].map((item, idx) => (
              <tr key={idx}>
                {[...Array(13)].map((item, idx) => (
                  <td key={idx}>
                    <Input type="text" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Print>
  );
}
