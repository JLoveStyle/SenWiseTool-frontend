import { Company, User } from "@/types/formData";
import ApiCall from "./httpClients";
import { BASE_URL, API_URL } from "./constants";
import { useUserStore } from "@/lib/stores/user-stores";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { usePriceStore } from "@/lib/stores/price-store";


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
export const fetchApiData = async (route: string, valueTofetch?: string, ...args: any[]) => {
  const data = await apiCall.GET(`${API_URL}/${route}/${valueTofetch}`);
  switch (route) {
    case "users":
      const setCurrentUser = useUserStore(state => state.setCurrentUser);

      if (data)
        setCurrentUser(data);
      break
    case "companies":
      const setCompany = useCompanyStore(state => state.setCompany);

      if (data)
        setCompany(data);
      break
    case "price_plans":
      const setPricePlan = usePriceStore(state => state.setPricePlan);
      console.log("price plan: ", data);
      if (data)
        setPricePlan(data);
      break;
    default:
      console.log("%c unknown route", 'red');
  }

  return data;
}