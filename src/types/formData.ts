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

export interface DBTrainingProps {
  title?: string;
  start_date?: string;
  end_date?: string;
  location?: string;
  company_id?: string;
  modules?: string[];
}
