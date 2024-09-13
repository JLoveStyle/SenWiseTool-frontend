import { TrainingProps } from "@/types/formData";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { db_get_trainings } from "@/utiles/services/training";

export const getTrainings = async (): Promise<TrainingProps[]> => {
  // const currentUser = useUserStore();

  const trainings = await db_get_trainings();
  console.log("trainings from db: ", trainings);
  // console.log("user from db: ", currentUser);

  // Retourner les données soit depuis la base de données, soit une valeur statique
  return LOCAL_STORAGE.get("trainings");
};
