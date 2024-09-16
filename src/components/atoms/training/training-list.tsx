import { TrainingProps } from "@/types/formData";
import { LOCAL_STORAGE } from "@/utiles/services/storage";

export const trainingList = async (
  companyId: string
): Promise<TrainingProps[]> => {
  // const currentUser = useUserStore();

  // const trainings = await db_get_trainings(companyId);
  // console.log("trainings from db: ", trainings);
  // console.log("user from db: ", currentUser);

  const trainings = LOCAL_STORAGE.get("trainings");

  return trainings;
};
