export interface FormData {
  companyName: string;
  companyEmail: string;
  hasAgree: boolean;
  country: string;
  state: string;
  city: string;
  businessActivity: string;
  otherBusiness: string;
}

export interface User {
<<<<<<< HEAD
  id?: string,
  username?: string,
  title: ['ADG' | "MEMBER"],
  company_id?: string,
  status?: ['active' | 'inactive' | "banned"],
  activity?: ['FARMER' | 'EMPLOYEE' | "AUDITOR" | "TRAINER" | "AGENT"],
  famer_attached_contract_url?: string,
  profileUrls?: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role?: string,
  companyId?: string,
  phone_number?: string,
  civility?: string
}

export interface Company {
  id?: string,
  slug?: string,
  address?: string,
  description?: string,
  website?: string,
  phone_number?: string,
  companyName: string,
  companyEmail: string,
  country: string,
  state: string,
  city: string,
  sector_of_activity: string,
  logo?: string,
  paypal_id?: string,
  payment_mode?: string
=======
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: string;
  companyId?: string;
  phoneNumber?: string;
  civility?: string;
}

export interface Company {
  companyName: string;
  companyEmail: string;
  country: string;
  state: string;
  city: string;
  sector_of_activity: string;
  logo?: string;
  paypal_id?: string;
  payment_mode?: string;
>>>>>>> e317a321f98d45a3a2860b203cf7f54370c4fe06
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
