import { Company, User } from "@/types/formData";
import ApiCall from "./httpClients";
import { BASE_URL } from "./constants";


const apiCall = new ApiCall()

// CREATE User
export async function createUser (user: Partial<User>) {
  return apiCall.POST(BASE_URL + "/v1/users", user)

}

// CREATE COMPANY
export async function createCompany (company: Partial<Company>) {
  return apiCall.POST(BASE_URL + "/v1/companies", company)
}

// CREATE SUB-ACCOUNT ADG
// export async function createADG (params:type) {
  
// }