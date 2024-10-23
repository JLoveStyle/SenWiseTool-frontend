type ObjectValue<T> = T[keyof T];

const PRODUCTNAME = {
  BRONZE: "BRONZE",
  SILVER: "SILVER",
  GOLD: "GOLD",
} as const;

const PRODUCTSTATUS = {
  ON: "ON",
  OFF: "OFF",
  SUSPENDED: "SUSPENDED",
  EXPIRED: "EXPIRED",
} as const;

const PROJECTTYPE = {
  INTERNAL_INSPECTION: "INTERNAL_INSPECTION",
  INITIAL_INSPECTION: "INITIAL_INSPECTION",
  AUTO_EVALUATION: "AUTO_EVALUATION",
  TRAINING: "TRAINING",
  MAPPING: "MAPPING",
} as const;

const PROJECT_STATUS = {
  ACTIVE: "ACTIVE",
  DELETED: "DELETED",
  DRAFT: "DRAFT",
  ARCHIVED: "ARCHIVED",
  DEPLOYED: "DEPLOYED",
} as const;

const CAMPAIGNSTATUS = {
  OPEN: "OPEN",
  CLOSED: "CLOSED",
} as const;

export type ProductType = ObjectValue<typeof PRODUCTNAME>;
export type ProductStatus = ObjectValue<typeof PRODUCTSTATUS>;
export type ProjectsType = ObjectValue<typeof PROJECTTYPE>;
export type ProjectStatus = ObjectValue<typeof PROJECT_STATUS>;

export type PricePlanType = {
  active: boolean;
  billing_cycle: string;
  currency: string;
  description: string;
  id: string;
  number_of_billing_cycles: string;
  price: string;
  price_type: string;
  product_name: ProductType;
  plan_name: string;
  status: ProductStatus;
  auto_renewal: boolean;
  cancellation_policy: string[];
  created_at: Date;
  updated_at: Date;
};

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
  statusCode: number;
  timestamp: string;
  path: string;
  message: {
    message: string;
    error: string;
    statusCode: number;
  };
};

export type AssigneeType = {
  id?: string,
  agentCode: string,
  projectCode: string[],
  fullName?: string,
  company_id: string,
  created_at: string,
  updated_at: string,
  deleted_at: string
}

export interface FarmCoordinatesType {
  id?: string
}
export interface FarmType {
  id?: string
  location: JSON
  village: string
  plantation_creation_date: string
  farm_image_url: string
  surface_area: number;
  plantation_photos: string[]
  mapping_coordinates: FarmCoordinatesType[]
  created_at: string
  updated_at: string

}

export type FarmerType = {
  id?: string;
  company_id: string
  farmer_name: string
  farmer_contact: string
  farmer_ID_card_number: string
  inspection_date: string
  village: string
  certification_year: string
  inspector_name: string
  inspector_contact: string
  weed_application: string
  weed_application_quantity?: number
  pesticide_used: string
  pesticide_quantity: string
  farmer_photos?: string[]
  farm: FarmType[]
  created_at: string
  updated_at: string
}

export type ProjectType = {
  id?: string;
  type: ProjectsType;
  company_id: string;
  title: string;
  code: string;
  description: string;
  sector_activity: string;
  country: string;
  region: string;
  city: string;
  status: ProjectStatus;
  start_date: string;
  end_date: string;
  project_structure: JSON;
  archived: boolean;
  draft: boolean;
  campaign_id: string;
  archived_at: string;
  draft_at: string;
  created_at: string;
  deleted_at: string;
  slug: string;
  updated_at: string;
  deployed_at: string;
};

export type CompanyType = {
  id: string;
  name: string;
  status: "ACTIVE" | "INACTIVE" | "EXPIRED";
  slug: string;
  country: string;
  email: string;
  logo: string;
  payment_mode: string;
  company_paypal_email: string;
  paypal_id: string;
  sector_of_activity: string;
  website: string;
  address: string;
  phone_number: string;
  state: string;
  city: string;
  description: string;
  created_at: string;
  updated_at: string;
};

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
  role: "ADG" | "PDG" | "AUDITOR";
  status: "ACTIVE" | "INACTIVE" | "BANNED";
  updated_at: Date;
  username: string | null;
};

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
};

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
};

export type CampaignStatus = ObjectValue<typeof CAMPAIGNSTATUS>;

export type CampaignType = {
  created_at: Date;
  description: string;
  end_date: Date;
  id: string;
  name: string;
  start_date: Date;
  status: CampaignStatus;
  updated_at: Date;
};

export type OmitStrict<T, K extends keyof T> = Omit<T, K>;

export type TrainingTableDisplayType = Pick<
  TrainingType,
  "id" | "title" | "start_date" | "end_date" | "location"
>;

export interface RequirementType {
  title: string; // eg. Gestion
  numero: string; // eg. 1.1
  content: ChapterMetaDataType[];
}

export type ChapterMetaDataType = {
  number: string; // eg. 1.1.1
  principal_requirement: string;
  certication_de_group: {
    petit_exp_agri: string;
    grande_exp_agri: string;
    direction_de_group: string;
  };
};

// export type MarketCreateInput = {
//   id: string;
//   price_of_day: number;
//   start_date: string;
//   end_date: string;
//   market_number: number;
//   description: string;
//   location: string;
//   // type_of_market?: $Enums.MarketType
//   bordereau_vente_url: string;
//   bon_entree_magazin_url: string;
//   // status?: $Enums.CampaignStatus
//   code?: string | null;
//   product_quantity: number;
//   created_at?: Date | string;
//   updated_at?: Date | string;
//   campaign_id: string;
//   // company: CompanyCreateNestedOneWithoutMarketsInput
//   // market_audit?: Market_auditCreateNestedManyWithoutMarketInput
//   // transaction?: TransactionCreateNestedManyWithoutMarketInput
//   // receipts?: ReceiptCreateNestedManyWithoutMarketInput
// };

export type MarketDBProps = {
  id: string;
  location: string;
  price_of_day: number;
  start_date: Date | string;
  end_date: Date | string;
  description?: string;
  type_of_market?: "COCOA" | "COFFEE" | "BANANA" | "WOOD" | "OTHER";
  status?: "OPEN" | "CLOSED";
  code?: string | null;
  product_quantity: number;
  created_at?: Date | string;
  updated_at?: Date | string;
  campaign_id: string;
  company_id?: string;
  company: string;
  market_audit: []; // market_audit object[]: to be defined
  transaction: []; // transaction object[]: to be defined
  receipts?: []; // receipt object[]: to be defined
};
