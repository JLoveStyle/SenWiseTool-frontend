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
  createCompany: "/create-compay",
  profile: "/profile",
  login: "/login",
};
