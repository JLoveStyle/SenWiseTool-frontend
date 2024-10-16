"use server";
import { Route } from "@/lib/route";
import { ApiDataResponse, MarketDBProps } from "@/types/api-types";
import {
  mutateApiData,
  mutateDelApiData,
  mutateUpApiData,
} from "@/utiles/services/mutations";
import ApiCall from "../httpClients";
import { fetchApiData } from "../queries";
// import { LOCAL_STORAGE } from "./storage";

export const db_create_market = async (data: Partial<MarketDBProps>) => {
  console.log('marketdata =>', data )
  console.log(Route.marketRequest)
  return mutateApiData(Route.marketRequest, data)
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

export const db_update_market = async (data: MarketDBProps, id: string) => {
  return mutateUpApiData<ApiDataResponse<MarketDBProps>>(
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
    ApiDataResponse<MarketDBProps[] | MarketDBProps>
  >(Route.markets, companyId)
    .then((response) => {
      if (typeof response != "undefined") {
        return response.data;
      }
    })
    .catch((error) => {
      console.error("Erreur lors de l'envoi des données :", error);
      if (!companyId) return [] as MarketDBProps[];
      return null;
    });
};

export const db_delete_market = async (id: string) => {
  return mutateDelApiData<ApiDataResponse<MarketDBProps>>(Route.markets, id)
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
