"use server";

import { connectDB } from "@/lib/db";
import Link from "@/lib/models/Link";
import { revalidatePath } from "next/cache";

export async function editLink(
  linkId: string,
  newData: { originalUrl?: string; title?: string; shortUrl?: string }
) {
  await connectDB();

  try {
    const updatedLink = await Link.findByIdAndUpdate(linkId, newData, {
      new: true,
    });
    if (!updatedLink) {
      throw new Error("Link not found.");
    }

    // Revalidate the path to reflect the changes
    revalidatePath("/dashboard");

    return {
      message: "Link updated successfully",
      link: JSON.parse(JSON.stringify(updatedLink)),
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to edit link: ${error.message}`);
    }
    throw new Error("Failed to edit link: Unknown error");
  }
}
