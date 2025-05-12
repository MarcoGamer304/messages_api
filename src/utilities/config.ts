import { TConfig } from "../models/types/TConf";
import { env } from "./validator";

export const config: TConfig = {
  DATABASE: env.DATABASE,
  USER: env.USER,
  PASSWORD: env.PASSWORD,
  HOST: env.HOST,
  JWT_SECRET: env.JWT_SECRET,
  JWT_EXPIRATION: env.JWT_EXPIRATION,
  NODE_ENV: env.NODE_ENV,
  CORS_ORIGIN: env.CORS_ORIGIN,
  PORT: env.PORT,
  URL: env.URL
};
