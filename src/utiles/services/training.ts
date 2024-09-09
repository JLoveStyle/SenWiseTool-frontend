import { Route } from "@/lib/route";
import { DBTrainingProps } from "@/types/formData";
import ApiCall from "./httpClients";
import { API_URL } from "./constants";
import { mutateApiData, mutateDelApiData, mutateUpApiData } from "@/utiles/services/mutations";
import { TrainingType } from "@/types/api-types";
import { fetchApiData } from "./queries";

export const db_create_training = async (data: DBTrainingProps) => {
  const db = new ApiCall();

  console.log("from db_create_training:", data);
  return mutateApiData<TrainingType>(Route.training, data)
    .then((response) => {
      console.log("from db_create_training:", response);

      // const result = response.json();
      // return { data: result.message };
    })
    .catch((error) => {
      console.error("Erreur lors de l'envoi des données :", error);
      return {
        error: {
          message: (error as Error).message || "Erreur inconnue",
          code: (error as any).code || 500,
        },
      };

    });
};

export const db_update_training = async (data: DBTrainingProps, id: string) => {
  const db = new ApiCall();

  const url_formated = `${Route.training}/${id}`;

  mutateUpApiData<TrainingType>(Route.training, data, id)
    .then((response) => {
      // const result = response.json();
      // return { data: result.message };
      console.log("Réponse du serveur :", response);
    })
    .catch((error) => {
      // return {
      //   error: {
      //     message: (error as Error).message || "Erreur inconnue",
      //     code: (error as any).code || 500,
      //   },
      // };
      console.error("Erreur lors de l'envoi des données :", error);
    });
};

export const db_get_trainings = async (data: DBTrainingProps) => {
  const db = new ApiCall();

  fetchApiData<TrainingType>(Route.training)
    .then((response) => {
      // const result = response.json();
      // return { data: result.message };
      console.log("Réponse du serveur :", response);
    })
    .catch((error) => {
      // return {
      //   error: {
      //     message: (error as Error).message || "Erreur inconnue",
      //     code: (error as any).code || 500,
      //   },
      // };
      console.error("Erreur lors de l'envoi des données :", error);
    });
};

export const db_delete_training = async (data: DBTrainingProps, id: string) => {
  const db = new ApiCall();

  // const url_formated = `${Route.db_base_url}/${id}`;

  mutateDelApiData<TrainingType>(Route.training, id)
    .then((response) => {
      // const result = response.json();
      // return { data: result.message };
      console.log("Réponse du serveur :", response);
    })
    .catch((error) => {
      // return {
      //   error: {
      //     message: (error as Error).message || "Erreur inconnue",
      //     code: (error as any).code || 500,
      //   },
      // };
      console.error("Erreur lors de l'envoi des données :", error);
    });
};
