import { Company, User } from "@/types/formData";
import ApiCall from "./httpClients";
import { BASE_URL, API_URL } from "./constants";
import { Project } from "@/types/gestion";

const apiCall = new ApiCall()

// CREATE User
export async function createUser(user: Partial<User>) {
  return await apiCall.POST(BASE_URL + "/v1/users", user)
}

// SAVE PROOJECT AS DRAFT
export async function saveProjectToDraft(id: string, project: Partial<Project>) {
  return await apiCall.PUT(BASE_URL + "/v1/projects", id)
}

// CREATE PROJECT
export async function createProject(project: Partial<Project>) {
  return await apiCall.POST(BASE_URL + "v1/projects", project)
}


/**
 * Fetch data from the API
 * @param valueTofetch - The value to fetch in the API
 * @param route - The route to use in the API
 * @param args - Additional arguments to pass to the API call
 * @returns The response from the API, or an error if the call fails
 */
export const fetchApiData = async <T = any>(route: string, valueTofetch?: string, ...args: any[]): Promise<T> => {
  console.log("route to api: ", `${API_URL}/${route}/${valueTofetch}`)
  const data = await apiCall.GET(`${API_URL}/${route}`);
  // console.log("from query function: ", data);
  return data;
}

