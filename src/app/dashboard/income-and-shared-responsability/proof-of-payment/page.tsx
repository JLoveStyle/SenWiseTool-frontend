"use client";

import { Route } from "@/lib/route";
import { Archive, ListOrdered, Trash2 } from "lucide-react";
import { FaCheck, FaHandHoldingDollar } from "react-icons/fa6";
import { DataTable } from "@/components/molecules/projectsTable";
import CustomHoverCard from "@/components/organisms/hoverCard";
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
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";
import { mutateDelApiData } from "@/utiles/services/mutations";
import ModalContent from "@/components/organisms/modalContent";

export default function ProofOfPaiement() {
  const [isLoading, setIsLoading] = useState(true);
  const [deleteProof, setDeleteProof] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false)
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
          Route.revenuEtResponsabilite,
          "?type=PAYMENT_JUSTIFICATION",
          ""
        );
        const dataFormated: ProofOfPaiementDisplayProps[] = [];

        console.log("result => ", result);

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

  const deleteProofOfPayment = async () => {

    if (proofOfPaiementSelected.length !== 0) {
      setIsDeleting(true)
      for (const item of proofOfPaiementSelected) {
        console.log('deleted id => ', item?.id)
        await mutateDelApiData(Route.revenuEtResponsabilite + `/${item?.id}`, "")
          .then((response: any) => {
            console.log(response);
            if (response.status == 204) {
              toast.success("Deleted");
              setIsDeleting(prev => !prev)
            } else {
              setIsDeleting(prev => !prev)
              toast.error("Could not delete. please try again")
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
          title: "New activity",
          form: <NewProofOfPaiement endpoint={Route.revenuEtResponsabilite} />,
        },
      ]}
      title="PROOFS OF PAYMENT"
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
          cancelationFunction={() => setDeleteProof(prev =>!prev)}
          actionFunction={deleteProofOfPayment}
          updateOpenModalState={() => setDeleteProof(prev => !prev)}
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
