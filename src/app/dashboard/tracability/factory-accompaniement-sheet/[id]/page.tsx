"use client";

import { Route } from "@/lib/route";

// import { columnListProjects } from "../atoms/colums-of-tables/listOfProjects";

import { columnTable } from "@/components/templates/column-table";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { ReceiptProps, ReceiptTableProps } from "@/types/tracability/receipt";
import { db_get_receipts } from "@/utiles/services/tracability/receipt";
import { useEffect, useState } from "react";

import { ButtonUI } from "@/components/atoms/disign-system/button-ui";
import { Spinner } from "@/components/atoms/spinner/spinner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
import { PiPrinterFill } from "react-icons/pi";

type TProps = {
  params: {
    id: string;
  };
};

export default function FactoryAccompaniementSheetPrintable({
  params: { id },
}: TProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [receiptDatas, setReceiptDatas] = useState<ReceiptProps[]>([]);

  const columns = columnTable<ReceiptTableProps>(
    {
      id: "id",
      market_id: "marché",
      village: "village",
      farmer_id: "cultivateur",
      date: "date",
      net_weight_in_kg: "poids net",
      quantity_in_bags: "quantité",
      buyer: "Acheteur",
    },
    Route.receipt
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const receipts = (await db_get_receipts()) as ReceiptProps[];

        if (receipts) {
          setReceiptDatas(
            receipts.filter(
              (receipt) => receipt.market_id == id
            ) as ReceiptProps[]
          );
        }
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // refetch();
  }, [receiptDatas, id]);

  return (
    <LayoutDashboardTemplate title="Traçabilité - Les Details de la fiche d'accompagnement à l'usine">
      <ButtonUI
        className="mx-10 p-0 bg-transparent hover:bg-transparent text-gray-950 hover:text-gray-500"
        icon={{ icon: MoveLeft }}
        size="very-small"
        baseURL={Route.factoryAccompaniementSheet}
      />
      <div className="flex items-center w-full gap-5 px-2">
        <div className="bg-slate-50 w-5/6 mt-3">
          <h1 className="text-xl font-bold text-center w-full py-3">
            Fiche d'accompagnement à l'usine du marché {id}
          </h1>
          <div className="w-full p-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom du planteur</TableHead>
                  <TableHead>Code du planteur</TableHead>
                  <TableHead>Marché</TableHead>
                  <TableHead>Emplacement</TableHead>
                  <TableHead>Nombre de sacs</TableHead>
                  <TableHead>Poids total</TableHead>
                  <TableHead>Humidité</TableHead>
                  <TableHead>Refraction</TableHead>
                  <TableHead>Poids</TableHead>
                  <TableHead>Prix du jour</TableHead>
                  <TableHead className="text-right">Total à payer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading && (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24">
                      <div className="flex justify-center text-center w-full">
                        <Spinner color="#999" size="large" />
                      </div>
                    </TableCell>
                  </TableRow>
                )}
                {!isLoading &&
                  Array.isArray(receiptDatas) &&
                  receiptDatas.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        <div className="flex items-center justify-center mt-28">
                          <Image
                            src="/svg/empty.svg"
                            height={250}
                            width={350}
                            alt="Empty illustration"
                            className="animate-empty-image"
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  )}

                {!isLoading &&
                  Array.isArray(receiptDatas) &&
                  receiptDatas.map((receipt, index) => (
                    <TableRow key={index}>
                      <TableCell>{receipt.farmer_id}</TableCell>
                      <TableCell>{receipt.id}</TableCell>
                      <TableCell>{receipt.market_id}</TableCell>
                      <TableCell>{receipt.village}</TableCell>
                      <TableCell>{receipt.quantity_in_bags}</TableCell>
                      <TableCell>{receipt.net_weight_for_sale}</TableCell>
                      <TableCell>{receipt.humidity_level_of_product}</TableCell>
                      <TableCell>{receipt.id}</TableCell>
                      <TableCell>{receipt.net_weight_in_kg}</TableCell>
                      <TableCell>{receipt.id}</TableCell>
                      <TableCell className="text-right">{receipt.id}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
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
