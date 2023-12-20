import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  apiVersion: "2023-12-20",
  token: process.env.SANITY_SECRET_TOKEN, // Only if you want to update content with the client
});
