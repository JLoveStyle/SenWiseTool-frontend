import Image from "next/image";
import PrintContent from "../print-content";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrainingProps } from "@/types/formData";
import dayjs from "dayjs";
import { useCompanyStore } from "@/lib/stores/companie-store";

interface Props {
  row?: number;
  editableCell?: boolean;
  data: TrainingProps;
}

export const AttendanceSheetForm = ({
  row = 13,
  editableCell = true,
  data,
}: Props) => {
  const rows = Array.from({ length: row }, () =>
    Array.from({ length: 7 }, () => "")
  );

  // Load company object
  const company = useCompanyStore((state) => state.company)

  const backgroundImageUrl = "/images/logo-sm-senima.png";

  return (
    <PrintContent className="py-5">
      <div>
        {/* <div className="flex justify-center items-center">
          <Image
            src="/images/logo-lg-senima.png"
            alt="company logo"
            width={500}
            height={200}
          />
        </div> */}
        <div className="items-center m-20">
          <div className="flex flex-col items-center gap-3">
            <u className="font-bold">
              FICHE DE PRESENCE
            </u>
            <div>
              <u className="font-bold mr-2">Theme :</u>
              <span>{data?.title}</span>
            </div>
            <div>
              <span className="font-bold mr-2">Date : .....................................</span>
              {/* <span>{dayjs(new Date().toISOString()).toString().slice(0, -7)}</span> */}

            </div>
            <div className="my-5">
              <u className="font-bold text-lg">Fiche de présence</u>
            </div>
          </div>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "500px",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundImage: `url(${company?.logo})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                // opacity: 0.5,
                zIndex: -1,
              }}
            >
              <Table style={{ borderCollapse: "collapse", width: "100%" }}>
                <TableHeader>
                  <TableRow className="bg-gray-100">
                    <TableHead className="border-[1px] border-gray-300">
                      N°
                    </TableHead>
                    <TableHead className="border-[1px] border-gray-300">
                      Noms et Prénoms
                    </TableHead>
                    <TableHead className="border-[1px] border-gray-300">
                      Sexe
                    </TableHead>
                    <TableHead className="border-[1px] border-gray-300">
                      Organisation
                    </TableHead>
                    <TableHead className="border-[1px] border-gray-300">
                      Fonction
                    </TableHead>
                    <TableHead className="border-[1px] border-gray-300">
                      Contacts
                    </TableHead>
                    <TableHead className="border-[1px] border-gray-300">
                      Signature
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <TableCell
                          key={cellIndex}
                          className="border-[1px] border-gray-300 p-5 text-center"
                          contentEditable={editableCell}
                        ></TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex items-center justify-end mr-60 mt-5">
                <span className="font-bold">Formateur : </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PrintContent>
  );
};
