import { Company, User } from "@/types/formData";
import ApiCall from "./httpClients";
import { BASE_URL, API_URL } from "./constants";



const apiCall = new ApiCall()

// CREATE User
export async function createUser(user: Partial<User>) {
  return apiCall.POST(BASE_URL + "/v1/users", user)

}

// CREATE COMPANY
export async function createCompany(company: Partial<Company>) {
  return apiCall.POST(BASE_URL + "/v1/companies", company)
}

export const fetchPricePlan = async (valueTofetch: string) => {
  return await apiCall.GET(`${API_URL}/v1/price_plans/${valueTofetch}`)
}
