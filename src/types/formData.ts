export interface FormData {
  companyName: string,
  companyEmail: string,
  hasAgree: boolean,
  country: string,
  state: string,
  city: string,
  businessActivity: string,
  otherBusiness: string
}

export type User = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  role?: string,
  companyId?: string,
  phoneNumber?: string,
  civility?: string
}

