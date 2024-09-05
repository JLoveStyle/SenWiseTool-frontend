import { Company, User } from "@/types/formData";
import ApiCall from "./httpClients";
import { BASE_URL, API_URL } from "./constants";
import { Project } from "@/types/gestion";

const apiCall = new ApiCall()

// CREATE User
export async function createUser(user: Partial<User>) {
  return await apiCall.POST(BASE_URL + "/v1/users", user)
}

// SAVE PROOJECT TO DRAFT
export async function saveProjectToDraft(id: string, project: Partial<Project>) {
  return await apiCall.PUT(BASE_URL + "/v1/projects", id)
}

// CREATE COMPANY
export async function createCompany(company: Partial<Company>) {
  return await apiCall.POST(BASE_URL + "/v1/companies", company)
}

export const fetchApiData = async (valueTofetch: string) => {
  return await apiCall.GET(`${API_URL}/price_plans/${valueTofetch}`)
}