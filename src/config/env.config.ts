import dotenv from "dotenv";
import path from "path";
import Joi from "joi";
import logger from "../common/utils/logger";

const envPath = path.resolve(process.cwd(), `.${process.env.NODE_ENV}.env`);
dotenv.config({ path: envPath });

//* get the intended host and port number, use localhost and port 3000 if not provided
const envVarsSchema = Joi.object()
  .keys({
    JOB_SERVICE_PORT: Joi.number().default(3004),
    DB_HOSTNAME: Joi.string().required().description("Database host name"),
    DB_PORT: Joi.number().default(5432).description("Database port"),
    DB_NAME: Joi.string().required().description("Database name"),
    DB_USERNAME: Joi.string().required().description("Database user name"),
    DB_PASSWORD: Joi.string().required().description("Database password"),
    JWT_SECRET_KEY: Joi.string().required().description("JWT secret key"),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description("minutes after which access tokens expire"),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description("days after which refresh tokens expire"),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: "key" } }).validate(process.env);

if (error) {
  logger.error(`Config validation error: ${error.message}`);
  throw new Error(`Config validation error: ${error.message}`);
}

//* Export the config object based on the NODE_ENV
const config = {
  port: envVars.JOB_SERVICE_PORT,
  db_host: envVars.DB_HOSTNAME,
  db_port: envVars.DB_PORT,
  db_name: envVars.DB_NAME,
  db_username: envVars.DB_USERNAME,
  db_password: envVars.DB_PASSWORD,
  jwt: {
    secret: envVars.JWT_SECRET_KEY,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: 10,
  },
};

export default config;
