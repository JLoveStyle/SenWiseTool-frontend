"use server";
import { Route } from "@/lib/route";
import { ApiDataResponse, TrainingType } from "@/types/api-types";
import { DBTrainingProps } from "@/types/formData";
import {
  mutateApiData,
  mutateDelApiData,
  mutateUpApiData,
} from "@/utiles/services/mutations";
import ApiCall from "./httpClients";
import { fetchApiData } from "./queries";
// import { LOCAL_STORAGE } from "./storage";

export const db_create_training = async (data: DBTrainingProps) => {
  return mutateApiData(Route.training, data)
    .then((response) => {
      if (response.status === 201)
        return {
          message: "Training created successfully ",
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

export const db_update_training = async (data: DBTrainingProps, id: string) => {
  return mutateUpApiData<ApiDataResponse<TrainingType>>(
    Route.training,
    data,
    id
  )
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

export const db_get_trainings = async (companyId?: string) => {
  const db = new ApiCall();

  return await fetchApiData<ApiDataResponse<TrainingType[] | TrainingType>>(
    Route.training,
    companyId
  )
    .then((response) => {
      if (typeof response != "undefined") {
        return response.data;
      }
    })
    .catch((error) => {
      console.error("Erreur lors de l'envoi des données :", error);
      if (!companyId) return [] as TrainingType[];
      return null;
    });
};

export const db_delete_training = async (id: string) => {
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
