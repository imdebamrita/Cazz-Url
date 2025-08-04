"use server";

import { connectDB } from "@/lib/db";
import Link from "@/lib/models/Link";
import { revalidatePath } from "next/cache";

export async function deleteLink(linkId: string) {
  await connectDB();

  try {
    const deletedLink = await Link.findByIdAndDelete(linkId);
    if (!deletedLink) {
      throw new Error("Link not found.");
    }

    // Revalidate the path to reflect the changes
    revalidatePath("/dashboard");

    return {
      message: "Link deleted successfully",
      link: JSON.parse(JSON.stringify(deletedLink)),
    };
  } catch (error: any) {
    throw new Error(`Failed to delete link: ${error.message}`);
  }
}
