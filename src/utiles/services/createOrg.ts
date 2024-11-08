"use server"
import { clerkClient, Organization } from "@clerk/nextjs/server";
import { FormData } from "@/types/formData";

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
  console.log('comapny created')
  return JSON.stringify(response)
}