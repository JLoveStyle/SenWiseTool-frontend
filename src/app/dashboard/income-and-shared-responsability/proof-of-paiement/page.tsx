"use client";

import { Route } from "@/lib/route";

import { Archive, Trash2 } from "lucide-react";
// import { columnListProjects } from "../atoms/colums-of-tables/listOfProjects";
import { FaCheck, FaHandHoldingDollar } from "react-icons/fa6";

import { DataTable } from "@/components/molecules/projectsTable";
import CustomHoverCard from "@/components/organisms/hoverCard";
// import { Newagriculture } from "@/components/organisms/tracability/agriculture/new-agriculture";
import { NewProofOfPaiement } from "@/components/organisms/income-and-shared-responsability/proof-of-paiement/new-proof-of-paiement";
import { columnTable } from "@/components/templates/column-table";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { useToggle } from "@/hooks/use-toggle";
import { DashboardStatPanelData } from "@/types/app-link";
import {
  ProofOfPaiementDisplayProps,
  incomeAndSharedResponsabilityDBProps,
} from "@/types/income-and-shared-responsability";
import { fetchApiData } from "@/utiles/services/queries";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";

export default function ProofOfPaiement() {
  const [isLoading, setIsLoading] = useState(true);
  const [proofOfPaiementDatas, setProofOfPaiementDatas] = useState<
    ProofOfPaiementDisplayProps[]
  >([]);
  const [proofOfPaiementSelected, setProofOfPaiementSelected] = useState<
    ProofOfPaiementDisplayProps[]
  >([]);

  const { value: openModal, toggle: toggleOpenModel } = useToggle({
    initial: false,
  });

  const closeDialog = () => {
    toggleOpenModel();
  };

  const columns = columnTable<ProofOfPaiementDisplayProps>(
    {
      id: "id",
      agreement_pv: "PV d'entente",
      proof_of_paiement: "Preuve de paiement",
      proof_of_expenses: "Justificatif de dépenses",
    },
    Route.incomeAndSharedResponsabilityProofOfPaiement,
    false
  );
  const formatedDataFromDBToDisplay = (
    data: incomeAndSharedResponsabilityDBProps
  ) => {
    return {
      id: data.id ?? "",
      agreement_pv: data.agreement_pv,
      proof_of_paiement: data.proof_of_paiement ? (
        <FaCheck color="green" />
      ) : (
        <ImCross color="red" />
      ),
      proof_of_expenses: data.proof_of_expenses ? (
        <FaCheck color="green" />
      ) : (
        <ImCross color="red" />
      ),
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchApiData(
          Route.incomeAndSharedResponsabilityProofOfPaiement,
          ""
        );
        const dataFormated: ProofOfPaiementDisplayProps[] = [];

        if (result.status === 200) {
          setIsLoading(false);
          if (Array.isArray(result.data)) {
            console.log("if condition");
            result.data.forEach((res: incomeAndSharedResponsabilityDBProps) => {
              dataFormated.push(formatedDataFromDBToDisplay(res));
            });
          } else {
            dataFormated.push(formatedDataFromDBToDisplay(result.data));
          }
          setProofOfPaiementDatas(dataFormated);
          setIsLoading(false);
        }
      } catch (err) {
        console.error(
          "Error fetching income and shared responsability datas: ",
          err
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const valueToDisplay = (args: ProofOfPaiementDisplayProps[]) => {
    return args?.map((data) => ({
      id: data.id ?? "",
      // company_id: data.company_id,
      agreement_pv: data.agreement_pv,
      proof_of_paiement: data.proof_of_paiement,
      proof_of_expenses: data.proof_of_expenses,
    }));
  };

  const formParams = {
    trigger_btn_label_form: "New proof",
    construct_form_btn_label: "New proof form",
    existing_form_btn_label: "Use Existing Form",
    new_form_title: "Create new proof of paiement",
    construct_form_btn_icon: FaHandHoldingDollar,
  };

  const deleteProofOfPayment = () => {
    if (proofOfPaiementSelected.length !== 0) {
      const allProof = LOCAL_STORAGE.get("proofOfPaiement");
      const idSelecteds = proofOfPaiementSelected.map((objet) => objet.id);
      const restProofOfPaiement: incomeAndSharedResponsabilityDBProps[] = [];

      allProof.map((item: incomeAndSharedResponsabilityDBProps) => {
        if (!idSelecteds.includes(item.id ?? "")) {
          restProofOfPaiement.push(item);
        }
      });
      LOCAL_STORAGE.save("proofOfPaiement", restProofOfPaiement);

      toast.success("Accounts are deleted successfull");
    }
  };

  const stateActivity: DashboardStatPanelData[] = [
    {
      structure: {
        label: "Number",
        baseUrl: "",
        icon: Archive,
      },
      data: () => {
        return proofOfPaiementDatas.length;
      },
    },
  ];

  return (
    <LayoutDashboardTemplate
      newForms={[
        {
          title: "New activity",
          form: (
            <NewProofOfPaiement
              endpoint={Route.incomeAndSharedResponsabilityProofOfPaiement}
            />
          ),
        },
      ]}
      title="JUSTIFICATIF DE PAIEMENT"
      formParams={formParams}
      statPanelDatas={stateActivity}
    >
      <div className="flex justify-between pb-4 pt-2 px-6">
        <h1 className="text-xl font-semibold">
          Justificatifs de payement de l’investissement de durabilité
        </h1>
        <div className="flex gap-4 text-gray-500">
          {proofOfPaiementSelected.length !== 0 && (
            <>
              <CustomHoverCard content="archive project">
                <Archive className="hover:cursor-pointer" />
              </CustomHoverCard>
              <CustomHoverCard content="Delete Accounts">
                <Trash2
                  className="hover:cursor-pointer"
                  onClick={deleteProofOfPayment}
                />
              </CustomHoverCard>
            </>
          )}
        </div>
      </div>
      <div className="px-6">
        <DataTable<ProofOfPaiementDisplayProps, any>
          incomingColumns={columns}
          incomingData={
            proofOfPaiementDatas?.length
              ? valueToDisplay(proofOfPaiementDatas)
              : []
          }
          onSelecteItem={(selects) => {
            setProofOfPaiementSelected(selects);
          }}
          isLoading={isLoading}
        />
      </div>
    </LayoutDashboardTemplate>
  );
}
