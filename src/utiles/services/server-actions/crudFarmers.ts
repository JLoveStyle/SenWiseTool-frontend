"use server"

import { fetchApiData } from "../queries"

export async function getAllFarmers (route: string) {
  return await fetchApiData(route, "")
}

export async function getFamerById (route: string, id: string) {
  return await fetchApiData(route, id)
}