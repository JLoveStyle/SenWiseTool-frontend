import ApiCall from "./httpClients";
import { API_URL } from "./constants";

const apiCall = new ApiCall()


/**
 * Fetch data from the API
 * @param valueTofetch - The value to fetch in the API
 * @param route - The route to use in the API
 * @param args - Additional arguments to pass to the API call
 * @returns The response from the API, or an error if the call fails
 */
export const fetchApiData = async <T = any>(route: string, valueTofetch?: string, ...args: any[]): Promise<T> => {
  console.log('val2fetch', valueTofetch)
  console.log("route to api: ", `${API_URL}/${route}/${valueTofetch}`)
  const data = await apiCall.GET(`${API_URL}/${route}/${valueTofetch}`);
  // console.log("from query function: ", data);
  return data;
}

