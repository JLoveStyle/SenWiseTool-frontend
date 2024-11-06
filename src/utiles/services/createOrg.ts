"use server"
import { FormData } from "@/types/formData";
import { clerkClient } from "@clerk/nextjs/server";

export async function createOrganization(payload: FormData, currentUserId: string) {
  const response = await clerkClient.organizations.createOrganization({
    name: payload.companyName,
    createdBy: currentUserId,
    // slug: slugify(payload.companyName),
    publicMetadata: {
      company_email: payload.companyEmail,
      business_activity: payload.businessActivity,
      state: payload.state,
      city: payload.city,
      country: payload.country,
      other_business: payload.otherBusiness,
      hasAgree: payload.hasAgree,
      address: payload.address,
      description: payload.description,
      telephone: payload.phone
    }
  })
  return JSON.stringify(response)
}