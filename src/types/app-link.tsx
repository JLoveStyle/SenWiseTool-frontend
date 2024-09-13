export interface AppLink {
  label: React.ReactNode;
  baseUrl: string;
  type?: "external" | "internal";
  disabled?: boolean;
  icon?: React.ElementType;
}

export interface footerLink {
  title: string;
  links: AppLink[];
}

export interface DashboardSidebarOption {
  option: AppLink;
  details?: AppLink[];
}
