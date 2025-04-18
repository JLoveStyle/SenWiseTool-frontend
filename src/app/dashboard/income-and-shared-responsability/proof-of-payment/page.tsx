"use client";

import FilePreview from "@/components/atoms/file-preview";
import { DataTable } from "@/components/molecules/projectsTable";
import CustomHoverCard from "@/components/organisms/hoverCard";
import { NewProofOfPaiement } from "@/components/organisms/income-and-shared-responsability/proof-of-paiement/new-proof-of-paiement";
import ModalContent from "@/components/organisms/modalContent";
import { columnTable } from "@/components/templates/column-table";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { Route } from "@/lib/route";
import { DashboardStatPanelData } from "@/types/app-link";
import {
  ProofOfPaiementDisplayProps,
  incomeAndSharedResponsabilityDBProps,
} from "@/types/income-and-shared-responsability";
import { mutateDelApiData } from "@/utiles/services/mutations";
import { fetchApiData } from "@/utiles/services/queries";
import { ListOrdered, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { RiErrorWarningLine } from "react-icons/ri";
import { toast } from "react-toastify";

export default function ProofOfPaiement() {
  const [isLoading, setIsLoading] = useState(true);
  const [deleteProof, setDeleteProof] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [proofOfPaiementDatas, setProofOfPaiementDatas] = useState<
    ProofOfPaiementDisplayProps[]
  >([]);
  const [proofOfPaiementSelected, setProofOfPaiementSelected] = useState<
    ProofOfPaiementDisplayProps[]
  >([]);

  const preview = (url: string, index: number) => {
    return <FilePreview url={url} variant="button" />;
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
      agreement_pv:
        data.agreement_pv?.length !== 0 ? (
          <div className="flex justify-center gap-2 flex-wrap">
            {data.agreement_pv?.map((url, index) => preview(url, index))}
          </div>
        ) : (
          <div className="flex justify-center gap-2 flex-wrap">
            <RiErrorWarningLine className="text-gray-500" size={20} />
          </div>
        ),
      proof_of_paiement:
        data.proof_of_paiement?.length !== 0 ? (
          <div className="flex justify-center gap-2 flex-wrap">
            {data.proof_of_paiement?.map((url, index) => preview(url, index))}
          </div>
        ) : (
          <div className="flex justify-center gap-2 flex-wrap">
            <RiErrorWarningLine className="text-gray-500" size={20} />
          </div>
        ),
      proof_of_expenses:
        data.proof_of_expenses?.length !== 0 ? (
          <div className="flex justify-center gap-2 flex-wrap">
            {data.proof_of_expenses?.map((url, index) => preview(url, index))}
          </div>
        ) : (
          <div className="flex justify-center gap-2 flex-wrap cursor-not-allowed">
            <RiErrorWarningLine className="text-gray-500" size={20} />
          </div>
        ),
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchApiData(
          Route.revenuEtResponsabilite,
          "?type=PAYMENT_JUSTIFICATION",
          ""
        );
        const dataFormated: ProofOfPaiementDisplayProps[] = [];

        if (result.status === 200) {
          setIsLoading(false);
          if (Array.isArray(result.data)) {
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
    choose_form: true,
    construct_form_btn_icon: FaHandHoldingDollar,
  };

  const deleteProofOfPayment = async () => {
    if (proofOfPaiementSelected.length !== 0) {
      setIsDeleting(true);
      for (const item of proofOfPaiementSelected) {
        await mutateDelApiData(Route.revenuEtResponsabilite, item?.id)
          .then((response: any) => {
            if (response.status == 204) {
              toast.success("Deleted");
              setIsDeleting((prev) => !prev);
            } else {
              setIsDeleting((prev) => !prev);
              toast.error("Could not delete. please try again");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  };

  const stateActivity: DashboardStatPanelData[] = [
    {
      structure: {
        label: "Number",
        baseUrl: "",
        icon: ListOrdered,
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
          title: "Nouveau",
          form: <NewProofOfPaiement endpoint={Route.revenuEtResponsabilite} />,
        },
      ]}
      title="INVESTISSEMENT DE DURABILITÉ"
      formParams={formParams}
      statPanelDatas={stateActivity}
    >
      <div className="flex justify-between pb-4 pt-2 px-6">
        <h1 className="text-xl font-semibold">Investissement de durabilité</h1>
        <div className="flex gap-4 text-gray-500">
          {proofOfPaiementSelected.length !== 0 && (
            <>
              <CustomHoverCard content="Delete Accounts">
                <Trash2
                  className="hover:cursor-pointer text-black"
                  onClick={() => setDeleteProof((prev) => !prev)}
                />
              </CustomHoverCard>
            </>
          )}
        </div>
        <ModalContent
          openModal={deleteProof}
          isProcessing={isDeleting}
          dialogTitle={"Delete documents"}
          action={"Delete"}
          dialogDescription={"Are you sure you want to delete this documents?"}
          cancelationFunction={() => setDeleteProof((prev) => !prev)}
          actionFunction={deleteProofOfPayment}
          updateOpenModalState={() => setDeleteProof((prev) => !prev)}
        />
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
