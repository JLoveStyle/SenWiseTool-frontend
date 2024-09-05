import { Company, User } from "@/types/formData";
import ApiCall from "./httpClients";
import { BASE_URL, API_URL } from "./constants";


const apiCall = new ApiCall()

// CREATE User
export async function createUser(user: Partial<User>) {
  return apiCall.POST(BASE_URL + "/users", user)
}

// CREATE COMPANY
export async function createCompany(company: Partial<Company>) {
  return apiCall.POST(BASE_URL + "/companies", company)

}

export const fetchApiData = async (valueTofetch: string) => {
  return await apiCall.GET(`${API_URL}/price_plans/${valueTofetch}`)
}