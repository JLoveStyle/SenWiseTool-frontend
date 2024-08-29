export type PricePlanType = {

    active: boolean;
    billing_cycle: string;
    currency: string;
    description: string;
    id: string;
    number_of_billing_cycles: string;
    price: string;
    price_type: string;
    product_name: 'BRONZE' | 'SILVER' | 'GOLD';
    plan_name: string;
    status: 'ON' | 'OFF' | 'SUSPENDED' | 'EXPIRED';
    auto_renewal: boolean;
    cancellation_policy: string[];
    created_at: Date;
    updated_at: Date;
}

export type PlanResultType = {
    status: number;
    data: PricePlanType[] | PricePlanType;
    message: string;
}