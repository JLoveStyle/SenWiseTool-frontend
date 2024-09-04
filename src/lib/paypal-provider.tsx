import * as React from 'react';
import { ApiDataResponse } from '../types/api-types';

export interface IAppProps<Q> {
    query: string;
    fn: () => Promise<Q>;
}

export function useApiFetch<T, TBase extends Partial<ApiDataResponse<T>>>({ query, fn }: IAppProps<TBase>) {

    const [data, setData] = React.useState<T | undefined | null>(undefined);
    // TODO: add the bearer in the request for authentication

    // TODO: handle the case the plan is not found
    let valueTofetch: string = plan_name;
    const fetchPricePlan = async () => {
        setIsLoading(true);
        const data = await fetch(`${API_URL}/v1/price_plans/${valueTofetch}`)

        if (!data.ok) {
            setIsLoading(false);
            return;
        }
        const pricePlanData = await data.json();

        setPricePlan(pricePlanData.data);
        setIsLoading(false);
        valueTofetch = "";
    }

    React.useEffect(() => {
        fn()
            .then((response) => {
                if (response.status === 200)
                    setData(response.data);
                else setData(null);
            })
            .catch((error) => {
                setError(error);
                console.error(` Error: ${error}`);
            }).finally(() => {
                setIsLoading(false);
            });
    }, [query]);

    return {
        data,
        // error,
        // isLoading
    }
}
