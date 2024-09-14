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
  | "formationProject"
  | "formationProjectDetails"
  | "profile"
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

export const Route: Record<AvailableRoute, string> = {
  home: "/",
  aboutUs: "/about-us",
  features: "/features",
  services: "/services",
  signIn: "/sign-in",
  signUp: "/sign-up",
  dashboard: "/dashboard",
  formationProject: "/dashboard/training",
  formationProjectDetails: "/dashboard/training/project",
  profile: "/profile",
  login: "/login",
  inspectionInterne: "/projects/inspection-interne",
  inspectionInitial: "/projects/inspection-initial",
  autoEvaluation: "/projects/auto-evaluation",
  editProject: "/projects/edit",
  checkout: "/checkout",
  details: "/projects/details",
  pricing: "price_plans",
  training: "trainings",
  training_session: "training_sessions",
  user: "users",
  companies: "v1/companies",
  projects: "v1/projects",
  createCompany: "/create-compay",
};
