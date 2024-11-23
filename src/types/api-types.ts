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

export interface MappingProjectData {
  collector_name: string,
  village: string
  location: string
  plantation_photos: string[]
  farmer_photos: string[]
  date: string
  farmer_status: string
  farmer_name: string
  farmer_contact: string
  farmer_ID_card_number: string
  plantation_creation_date: string
  estimated_area: string
  coordinates: {
    longitude: number,
    latitude: number
  }[]
}
export interface MappingDataType {
  id: string
  collected_at: string
  project_id: string
  updated_at: string
  project_data: {
    project_id: string
    project_data: MappingProjectData
  }
}
export interface Answer {
  num: string;
  NC: boolean;
  NA: boolean;
  C: boolean;
  comment: boolean;
}
export interface AnalysisProps {
  chap1: Answer[];
  chap2: Answer[];
  chap3: Answer[];
  chap4: Answer[];
  chap5: Answer[];
  chap6: Answer[];
}

export interface InspectionDataType {
  total_A: number;
  chapter1: { C: number; NC: number; NA: number, TA: number };
  chapter2: { C: number; NC: number; NA: number, TA: number };
  chapter3: { C: number; NC: number; NA: number, TA: number };
  chapter4: { C: number; NC: number; NA: number, TA: number };
  chapter5: { C: number; NC: number; NA: number, TA: number };
  chapter6: { C: number; NC: number; NA: number, TA: number };
}

export interface InspectionFieldDatatype {
  metaData: {
    certification_year?: string,
    farmer_ID_card_number?: string,
    farmer_contact?: string,
    farmer_name?: string,
    farmer_photos?: string[],
    inspection_date?: string,
    inspector_contact?: string,
    inspector_name?: string,
    pesticide_quantity?: string,
    pesticide_used?: string,
    village?: string,
    weed_application?: string,
    weed_application_quantity?: string
  },
  requirements: {
    comment: string,
    status: string,
    req_number: string
  }[]
}
export interface ProjectData {
  company_id: string,
  project_id: string,
  project_data: InspectionFieldDatatype
}
export interface InspectionDataPops {
  collected_at: string,
  id: string,
  updated_at: string,
  project_id: string,
  project_data: ProjectData
}

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
  id?: string;
  agentCode: string;
  projectCode: string[];
  fullName?: string;
  company_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
};

export interface FarmCoordinatesType {
  id?: string;
}
export interface FarmType {
  id?: string;
  location: JSON;
  village: string;
  plantation_creation_date: string;
  farm_image_url: string;
  surface_area: number;
  plantation_photos: string[];
  mapping_coordinates: FarmCoordinatesType[];
  created_at: string;
  updated_at: string;
}

export type FarmerType = {
  id?: string;
  company_id: string;
  farmer_name: string;
  farmer_contact: string;
  farmer_ID_card_number: string;
  inspection_date: string;
  village: string;
  certification_year: string;
  inspector_name: string;
  inspector_contact: string;
  weed_application: string;
  weed_application_quantity?: number;
  pesticide_used: string;
  pesticide_quantity: string;
  farmer_photos?: string[];
  farm: FarmType[];
  created_at: string;
  updated_at: string;
};

export type ProjectType = {
  id?: string;
  type: ProjectsType;
  company_id: string;
  title: string;
  code: string;
  another_logo: string;
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
  status: string;
  code: string;
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
  "id" | "title" | "start_date" | "end_date" | "location" | "code" | "created_at"
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

export type BordereauxVenteType = {
  id: string
  code: string
  campagne_id: string
  sale_slip_title: string
  sale_slip_description: string
  sale_slip_url: string
}

export type MarketDBProps = {
  id: string;
  location: string;
  price_of_theday: number;
  supplier: string;
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
  transaction: {
    id: string,
    market_id: string,
    date: string,
    level_of_traceability: string,
    driver_name: string,
    quantity: string,
    humidity: string,
    net_weight_declared_in_Ton: string,
    humidity_level_of_product: string,
    total_quantity_in_bags: number,
    receiver_name: string,
    sender_signature: string[],
    driver_signature: string[],
    product_quantity: string,
    vehicule_immatriculation_number: string,
    min_con_verif_agent_name_and_sig: string,
    created_at: string,
    updated_at: string
  }[]
  receipts?: []; // receipt object[]: to be defined
  sale_slip: string | null;

  // factory accompaiement sheet
  tracability_level: string | null;
  car_number: string | null;
  quantity_in_bags_declared: number | null;
  net_weight_declared: number | null;
  humidity: number | null;

  // factory accompaiement sheet
  sender: string | null;
  Receiver: string | null;
  register_number: string | null;
  driver_name: string | null;
  quantity_in_bags_tone: number | null;
  quantity_product: number | null;

  store_entry_voucher: string | null;
};
