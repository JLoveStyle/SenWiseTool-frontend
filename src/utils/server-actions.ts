"use server"

import { revalidatePath as revalidate } from "next/cache";

async function revalidatePath(path: string) {
    revalidate(path, "page")
    console.log('revalidate function')
}

export default revalidatePath;