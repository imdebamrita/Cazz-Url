import { checkExistingLink } from "@/lib/actions/link/checkExisting";
import { nanoid } from "nanoid";

const GetUniqueShortUrl = async (retryCount: number = 5) => {
  for (let i = 0; i < retryCount; i++) {
    const shortUrl = nanoid(7); // Generate a random short code
    const isTaken = await checkExistingLink(shortUrl);
    if (!isTaken) return shortUrl;
  }
  throw new Error("Failed to generate a unique short URL");
};

export default GetUniqueShortUrl;
