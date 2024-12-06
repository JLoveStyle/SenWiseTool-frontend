import { Route } from "@/lib/route";
import { ActivityProps } from "@/types/activity";
import { fetchApiData } from "@/utiles/services/queries";

// Fonction pour générer les paramètres statiques
export async function generateStaticParams() {
  const activities = await fetchApiData(Route.agricultureRequest, "");
  return activities.map((activity: ActivityProps) => ({
    id: activity.id?.toString(),
  }));
}
