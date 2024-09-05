import * as React from 'react';
import { ApiDataResponse } from '../types/api-types';

export interface IAppProps<Q> {
    query: string;
    fn: () => Promise<Q>;
}

export function useApiFetch<T, TBase extends Partial<ApiDataResponse<T>>>({ query, fn }: IAppProps<TBase>) {

    const [data, setData] = React.useState<T | undefined | null>(undefined);
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

    // TODO: add the bearer in the request for authentication
    // to disable the paypal button.


    console.log("hit the provider : ", query)

    React.useEffect(() => {
        fn()
            .then((response) => {
                if (response?.status === 200)
                    setData(response.data);
                else setData(null);
            })
            .catch((error) => {
                setError(error);
                console.error(` Error: ${error}`);
            }).finally(() => {
                setIsLoading(false);
            });
    }, [query, fn]);

    return {
        data,
        // error,
        // isLoading
    }
}
