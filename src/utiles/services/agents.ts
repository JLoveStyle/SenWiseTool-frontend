"use server";
import { Route } from "@/lib/route";
import { DBAgentProps } from "@/types/agent-props";
import { ApiDataResponse, TrainingType } from "@/types/api-types";
import { mutateDelApiData, mutateUpApiData } from "@/utiles/services/mutations";
import ApiCall from "./httpClients";
import { fetchApiData } from "./queries";
import { LOCAL_STORAGE } from "./storage";

export const db_create_agent = async (data: DBAgentProps) => {
  const agents = LOCAL_STORAGE.get("agents") || [];
  const id = agents.length != 0 ? agents.length + 1 : 1;
  LOCAL_STORAGE.save("agents", [...agents, { id: id, ...data }]);
  return { response: "creation successfull", status: "success" };

  // return mutateApiData(Route.training, data)
  //   .then((response) => {
  //     if (response.status === 201)
  //       return {
  //         message: "Training created successfully ",
  //         response: response.data,
  //         status: "success",
  //       };
  //     else
  //       return {
  //         message: "Creating training failed",
  //         code: (response?.status as number) || 500,
  //         status: "error",
  //       };
  //   })
  //   .catch((error) => {
  //     return { response: error, status: "error" };
  //   });
};

export const db_update_agent = async (data: DBAgentProps, id: string) => {
  return mutateUpApiData<ApiDataResponse<TrainingType>>(Route.agents, data, id)
    .then((response) => {
      if (typeof response != "undefined" && response?.status === 204)
        return {
          message: "Training updated successfully ",
          response: response.data,
          status: "success",
        };
      else
        return {
          message: "Creating training failed",
          code: (response?.status as number) || 500,
          status: "error",
        };
    })
    .catch((error) => {
      return { response: error, status: "error" };
    });
};

export const db_get_agents = async (companyId?: string, id?: string) => {
  //Local datas ***************************************
  // console.log("agents", LOCAL_STORAGE.get("agents"));

  if (typeof window !== "undefined") {
    const agents = localStorage.getItem("agents");
    if (agents) {
      try {
        const parsedAgents = JSON.parse(agents);
      } catch (error) {
        console.error("Erreur lors du parsing de agents:", error);
      }
    } else {
      console.log("Aucun agent trouvé dans le localStorage.");
    }
  } else {
    console.log("localStorage n'est pas disponible côté serveur.");
  }

  return LOCAL_STORAGE.get("agents");

  // end Local datas ******************************
};

export const db_delete_agent = async (id: string) => {
  return mutateDelApiData<ApiDataResponse<TrainingType>>(Route.training, id)
    .then((response) => {
      if (typeof response != "undefined" && response?.status === 204)
        return { data: response.message };
      return {
        error: {
          message: "Deleting training failed",
          code: (response?.status as number) || 500,
        },
      };
    })
    .catch((error) => {
      return {
        error: {
          message: (error as Error).message || "Erreur inconnue",
          code: (error as any).code || 500,
        },
      };
    });
};
