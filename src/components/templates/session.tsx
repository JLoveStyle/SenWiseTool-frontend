"use client";

import { useApiOps } from "@/lib/api-provider";
import { Route } from "@/lib/route";
import {
  AUTHENTICATED,
  COMPANY_DISABLED,
  GUEST,
  HAS_COMPANY,
  NOT_HAS_COMPANY,
} from "@/lib/session-statut";
import { ApiDataResponse, CompanyType, UserType } from "@/types/api-types";
import { SessionStatusType } from "@/types/type-tools";
import { fetchApiData } from "@/utiles/services/queries";
import { useRouter } from "next/navigation";
import React from "react";
import { ScreenSpinner } from "../atoms/spinner/screen-spinner";

interface Props {
  children: React.ReactNode;
  sessionStatus?: SessionStatusType;
}

export const Session = ({ children, sessionStatus }: Props) => {
  const router = useRouter();
  const {
    refetch,
    isLoading: authUserIsLoading,
    data: authUser,
  } = useApiOps<UserType, ApiDataResponse<UserType>>({
    fn: () => fetchApiData(Route.user, "current"),
    route: Route.user,
  });

  // FETCH COMPANY
  const { isLoading: loadingCompany, data: company } = useApiOps<
    CompanyType,
    ApiDataResponse<CompanyType>
  >({
    fn: () => fetchApiData(Route.companies, "current"),
    route: Route.companies,
  });

  if (sessionStatus === GUEST && !authUserIsLoading) {
    if (!authUser) {
      return <>{children}</>;
    } else {
      console.log("authUser ::::", authUser);

      router.push(Route.dashboard);
    }
  }

  if (sessionStatus === AUTHENTICATED && !authUserIsLoading) {
    if (authUser) {
      return <>{children}</>;
    } else {
      router.push(Route.signIn);
    }
  }

  if (sessionStatus === HAS_COMPANY && !loadingCompany) {
    if (company) {
      return <>{children}</>;
    } else {
      router.push(Route.createCompany);
    }
  }

  if (sessionStatus === HAS_COMPANY && !loadingCompany) {
    if (company) {
      return <>{children}</>;
    } else {
      router.push(Route.createCompany);
    }
  }

  if (sessionStatus === NOT_HAS_COMPANY && !loadingCompany) {
    if (!company) {
      return <>{children}</>;
    } else {
      router.push(Route.dashboard);
    }
  }

  if (
    sessionStatus === COMPANY_DISABLED &&
    !authUserIsLoading &&
    !loadingCompany
  ) {
    if (authUser) {
      if (company) {
        if (company.status == "INACTIVE") {
          return <>{children}</>;
        }
      } else {
        router.push(Route.createCompany);
      }
      router.push(Route.dashboard);
    } else {
      router.push(Route.signIn);
    }
  }

  if (!sessionStatus && !authUserIsLoading) {
    return <>{children}</>;
  }

  return <ScreenSpinner />;
};
