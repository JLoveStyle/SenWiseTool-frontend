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
  | "profile"
  | "login"
  | "inspectionInterne"
  | "editProject"

export const Route: Record<AvailableRoute, string> = {
  home: "/",
  aboutUs: "/about-us",
  features: "/features",
  services: "/services",
  pricing: "/pricing",
  signIn: "/sign-in",
  signUp: "/sign-up",
  dashboard: "/dashboard",
  createCompany: "/create-compay",
  profile: "/profile",
  login: "/login",
  inspectionInterne: "/projects/inspection-interne",
  editProject: "/projects/edit",
  checkout: "/checkout",
};
