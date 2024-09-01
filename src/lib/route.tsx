export type AvailableRoute =
  | "home"
  | "aboutUs"
  | "features"
  | "services"
  | "pricing"
  | "checkout"
  | "signIn"
  | "signUp"
  | "createCompany"
  | "dashboard"
  | "formationProject"
  | "formationProjectDetails"
  | "profile"
  | "login";

export const Route: Record<AvailableRoute, string> = {
  home: "/",
  aboutUs: "/about-us",
  features: "/features",
  services: "/services",
  pricing: "/pricing",
  signIn: "/sign-in",
  signUp: "/sign-up",
  dashboard: "/dashboard",
  formationProject: "/dashboard/trainings",
  formationProjectDetails: "/dashboard/training/project",
  createCompany: "/create-compay",
  profile: "/profile",
  login: "/login",
  checkout: "/checkout",
};
