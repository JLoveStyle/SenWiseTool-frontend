import { ElementType } from "react";

export interface FormData {
  companyName: string;
  companyEmail: string;
  headOfficeEmail: string;
  hasAgree: boolean;
  country: string;
  state: string;
  city: string;
  businessActivity: string;
  otherBusiness: string;
  logo: string;
  phone: string;
  description: string;
  address: string;
}

export interface User {
  id?: string;
  username?: string;
  title: ["ADG" | "MEMBER"];
  company_id?: string;
  status?: ["active" | "inactive" | "banned"];
  activity?: ["FARMER" | "EMPLOYEE" | "AUDITOR" | "TRAINER" | "AGENT"];
  famer_attached_contract_url?: string;
  profileUrls?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
  companyId?: string;
  phone_number?: string;
  civility?: string;
}

export interface Company {
  id?: string;
  slug?: string;
  address?: string;
  description?: string;
  website?: string;
  phone_number?: string;
  companyName: string;
  companyEmail: string;
  country: string;
  state: string;
  city: string;
  sector_of_activity: string;
  logo?: string;
  paypal_id?: string;
  payment_mode?: string;
}

export interface ModuleProps {
  id: number;
  value: string;
}

export interface TrainingProps {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  location: string;
  modules: ModuleProps[];
}

export interface LocalTrainingProps {
  id: string;
  title: string;
  start_date: string;
  end_date: string;
  location: string;
  modules: string[];
  status?: "ACTIVE" | "DELETED" | "ARCHIVED" | "DRAFT";
}

export interface AttachedFilesProps {
  id: string;
  title: string;
  description: string;
  files: File[];
}

export interface DBTrainingProps {
  title?: string;
  start_date?: string;
  end_date?: string;
  location?: string;
  company_id?: string;
  modules?: string[];
}

export interface dasboardFormParams {
  trigger_btn_label_form?: string;
  construct_form_btn_label?: string;
  existing_form_btn_label?: string;
  new_form_title?: string;
  construct_form_btn_icon?: ElementType;
  existing_form_btn_icon?: ElementType;
}
