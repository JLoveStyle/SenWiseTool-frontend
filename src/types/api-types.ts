export type ObjectValue<T> = T[keyof T];

const PRICEPLAN = {
    BRONZE: "BRONZE",
    SILVER: "SILVER",
    GOLD: "GOLD",
} as const;

const PRICEPLANSTATUS = {
    ON: "ON",
    OFF: "OFF",
    SUSPENDED: "SUSPENDED",
    EXPIRED: "EXPIRED",
} as const;

type PricePlanName = ObjectValue<typeof PRICEPLAN>
type PricePlanStatus = ObjectValue<typeof PRICEPLANSTATUS>

export type PricePlanType = {

    active: boolean;
    billing_cycle: string;
    currency: string;
    description: string;
    id: string;
    number_of_billing_cycles: string;
    price: string;
    price_type: string;
    product_name: PricePlanName
    plan_name: string;
    status: PricePlanStatus
    auto_renewal: boolean;
    cancellation_policy: string[];
    created_at: Date;
    updated_at: Date;
}

export interface ApiDataResponse<T> {
    status: number;
    data: T;
    message: string;
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
}

type ApiErroType = {
    statusCode: number,
    timestamp: string,
    path: string,
    message: {
        message: string,
        error: string,
        statusCode: number
    }
}

export type ProjectType = {
    id?: string;
    type: "INITIAL_INSPECTION" | "EXTERNAL_INSPECTION" | "AUTO_EVALUATION" | "MAPPING";
    company_id: string;
    title: string;
    description: string;
    sector_activity: string;
    country: string;
    status: "ACTIVE" | "DELETED" | "ARCHIVED" | "DRAFT";
    start_date: string;
    end_date: string;
    project_structure: JSON;
    archived: boolean;
    draft: boolean;

    archived_at: string;
    draft_at: string;
    created_at: string;
    deleted_at: string;
    slug: string;
    updated_at: string;
}

export type CompanyType = {
    id: string,
    name: string,
    status: "ACTIVE" | "INACTIVE" | "EXPIRED",
    slug: string,
    country: string,
    email: string,
    logo: string,
    payment_mode: string,
    company_paypal_email: string,
    paypal_id: string,
    sector_of_activity: string,
    website: string,
    address: string,
    phone_number: string,
    state: string,
    city: string,
    description: string,
    created_at: string,
    updated_at: string
}

export type UserType = {
    id: string;
    name: string;
    email: string;
    password: string;
    companyId?: string;
    company_id: string;
    created_at: Date;
    famer_attached_contract_url: string | null;
    first_name: string;
    last_name: string | null;
    phone_number: string | null;
    profileUrls: string | null;
    role: "ADG" | "PDG" | "AUDITOR"
    status: "ACTIVE" | "INACTIVE" | "BANNED";
    updated_at: Date;
    username: string | null;
}

export type TrainingType = {
    company_id: string;
    created_at: string;
    end_date: string;
    slug: string;
    id: string;
    location: string;
    modules: string[];
    report_url: string;
    start_date: string;
    title: string;
    trainer_proof_of_competency: string[];
    training_attendance_sheet_url: string[];
    training_picture_url: string[];
    updated_at: string;
}

export type Training_session = {
    created_at: string;
    email: string;
    first_name: string;
    id: string;
    last_name: string;
    phone: string;
    role: string;
    signature: string;
    training_id: string;
    updated_at: Date;
}

export const CampaignStatus = {
    OPEN: "OPEN",
    CLOSED: "CLOSED"
} as const;


export type CampaignStatusType = ObjectValue<typeof CampaignStatus>;

export type Campaign = {
    created_at: Date;
    description: string;
    end_date: Date;
    id: string;
    name: string;
    start_date: Date;
    status: CampaignStatusType;
    updated_at: Date;
}