import { ActivityProps } from "@/types/activity";
import { LOCAL_STORAGE } from "@/utiles/services/storage";

// Fonction pour générer les paramètres statiques
export async function generateStaticParams() {
  const activities = await LOCAL_STORAGE.get("agricultures");
  return activities.map((activity: ActivityProps) => ({
    id: activity.id?.toString(),
  }));
}
