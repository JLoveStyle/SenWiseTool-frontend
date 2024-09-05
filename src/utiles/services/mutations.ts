import { Company, User } from "@/types/formData";
import ApiCall from "./httpClients";
import { BASE_URL, API_URL } from "./constants";


const apiCall = new ApiCall()

// CREATE resource
export async function mutateApiData(route: string, company: Partial<Company>) {
    return apiCall.POST(`${API_URL}/${route}`, company)

}

/**
 * Fetch resource from the API
 * @param valueTofetch - The value to fetch in the API
 * @param route - The route to use in the API
 * @param args - Additional arguments to pass to the API call
 * @returns The response from the API, or an error if the call fails
 */
export const fetchApiData = async (route: string, valueTofetch?: string, ...args: any[]) => {
    return await apiCall.GET(`${API_URL}/${route}/${valueTofetch}`)
}