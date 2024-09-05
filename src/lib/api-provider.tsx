import React, { useEffect } from 'react';
import { ApiDataResponse, CompanyType, PricePlanType, UserType } from '../types/api-types';
import { IUser, useUsertore } from './stores/user-stores';
import { useCompanyStore } from './stores/companie-store';
import { usePriceStore } from './stores/price-store';

export interface IAppProps<Q> {
    query: string;
    fn: () => Promise<Q>;
    route?: string;
}

export function useApiFetch<T, TBase extends Partial<ApiDataResponse<T>>>({ query, fn, route }: IAppProps<TBase>) {

    const [data, setData] = React.useState<T | undefined | null>(undefined);
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const setCurrentUser = useUsertore((state: IUser) => state.setUser);
    const setCompany = useCompanyStore((state) => state.setCompany);
    const setPricePlan = usePriceStore((state) => state.setPricePlan);
    // TODO: add the bearer in the request for authentication
    // to disable the paypal button.


    // const fetchData = () => {
    //     console.log("hit the provider : ", query);
    //     fn()
    //         .then((response) => {
    //             // console.log("api provider", response)
    //             // if (response?.status === 200)
    //             //     setData(response.data);
    //             // else setData(null);
    //             console.log("api provider", response)
    //         })
    //         .catch((error) => {
    //             setError(error);
    //         }).finally(() => {
    //             setIsLoading(false);
    //         });
    // }

    useEffect(() => {
        // fetchData();
        fn()
            .then((response) => {
                if (response?.status === 200)
                    setData(response.data);
                else setData(null);
            })
            .catch((error) => {
                setError(error);
            }).finally(() => {
                setIsLoading(false);
            });
    }, [query, route]);

    // const refetch = () => fetchData();

    // TODO: this could be refactor later.
    if (data) {
        if (route?.includes("users")) {

            setCurrentUser(data as unknown as UserType);
        } else
            if (route?.includes("companies")) {

                setCompany(data as unknown as CompanyType);
            } else
                if (route?.includes("price_plans")) {

                    setPricePlan(data as unknown as PricePlanType);
                }
    }

    return {
        data,
        // error,
        // isLoading
        // refetch
    }
}
