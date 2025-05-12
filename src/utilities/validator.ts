import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  DATABASE: z.string(),
  USER: z.string(),
  PASSWORD: z.string(),
  HOST: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRATION: z.string(),
  NODE_ENV: z.string(),
  CORS_ORIGIN: z.string(),
  PORT: z.string(),
  URL: z.string()
});

export const env = envSchema.parse(process.env);