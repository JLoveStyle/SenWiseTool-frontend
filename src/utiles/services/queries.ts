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

/**
 * Fetch data from the API
 * @param valueTofetch - The value to fetch in the API
 * @param route - The route to use in the API
 * @param args - Additional arguments to pass to the API call
 * @returns The response from the API, or an error if the call fails
 */
export const fetchApiData = async <T = any>(route: string, valueTofetch?: string, ...args: any[]): Promise<T> => {
  return await apiCall.GET(`${API_URL}/${route}/${valueTofetch}`);
}

