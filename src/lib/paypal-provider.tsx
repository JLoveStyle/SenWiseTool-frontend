import * as React from 'react';
import { API_URL } from "../utiles/services/constants";
import { PlanResultType } from '../types/api-types';

export interface IAppProps {
    plan_name: string
}

export function usePricePlan({ plan_name }: IAppProps) {

    const [pricePlan, setPricePlan] = React.useState<PlanResultType['data'] | null>(null);
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    // TODO: add the bearer in the request for authentication
    // to disable the paypal button.

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
        fetchPricePlan()
    }, [plan_name]);

    return {
        pricePlan,
        error,
        isLoading
    }
}
