import { Route } from "@/lib/route";
import { DBTrainingProps } from "@/types/formData";
import ApiCall from "./httpClients";

export const db_create_training = async (data: DBTrainingProps) => {
  const db = new ApiCall();

  db.POST(Route.db_base_url, data)
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

export const db_update_training = async (data: DBTrainingProps, id: string) => {
  const db = new ApiCall();

  const url_formated = `${Route.db_base_url}/${id}`;

  db.PATCH(url_formated, data)
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

  db.GET(Route.db_base_url)
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

  const url_formated = `${Route.db_base_url}/${id}`;

  db.DELETE(url_formated)
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
