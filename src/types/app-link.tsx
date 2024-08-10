export interface AppLink {
  label: React.ReactNode;
  baseUrl: string;
  type?: "external" | "internal";
  disabled?: boolean;
}

export interface footerLink {
  title: string;
  links: AppLink[];
}
