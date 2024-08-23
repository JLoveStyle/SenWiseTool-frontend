export type objecType = { [key: string]: string };

export type SessionStatusType = "guest" | "authenticated";

export interface cardDataType {
  title: string;
  image: string;
  content: React.ReactNode;
}

export interface cardDataFeatureType {
  title: string;
  image: string;
  content: string[];
}

export interface chaptersType {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface cardDataPricingType {
  type: "Bronze" | "Gold" | "Silver";
  annualPricing: number;
  biannualPricing: number;
  chapters: number[] | "all";
  image: string;
  condition?: {
    description: string;
    badge: React.ReactNode;
  };
}
