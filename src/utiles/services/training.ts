import { Route } from "@/lib/route";
import { TrainingType } from "@/types/api-types";
import { DBTrainingProps, LocalTrainingProps } from "@/types/formData";
import {
  mutateApiData,
  mutateDelApiData,
  mutateUpApiData,
} from "@/utiles/services/mutations";
import ApiCall from "./httpClients";
import { fetchApiData } from "./queries";
import { LOCAL_STORAGE } from "./storage";

export const db_create_training = async (data: DBTrainingProps) => {
  const db = new ApiCall();

  // Local storage

  let trainings = LOCAL_STORAGE.get("trainings")
    ? LOCAL_STORAGE.get("trainings")
    : [];

  const id = trainings.length !== 0 ? trainings.at(-1).id + 1 : 1;

  const localDbData = { id: id, ...data, status: "DRAFT" };

  trainings.push(localDbData);
  LOCAL_STORAGE.save("trainings", trainings);

  const response = {
    message: {
      message: "Created successfull",
      statusCode: 201,
    },
  };
  return { response: response, status: "success" };
  // end local storage

  return mutateApiData<TrainingType>(Route.training, data)
    .then((response) => {
      if (response.status) return { response: response, status: "success" };
      else return { response: response, status: "error" };
    })
    .catch((error) => {
      return { response: error, status: "error" };
    });
};

export const db_update_training = async (data: DBTrainingProps, id: string) => {
  const db = new ApiCall();

  const url_formated = `${Route.training}/${id}`;

  // Local storage

  let trainings = LOCAL_STORAGE.get("trainings")
    ? LOCAL_STORAGE.get("trainings")
    : [];

  let localDbData: LocalTrainingProps[] = [];

  trainings.forEach((training: LocalTrainingProps) => {
    if (training.id === id) {
      localDbData.push({ ...training, ...data });
    } else {
      localDbData.push(training);
    }
  });

  LOCAL_STORAGE.save("trainings", localDbData);

  const response = {
    message: {
      message: "Updated successfull",
      statusCode: 201,
    },
  };
  return { response: response, status: "success" };
  // end local storage

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

export const db_get_trainings = async (companyId: string) => {
  const db = new ApiCall();

  fetchApiData<TrainingType>(Route.training, companyId)
    .then((response) => {
      console.log("Réponse du serveur :", response);
    })
    .catch((error) => {
      console.error("Erreur lors de l'envoi des données :", error);
    });
  return [];
};

export const db_delete_training = async (id: string) => {
  const db = new ApiCall();

  // Local storage

  let trainings = LOCAL_STORAGE.get("trainings")
    ? LOCAL_STORAGE.get("trainings")
    : [];

  let localDbData: LocalTrainingProps[] = [];

  trainings.forEach((training: LocalTrainingProps) => {
    if (training.id !== id) {
      localDbData.push(training);
    }
  });

  console.log("NewData ", localDbData);

  LOCAL_STORAGE.save("trainings", localDbData);

  const response = {
    message: {
      message: "Updated successfull",
      statusCode: 201,
    },
  };
  return { response: response, status: "success" };
  // end local storage

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
