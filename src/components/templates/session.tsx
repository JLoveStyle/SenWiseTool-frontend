"use client";

import { useToggle } from "@/hooks/use-toggle";
import { useApiOps } from "@/lib/api-provider";
import { Route } from "@/lib/route";
import {
  AUTHENTICATED,
  COMPANY_DISABLED,
  GUEST,
  HAS_COMPANY,
  NOT_HAS_COMPANY,
} from "@/lib/session-statut";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { ApiDataResponse, UserType } from "@/types/api-types";
import { SessionStatusType } from "@/types/type-tools";
import { fetchApiData } from "@/utiles/services/queries";
import { useAuth } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { ScreenSpinner } from "../atoms/spinner/screen-spinner";

interface Props {
  children: React.ReactNode;
  sessionStatus?: SessionStatusType;
}

export const Session = ({ children, sessionStatus }: Props) => {
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const companys = useCompanyStore((state) => state.company);

  const router = useRouter();
  const { value: isLoading, setValue: setIsLoading } = useToggle({
    initial: true,
  });

  console.log("Token from session:", LOCAL_STORAGE.get("token"));

  const { userId, getToken } = useAuth();
  const company = useCompanyStore((state) => state.company);

  const { refetch } = useApiOps<UserType, ApiDataResponse<UserType>>({
    fn: () => fetchApiData(Route.user, "current"),
    route: Route.user,
  });

  const routeTo = () => {
    if (sessionStatus === GUEST && userId) return Route.dashboard;
    if (sessionStatus === AUTHENTICATED && !userId) return Route.signIn;
    if (sessionStatus === HAS_COMPANY) {
      if (!userId) return Route.signIn;
      if (!company) return Route.createCompany;
    }
    if (sessionStatus === NOT_HAS_COMPANY) {
      if (!userId) return Route.signIn;
      console.log("companys :::::::::::1", companys);
      if (company) return Route.dashboard;
    }
    if (sessionStatus === COMPANY_DISABLED) {
      if (!userId) return Route.signIn;
      if (!company) return Route.createCompany;
      if (company.status !== "INACTIVE") return Route.dashboard;
    }
    return "";
  };

  useEffect(() => {
    refetch(); // Récupère les données de l'utilisateur

    const nextRoute = routeTo();
    if (sessionStatus && nextRoute.length !== 0) router.push(nextRoute);

    setIsLoading(false); // Met à jour après la redirection
  }, [userId]);

  if (isLoading) return <ScreenSpinner />;

  return <>{children}</>;
};
