import React, { useEffect, useState } from 'react';
import { ApiDataResponse, CampaignType, CompanyType, PricePlanType, UserType } from '../types/api-types';
import { IUser, useUserstore } from './stores/user-stores';
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
    const setCurrentUser = useUserstore((state: IUser) => state.setUser);
    const setCompany = useCompanyStore((state) => state.setCompany);
    const setPricePlan = usePriceStore((state) => state.setPricePlan);
    const setCampaigns = useCampaignStore((state) => state.setCampaigns);

    // this function is a global api call fetch for fetching the resouce located at the route specified.
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
        fetchData();
    }, [query, route]);

    const refetch = () => fetchData();

    if (data) {
        if (route?.includes("users")) {
            setCurrentUser(data as unknown as UserType);
            // console.log('users from store', data)
        }
        if (route?.includes("companies")) {
            setCompany(data as unknown as CompanyType);
            console.log('company from store', data)
        }
        if (route?.includes("price_plans")) {
            setPricePlan(data as unknown as PricePlanType);
            // console.log('price plan from store', data)
        }
        if (route?.includes("campaigns")) {
            setCampaigns(data as unknown as CampaignType[]);
            // console.log('campains from store', data)
        }
    }
    // console.log("fro provider service: ", data)
    return {
        data,
        // error,
        // isLoading
        refetch
    }
}
