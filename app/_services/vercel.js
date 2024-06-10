import { createPool } from "@vercel/postgres";

export const vercelConnection = function () {
  const client = createPool({ connectionString: process.env.POSTGRES_URL });
  return client;
};
