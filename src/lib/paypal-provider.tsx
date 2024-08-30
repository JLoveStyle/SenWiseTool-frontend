import * as React from 'react';
import { PricePlanType } from '../types/api-types';
import { fetchPricePlan } from "../utiles/services/queries";

export interface IAppProps {
    plan_name: string
}

export function usePricePlan({ plan_name }: IAppProps) {

    const [pricePlan, setPricePlan] = React.useState<PricePlanType | null>(null);
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    // TODO: add the bearer in the request for authentication
    // to disable the paypal button.

    // TODO: handle the case the plan is not found

    React.useEffect(() => {
        fetchPricePlan(plan_name)
            .then((response) => {
                if (response.status === 200)
                    setPricePlan(response.data);
                else setPricePlan(null);
            })
            .catch((error) => {
                setError(error);
                console.error(` Error: ${error}`);
            }).finally(() => {
                setIsLoading(false);
            });
    }, [plan_name]);

    return {
        pricePlan,
        // error,
        // isLoading
    }
}
