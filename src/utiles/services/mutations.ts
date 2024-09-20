import ApiCall from "./httpClients";
import { BASE_URL, API_URL } from "./constants";


const apiCall = new ApiCall()



/**
 * Sends a POST request to the server to create a new resource.
 *
 * @param route The route to send the request to. This should be a string
 * that represents the resource being created. For example, if the route
 * is "users", the request will be sent to "/api/users".
 * @param valueToStore The data to be stored in the database. This should
 * be an object that represents the resource being created.
 * @returns The response from the server. This should be the newly
 * created resource.
 */
export async function mutateApiData<T>(route: string, valueToStore: Partial<T>) {

    return apiCall['POST'](`${API_URL}/${route}`, valueToStore)
}



/**
 * Patches data to the server to update the database. The route is based on the resource
 * being updated. The valueToStore is the data to be stored in the database. The
 * params is an optional parameter that can be used when the route requires a
 * parameter. For example, if the route is /users/:id, the params would be the id
 * of the user to be updated.
 *
 * @param {string} route - The route to post to.
 * @param {Partial<T>} valueToStore - The data to be stored in the database.
 * @param {string} [params] - Optional parameter to be used in the route.
 *
 * @returns {Promise<T>} The data that was just stored in the database.
 */
export async function mutateUpApiData<T>(route: string, valueToStore: Partial<T>, params?: string) {
    return apiCall['PATCH'](`${API_URL}/${route}/${params}`, valueToStore)
}

export async function mutateDelApiData<T>(route: string, params?: string) {
    return apiCall['DELETE'](`${API_URL}/${route}/${params}`)
}
