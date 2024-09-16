import React, { useEffect, useState } from 'react';
import { ApiDataResponse, CampaignType, CompanyType, PricePlanType, UserType } from '../types/api-types';
import { IUser, useUsertore } from './stores/user-stores';
import { useCompanyStore } from './stores/companie-store';
import { usePriceStore } from './stores/price-store';
import { useCampaignStore } from './stores/campaign-store';

export interface IAppProps<Q> {
    query?: string;
    fn: () => Promise<Q>;
    route?: string;
}

export function useApiOps<T, TBase extends Partial<ApiDataResponse<T>>>({ query, fn, route }: IAppProps<TBase>) {

    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const setCurrentUser = useUsertore((state: IUser) => state.setUser);
    const setCompany = useCompanyStore((state) => state.setCompany);
    const setPricePlan = usePriceStore((state) => state.setPricePlan);
    const setCampaigns = useCampaignStore((state) => state.setCampaigns);



    /** TODO : REFACTOR THIS HOOK LATER */

    const fetchData = () => {

        fn()
            .then((response) => {
                if (response?.status?.toString().startsWith("2"))
                    setData(response.data as unknown as T);
                else setData(null);
            })
            .catch((error) => {
                setError(error);
            }).finally(() => {
                setIsLoading(false);
            });
    };

    useEffect(() => {
        console.log("from api provider route: ", route)
        fetchData();
    }, [query, route]);

    const refetch = () => fetchData();

    // TODO: this could be well refactor later.
    if (data) {
        if (route?.includes("users")) {

            setCurrentUser(data as unknown as UserType);
        }
        if (route?.includes("companies")) {
            console.log("company state set: ", data as unknown as CompanyType)
            setCompany(data as unknown as CompanyType);
        }
        if (route?.includes("price_plans")) {

            setPricePlan(data as unknown as PricePlanType);
        }
        if (route?.includes("campaigns")) {
            console.log("campaigns all set: ", data as unknown as CampaignType)
            setCampaigns(data as unknown as CampaignType[]);
        }
    }
    console.log("fro provider service: ", data)
    return {
        data,
        // error,
        // isLoading
        refetch
    }
}
/**
 * useApiOps is a custom hook that is a wrapper around the native React.useState and React.useEffect hooks.
 * It provides a way to fetch data from an API and store it in the state of the component.
 * It also provides a way to refetch the data when the component is rerendered.
 *
 * The hook takes in 3 parameters:
 * - query: The query string to fetch the data from the API.
 * - fn: The function that makes the API request.
 * - route: The route of the API request.
 *
 * The hook returns an object with 3 properties:
 * - data: The data fetched from the API.
 * - error: The error message if the API request fails.
 * - isLoading: A boolean that indicates if the API request is in progress.
 * - refetch: A function that can be used to refetch the data.
 *
 * The hook uses the React.useEffect hook to fetch the data when the component is mounted.
 * It uses the React.useState hook to store the data in the state of the component.
 * It also uses the React.useState hook to store the error message and the isLoading boolean.
 * The hook uses the React.useCallback hook to memoize the refetch function.
 *
 * The hook is generic and can be used with any type of API request.
 *
 * @param {{ query: string; fn: () => Promise<T>; route?: string }} props
 * @returns {{ data: T | undefined | null; error: Error | null; isLoading: boolean; refetch: () => void }}
 */
