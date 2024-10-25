export type AvailableRoute =
  | "home"
  | "aboutUs"
  | "features"
  | "services"
  | "pricing"
  | "checkout"
  | "signIn"
  | "signUp"
  | "companies"
  | "createCompany"
  | "dashboard"
  | "training"
  | "trainingProject"
  | "login"
  | "inspectionInterne"
  | "inspectionInitial"
  | "autoEvaluation"
  | "editProject"
  | "details"
  | "training_session"
  | "user"
  | "login"
  | "projects"
  | "campaign"
  | "trainingProject"
  | "mapping"
  | "saleSlip"
  | "social"
  | "enviroment"
  | "agriculture"
  | "agents"
  | "marketRequest"
  | "assigne"

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
  details: "/dashboard/details",
  training_session: "training_sessions",
  createCompany: "create-compay",
  mapping: "/dashboard/mapping",
  social: "/dashboard/social",
  enviroment: "/dashboard/enviroment",
  agriculture: "/dashboard/agriculture",
  agents: "/dashboard/agents",

  // Api routes
  companies: "companies",
  projects: "projects",
  campaign: "campaigns",
  user: "users",
  training: "trainings",
  pricing: "price_plans",
  marketRequest: "markets",
  assigne: "project_assignee",

  // tracability
  markets: "/dashboard/tracability/markets",
  receipt: "/dashboard/tracability/receipt",
  saleSlip: "/dashboard/tracability/sale-slip",
  factoryAccompaniementSheet:
    "/dashboard/tracability/factory-accompaniement-sheet",
  transmissionAndDeclarationSheet:
    "/dashboard/tracability/transmission-and-declaration-sheet",
};
