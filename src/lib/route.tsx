export type AvailableRoute =
  | "home"
  | "aboutUs"
  | "features"
  | "services"
  | "pricing"
  |  "signIn"
  |  "signUp"
  |  "createCompany"
  |  "dashboard"

export const Route: Record<AvailableRoute, string> = {
  home: "/",
  aboutUs: "/about-us",
  features: "/features",
  services: "/services",
  pricing: "/pricing",
  signIn: "/sign-in",
  signUp: "/signup",
  dashboard: "/dashboard",
  createCompany: "/create-compay"
};
