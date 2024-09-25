"use client";

import { useApiOps } from "@/lib/api-provider";
import { Route } from "@/lib/route";
import { AUTHENTICATED, GUEST } from "@/lib/session-statut";
import { ApiDataResponse, UserType } from "@/types/api-types";
import { SessionStatusType } from "@/types/type-tools";
import { fetchApiData } from "@/utiles/services/queries";
import { useRouter } from "next/navigation";
import { ScreenSpinner } from "../atoms/spinner/screen-spinner";

interface Props {
  children: React.ReactNode;
  sessionStatus?: SessionStatusType;
}

export const Session = ({ children, sessionStatus }: Props) => {
  const router = useRouter();
  // const {authUserIsLoading, setAuthUserIsLoading} = useState<boolean>()

  const {
    refetch,
    isLoading: authUserIsLoading,
    data: authUser,
  } = useApiOps<UserType, ApiDataResponse<UserType>>({
    fn: () => fetchApiData(Route.user, "current"),
    route: Route.user,
  });

  if (sessionStatus === GUEST && !authUserIsLoading) {
    if (!authUser) {
      return <>{children}</>;
    } else {
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

  if (!sessionStatus && !authUserIsLoading) {
    return <>{children}</>;
  }

  return <ScreenSpinner />;
};
