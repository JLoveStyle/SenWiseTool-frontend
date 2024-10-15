"use server";
import { Route } from "@/lib/route";
import { ApiDataResponse, MarketCreateInput } from "@/types/api-types";
import { DBMarketProps } from "@/types/tracability/market";
import {
  mutateApiData,
  mutateDelApiData,
  mutateUpApiData,
} from "@/utiles/services/mutations";
import ApiCall from "../httpClients";
import { fetchApiData } from "../queries";
// import { LOCAL_STORAGE } from "./storage";

export const db_create_market = async (data: DBMarketProps) => {
  return mutateApiData(Route.markets, data)
    .then((response) => {
      if (response.status === 201)
        return {
          message: "Market created successfully ",
          response: response.data,
          status: "success",
        };
      else
        return {
          message: "Creating market failed",
          code: (response?.status as number) || 500,
          status: "error",
        };
    })
    .catch((error) => {
      return { response: error, status: "error" };
    });
};

export const db_update_market = async (data: DBMarketProps, id: string) => {
  return mutateUpApiData<ApiDataResponse<MarketCreateInput>>(
    Route.markets,
    data,
    id
  )
    .then((response) => {
      if (typeof response != "undefined" && response?.status === 204)
        return {
          message: "Market updated successfully ",
          response: response.data,
          status: "success",
        };
      else
        return {
          message: "Creating market failed",
          code: (response?.status as number) || 500,
          status: "error",
        };
    })
    .catch((error) => {
      return { response: error, status: "error" };
    });
};

export const db_get_markets = async (companyId?: string) => {
  const db = new ApiCall();

  return await fetchApiData<
    ApiDataResponse<MarketCreateInput[] | MarketCreateInput>
  >(Route.markets, companyId)
    .then((response) => {
      if (typeof response != "undefined") {
        return response.data;
      }
    })
    .catch((error) => {
      console.error("Erreur lors de l'envoi des données :", error);
      if (!companyId) return [] as MarketCreateInput[];
      return null;
    });
};

export const db_delete_market = async (id: string) => {
  return mutateDelApiData<ApiDataResponse<MarketCreateInput>>(Route.markets, id)
    .then((response) => {
      if (typeof response != "undefined" && response?.status === 204)
        return { data: response.message };
      return {
        error: {
          message: "Deleting market failed",
          code: (response?.status as number) || 500,
        },
      };
    })
    .catch((error) => {
      return {
        error: {
          message: (error as Error).message || "Erreur inconnue",
          code: (error as any).code || 500,
        },
      };
    });
};
