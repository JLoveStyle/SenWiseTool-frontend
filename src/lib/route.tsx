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

  // tracability
  | "receipt";

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
  pricing: "price_plans",
  training: "trainings",
  training_session: "training_sessions",
  user: "users",
  companies: "companies",
  projects: "projects",
  createCompany: "create-compay",
  campaign: 'campaigns',
  mapping: "/dashboard/mapping",
  social: "/dashboard/social",
  enviroment: "/dashboard/enviroment",
  agriculture: "/dashboard/agriculture",

  // tracability
  receipt: "/dashboard/tracability/receipt",
  saleSlip: "/dashboard/tracability/sale-slip",
};
