"use client";

import { useToggle } from "@/hooks/use-toggle";
import { Route } from "@/lib/route";
import {
  AUTHENTICATED,
  COMPANY_DISABLED,
  GUEST,
  HAS_COMPANY,
  NOT_HAS_COMPANY,
} from "@/lib/session-statut";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { SessionStatusType } from "@/types/type-tools";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
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

  const { userId } = useAuth();
  const company = LOCAL_STORAGE.get("company");

  console.log("company", company);

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
    const nextRoute = routeTo();
    if (sessionStatus && nextRoute.length !== 0) {
      router.push(nextRoute);
    }
    setIsLoading(false); // Met à jour après la redirection
  }, [sessionStatus, userId, company, router]); // Ajout des dépendances pour bien réagir aux changements

  if (isLoading) return <ScreenSpinner />;

  return <>{children}</>;
};
