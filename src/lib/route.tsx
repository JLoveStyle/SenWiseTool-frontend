export type AvailableRoute =
  | "home"
  | "aboutUs"
  | "features"
  | "services"
  | "checkout"
  | "signIn"
  | "signUp"
  | "createCompany"
  | "dashboard"
  | "listOfFarmers"
  | "managementPlan"
  | "map"
  | "reclamationMecanism"
  | "riskEvaluation"
  | "organigram"
  | "trainingProject"
  | "login"
  | "inspectionInterne"
  | "inspectionInitial"
  | "autoEvaluation"
  | "editProject"
  | "details"
  | "training_session"
  | "login"
  | "campaign"
  | "mapping"
  | "saleSlip"
  | "social"
  | "environment"
  | "agriculture"
  | "incomeAndSharedResponsabilityProofOfPaiement"
  | "incomeAndSharedResponsabilityManagementPlan"
  | "incomeAndSharedResponsabilityDifferential"

  // API endpoints
  | "agents"
  | "marketRequest"
  | "assigne"
  | "projects"
  | "companies"
  | "user"
  | "training"
  | "pricing"
  | "socialRequest"
  | "agricultureRequest"
  | "environmentRequest"
  | "inspectionData"
  | "famerRequest"
  | "revenuEtResponsabilite"

  // tracability
  | "markets"
  | "receipt"
  | "factoryAccompaniementSheet"
  | "transmissionAndDeclarationSheet";

export const Route: Record<AvailableRoute, string> = {
  home: "/",
  aboutUs: "/about-us",
  features: "/features",
  services: "/services",
  signIn: "/sign-in",
  signUp: "/sign-up",
  dashboard: "/dashboard",
  trainingProject: "/dashboard/training",
  login: "/login",
  inspectionInterne: "/dashboard/inspection-interne",
  inspectionInitial: "/dashboard/inspection-initial",
  autoEvaluation: "/dashboard/auto-evaluation",
  editProject: "/dashboard/edit",
  checkout: "/checkout",
  map: "/dashboard/map",
  reclamationMecanism: "/dashboard/reclamation-mecanism",
  riskEvaluation: "/dashboard/risk-evaluation",
  organigram: "/dashboard/organigram",
  managementPlan: "/dashboard/management-plan",
  details: "/dashboard/details",
  training_session: "training_sessions",
  createCompany: "/create-company",
  mapping: "/dashboard/mapping",
  social: "/dashboard/social",
  environment: "/dashboard/environment",
  agriculture: "/dashboard/agriculture",
  agents: "/dashboard/agents",
  listOfFarmers: "/dashboard/farmers",

  // Api routes
  companies: "companies",
  projects: "projects",
  campaign: "campaigns",
  user: "users",
  training: "trainings",
  pricing: "price_plans",
  marketRequest: "markets",
  assigne: "project_assignee",
  socialRequest: "socials",
  environmentRequest: "environments",
  agricultureRequest: "agricultures",
  inspectionData: "inspection_data",
  famerRequest: "farmers",
  revenuEtResponsabilite: "revenu-et-responsabilite-partager",

  // tracability
  markets: "/dashboard/tracability/markets",
  receipt: "/dashboard/tracability/receipt",
  saleSlip: "/dashboard/tracability/sale-slip",
  factoryAccompaniementSheet:
    "/dashboard/tracability/factory-accompaniement-sheet",
  transmissionAndDeclarationSheet:
    "/dashboard/tracability/transmission-and-declaration-sheet",
  incomeAndSharedResponsabilityProofOfPaiement:
    "/dashboard/income-and-shared-responsability/proof-of-payment",
  incomeAndSharedResponsabilityManagementPlan:
    "/dashboard/income-and-shared-responsability/management-plan",
  incomeAndSharedResponsabilityDifferential:
    "/dashboard/income-and-shared-responsability/differential",
};
