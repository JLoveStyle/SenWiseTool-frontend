"use client";

import { Route } from "@/lib/route";
import {
  ListOrdered,
  LucideBlinds,
  LucideX,
  Trash2,
} from "lucide-react";
import { RiUserStarLine } from "react-icons/ri";
import { NewFormMiltipleAgent } from "@/components/atoms/agents/create-multiple-account/new-form-multiple-agent";
import { NewFormUniqAgent } from "@/components/atoms/agents/create-uniq-account/new-form-uniq-agent";
import { UpdateProjectCodeAgent } from "@/components/atoms/agents/update-project-code-agent";
import { DataTable } from "@/components/molecules/projectsTable";
import CustomHoverCard from "@/components/organisms/hoverCard";
import { columnTable } from "@/components/templates/column-table";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToggle } from "@/hooks/use-toggle";
import {
  AgentPropsFromDB,
  CodeProjectProps,
} from "@/types/agent-props";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fetchApiData } from "@/utiles/services/queries";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { ApiDataResponse, MarketDBProps, ProjectType } from "@/types/api-types";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { DashboardStatPanelData } from "@/types/app-link";
import { mutateDelApiData, mutateUpApiData } from "@/utiles/services/mutations";
import ModalContent from "@/components/organisms/modalContent";

export default function Receipt() {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [agentDatas, setAgentDatas] = useState<AgentPropsFromDB[]>([]);
  const [agentSelected, setAgentSelected] = useState<AgentPropsFromDB[]>([]);
  const [errors, setErrors] = useState({});
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [marketsCodes, setMarketsCodes] = useState<Partial<MarketDBProps>[]>(
    []
  );

  const { value: openModal, toggle: toggleOpenModel } = useToggle({
    initial: false,
  });

  const closeDialog = () => {
    toggleOpenModel();
  };

  const columns = columnTable<AgentPropsFromDB>(
    {
      id: "id",
      agentCode: "agentCode",
      fullName: "fullName",
      projectCodes: "projectCodes",
    },
    Route.agents,
    false
  );

  // Load current campaign
  const currentCampaign = useCampaignStore((state) => state.currentCampaign);
  // Load company object from store
  const company = useCompanyStore((state) => state.company);

  // get all company markets
  async function getAllCompanyMarketCodes() {
    await fetchApiData(
      Route.marketRequest,
      `company_marketCodes?campaign_id=${currentCampaign?.id}`
    )
      .then((response) => {
        if (response.status === 200) {
          setMarketsCodes(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // get all company's project per campain
  async function getAllProjectCodesPerCompnanyAndCampain() {
    await fetchApiData<ApiDataResponse<ProjectType[]>>(
      Route.projects,
      `company_projectCode?campaign_id=${currentCampaign?.id}`
    )
      .then((response) => {
        if (response.status === 200) {
          setProjects(response.data);
          return;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getAllSubAccounts() {
    // TODO: add company_id in the query of this function

    await fetchApiData(Route.assigne, `perCompany?company_id=${company?.id}`)
      .then((response) => {
        if (response.status === 200) {
          const returnedProject = [];
          for (const item of response.data) {
            if (item.projectCodes[0].length < 5) {
              returnedProject.push(item);
            }
          }
          setAgentDatas(returnedProject);
          setIsLoading(false);
          return;
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Internal Server Error");
      });
  }

  // join both marketCodes and project codes
  let joinedCodes: any[] = [];
  if (projects.length || marketsCodes.length)
    joinedCodes = projects.concat(marketsCodes as any[]);

  useEffect(() => {
    getAllSubAccounts();
    getAllCompanyMarketCodes();
    getAllProjectCodesPerCompnanyAndCampain();
  }, [currentCampaign?.id, company?.id]);

  const valueToDisplay = (args: AgentPropsFromDB[]) => {
    return args?.map((agents) => ({
      id: agents.id,
      agentCode: agents.agentCode,
      fullName: agents.fullName,
      projectCodes:
        typeof agents.projectCodes != "string"
          ? agents.projectCodes?.join(" ")
          : agents.projectCodes,
    }));
  };

  const formParams = {
    trigger_btn_label_form: "Nouveau Agent",
    construct_form_btn_label: "Generate Sous compte",
    existing_form_btn_label: "Utiliser un compte existant",
    new_form_title: "Generer des nouveaux code agent",
    construct_form_btn_icon: RiUserStarLine,
  };

  const deleteAgentAccounts = async () => {
    setIsUpdating((prev) => !prev);
    await mutateDelApiData<ApiDataResponse<AgentPropsFromDB>>(
      Route.assigne,
      agentSelected[0]?.agentCode
    )
      .then((response) => {
        if (response?.status === 204) {
          toast.success("Sous compte supprimé");
          setIsUpdating((prev) => !prev);
          setIsDeleting((prev) => !prev); //close modal
          return;
        }
      })
      .catch((error) => {
        console.log(error);
        setIsUpdating((prev) => !prev);
      });
  };

  const [formProjectCode, setFormProjectCode] = useState<CodeProjectProps[]>(
    []
  );

  const handleUpdatedFormProjectCode = (
    updatedFormProjectCode: CodeProjectProps[]
  ) => {
    setFormProjectCode(updatedFormProjectCode);
  };

  const onSubmitProjectCodeAgent = async () => {
    setIsUpdating((prev) => !prev);
    const addedProjectCode: string[] = [];
    for (const item of formProjectCode) {
      addedProjectCode.push(item.value);
    }
    let allCodes: string[] = [];
    if (agentSelected[0]?.projectCodes) {
      let code = "";
      for (const item of agentSelected[0]?.projectCodes) {
        if (item != " ") {
          code = code + item;
        }
        if (code.length === 4) {
          allCodes.push(code);
          code = "";
        }
      }
    }

    // update assignee by id
    await mutateUpApiData(
      Route.assigne,
      {
        projectCodes: addedProjectCode.concat(allCodes),
      },
      agentSelected[0]?.id
    )
      .then((response) => {
        if (response.status === 204) {
          toast.success("Projet assigner avec success.");
          setIsUpdating((prev) => !prev);
          closeDialog;
          return;
        } else {
          toast.error("Something went wrong. Please try again");
          setIsUpdating(false);
          return;
        }
      })
      .catch((error) => {
        console.log(error);
        setIsUpdating((prev) => !prev);
      });
  };

  const updateProjectCodeForm = (
    <Dialog open={openModal}>
      <DialogTrigger asChild>
        <LucideBlinds
          className="hover:cursor-pointer"
          onClick={toggleOpenModel}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] w-full h-fit bg-white rounded-lg">
        <Button
          onClick={closeDialog}
          className="absolute top-4 right-4 bg-transparent hover:bg-transparent text-white hover:text-white focus:outline-none"
        >
          <LucideX />
        </Button>
        <DialogHeader className="p-4 flex h-[80px] bg-black justify-between rounded-t-lg">
          <DialogTitle className="text-xl p-4 font-semibold text-white">
            Assigne more projects to this account
          </DialogTitle>
        </DialogHeader>

        <div className="p-5">
          <UpdateProjectCodeAgent
            isUpdating={isUpdating}
            updatedFormProjectCode={handleUpdatedFormProjectCode}
            onSubmitProjectCodeAgent={onSubmitProjectCodeAgent}
            errors={errors}
            isLoading={isLoading}
          />
        </div>
      </DialogContent>
    </Dialog>
  );

  const sideBarPanel: DashboardStatPanelData[] = [
    {
      structure: {
        label: "Nombre",
        baseUrl: "",
        icon: ListOrdered,
      },
      data: () => {
        return agentDatas?.length;
      },
    },
  ];

  return (
    <LayoutDashboardTemplate
      newForms={[
        {
          title: "Nouveau sous compte",
          form: <NewFormUniqAgent projects={(joinedCodes as any[]) ?? []} />,
        },
        {
          title: "Genere sous comptes",
          form: (
            <NewFormMiltipleAgent projects={(joinedCodes as any[]) ?? []} />
          ),
        },
      ]}
      title="Gestion des agents"
      formParams={formParams}
      statPanelDatas={sideBarPanel}
    >
      <div className="flex justify-between pb-4 pt-2 px-6">
        <h1 className="text-xl font-semibold">Utilisateur</h1>
        <div className="flex gap-4 text-gray-500">
          {agentSelected.length !== 0 && (
            <>
              <CustomHoverCard content="Assign more projects">
                {updateProjectCodeForm}
              </CustomHoverCard>
              <CustomHoverCard content="Delete Accounts">
                <Trash2
                  className="hover:cursor-pointer"
                  onClick={() => setIsDeleting((prev) => !prev)}
                />
              </CustomHoverCard>
            </>
          )}
        </div>
        <ModalContent
          openModal={isDeleting}
          isProcessing={isUpdating}
          dialogTitle={"Supprimer Sous compte ?"}
          action={"Supprimer"}
          dialogDescription={"êtes vous sure de vouloir supprimer sous compte ?"}
          cancelationFunction={() => setIsDeleting((prev) => !prev)}
          actionFunction={deleteAgentAccounts}
          updateOpenModalState={() => setIsDeleting((prev) => !prev)}
        />
      </div>
      <div className="px-6">
        <DataTable
          incomingColumns={columns}
          // incomingColumns={columnsListOfAgents}
          // incomingData={agentDatas}
          incomingData={
            agentDatas?.length
              ? valueToDisplay(agentDatas as AgentPropsFromDB[])
              : []
          }
          onSelecteItem={(selects) => {
            setAgentSelected(selects);
          }}
          isLoading={isLoading}
          inputPlaceholder="Filter par code d'agent..."
        />
      </div>
    </LayoutDashboardTemplate>
  );
}
