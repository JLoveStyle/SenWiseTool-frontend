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
  | "dashboard"
  | "training"
  | "profile"
  | "training_session"
  | "user"
  | "login";

export const Route: Record<AvailableRoute, string> = {
  home: "/",
  aboutUs: "/about-us",
  features: "/features",
  services: "/services",
  signIn: "/sign-in",
  signUp: "/sign-up",
  dashboard: "/dashboard",
  companies: "companies",
  profile: "/profile",
  login: "/login",
  checkout: "/checkout",
  pricing: "price_plans",
  training: "trainings",
  training_session: "training_sessions",
  user: "users",
};
