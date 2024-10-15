"use client";

import { Route } from "@/lib/route";

import {
  Archive,
  FilePenLine,
  LucideBlinds,
  LucideX,
  Rocket,
  Trash2,
} from "lucide-react";
import { RiUserStarLine } from "react-icons/ri";
// import { columnListProjects } from "../atoms/colums-of-tables/listOfProjects";

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
  AgentProps,
  AgentPropsFromDB,
  CodeProjectProps,
} from "@/types/agent-props";
import { DashboardStatPanelData } from "@/types/app-link";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { receiptStatData } from "@/utiles/tracability.const/statistics";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Receipt() {
  const [isLoading, setIsLoading] = useState(true);
  const [agentDatas, setAgentDatas] = useState<AgentPropsFromDB[]>([]);
  const [agentSelected, setAgentSelected] = useState<AgentPropsFromDB[]>([]);
  const [errors, setErrors] = useState({});

  const { value: openModal, toggle: toggleOpenModel } = useToggle({
    initial: false,
  });
  const projectCodeSeparator = " ";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const result = await db_get_agents();
        const result = LOCAL_STORAGE.get("agents");
        // console.log("data agent list: ", result);
        setAgentDatas(result as AgentPropsFromDB[]);
      } catch (err) {
        console.error("Error fetching agents: ", err);
      } finally {
        setIsLoading(false);
      }
    };

    // const fetchData = async () => {
    // const result = await db_get_agents()
    // .then((result) => {
    // console.log("data agent list: ", result);

    // setAgentDatas(result as AgentProps[]);
    // setIsLoading(false);
    // })
    // .catch((err) => console.error(err));
    // };

    fetchData();
  }, []);

  const valueToDisplay = (args: AgentPropsFromDB[]) => {
    return args?.map((agents) => ({
      id: agents.id,
      agentCode: agents.agentCode,
      fullName: agents.fullName,
      projectCodes:
        typeof agents.projectCodes != "string"
          ? agents.projectCodes?.join(projectCodeSeparator)
          : agents.projectCodes,
    }));
  };

  useEffect(() => {
    // refetch();
  }, [agentDatas]);

  // const statPanelDatas: DashboardStatPanelData[] = [
  //   {
  //     structure: {
  //       label: "Deployed",
  //       baseUrl: "",
  //       icon: Rocket,
  //     },
  //     data: () => {
  //       return 0;
  //     },
  //   },
  //   {
  //     structure: {
  //       label: "Draft",
  //       baseUrl: "",
  //       icon: FilePenLine,
  //     },
  //     data: () => {
  //       return 0;
  //     },
  //   },
  //   {
  //     structure: {
  //       label: "Archive",
  //       baseUrl: "",
  //       icon: Archive,
  //     },
  //     data: () => {
  //       return 0;
  //     },
  //   },
  // ];

  const statPanelDatas: DashboardStatPanelData[] = [
    {
      structure: {
        label: "Ventes",
        baseUrl: "",
        icon: Rocket,
      },
      data: () => {
        return receiptStatData.totalSale;
      },
    },
    {
      structure: {
        label: "Marchés",
        baseUrl: "",
        icon: FilePenLine,
      },
      data: () => {
        return receiptStatData.distinctMarketCount;
      },
    },
    {
      structure: {
        label: "Quantités",
        baseUrl: "",
        icon: Archive,
      },
      data: () => {
        return receiptStatData.totalQuantity;
      },
    },
    {
      structure: {
        label: "Poids.Net",
        baseUrl: "",
        icon: Archive,
      },
      data: () => {
        return receiptStatData.totalNetWeight;
      },
    },
  ];
  const formParams = {
    trigger_btn_label_form: "New Agent",
    construct_form_btn_label: "Generate Sub Accounts",
    existing_form_btn_label: "Use Existing Sub Accounts",
    new_form_title: "Generate a new agent Coordinate",
    construct_form_btn_icon: RiUserStarLine,
  };

  const deleteAgentAccounts = () => {
    if (agentSelected.length !== 0) {
      const allAgentsAccounts = LOCAL_STORAGE.get("agents");
      const idSelecteds = agentSelected.map((objet) => objet.id);

      const restAccount: AgentProps[] = [];
      allAgentsAccounts.map((item: AgentProps) => {
        if (!idSelecteds.includes(item.id)) {
          restAccount.push(item);
        }
      });
      LOCAL_STORAGE.save("agents", restAccount);

      toast.success("Accounts are deleted successfull");
    }
  };

  const [formProjectCode, setFormProjectCode] = useState<CodeProjectProps[]>(
    []
  );

  const handleUpdatedFormProjectCode = (
    updatedFormProjectCode: CodeProjectProps[]
  ) => {
    setFormProjectCode(updatedFormProjectCode);
  };

  const onSubmitProjectCodeAgent = () => {
    const allAgents = LOCAL_STORAGE.get("agents");
    let allAgentUpdated: AgentProps[] = [];

    if (agentSelected.length !== 0) {
      agentSelected.map((selected) => {
        // const selected_projectCodes: any[] = (selected.projectCodes || []).map(
        //   (code: CodeProjectProps) => code
        // );
        const selected_projectCodes =
          typeof selected.projectCodes === "string"
            ? selected.projectCodes?.split(projectCodeSeparator)
            : selected.projectCodes;

        formProjectCode.map((projectCode) => {
          if (!selected_projectCodes?.includes(projectCode.value)) {
            selected_projectCodes?.push(projectCode.value);
          }
        });

        selected.projectCodes = selected_projectCodes;

        allAgentUpdated = allAgents.map((agent: AgentProps) =>
          agent.id === selected.id ? selected : agent
        );
      });
    }
    LOCAL_STORAGE.save("agents", allAgentUpdated);

    toast.success("Ajout avec success");
    toggleOpenModel();
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
            Affectez les projets à ces comptes
          </DialogTitle>
        </DialogHeader>

        <div className="p-5">
          <UpdateProjectCodeAgent
            updatedFormProjectCode={handleUpdatedFormProjectCode}
            onSubmitProjectCodeAgent={onSubmitProjectCodeAgent}
            errors={errors}
            isLoading={isLoading}
          />
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <LayoutDashboardTemplate
      newForms={[
        { title: "Nouveau sous compte", form: <NewFormUniqAgent /> },
        { title: "Génération de sous comptes", form: <NewFormMiltipleAgent /> },
      ]}
      title="Agent Manager"
      formParams={formParams}
      statPanelDatas={statPanelDatas}
    >
      <div className="flex justify-between pb-4 pt-2 px-6">
        <h1 className="text-xl font-semibold">Users</h1>
        <div className="flex gap-4 text-gray-500">
          {agentSelected.length !== 0 && (
            <>
              <CustomHoverCard content="archive project">
                <Archive className="hover:cursor-pointer" />
              </CustomHoverCard>
              <CustomHoverCard content="Share project">
                {updateProjectCodeForm}
              </CustomHoverCard>
              <CustomHoverCard content="Delete Accounts">
                <Trash2
                  className="hover:cursor-pointer"
                  onClick={deleteAgentAccounts}
                />
              </CustomHoverCard>
            </>
          )}
        </div>
      </div>
      <div className="px-6">
        <DataTable<AgentPropsFromDB, any>
          incomingColumns={columns}
          incomingData={
            agentDatas?.length
              ? valueToDisplay(agentDatas)
              : agentDatas?.length
              ? valueToDisplay(agentDatas as AgentPropsFromDB[])
              : []
          }
          onSelecteItem={(selects) => {
            setAgentSelected(selects);
          }}
          isLoading={isLoading}
        />
      </div>
    </LayoutDashboardTemplate>
  );
}
