import path from "path";
import dotenv from "dotenv";
const envPath = path.resolve(process.cwd(), `.${process.env.NODE_ENV}.env`);

dotenv.config({ path: envPath });

//* Add your database configuration here.
module.exports = {
    //* Database Configuration for development 
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        dialect: "postgres",
        logging: false,
        freezeTableName: true,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },

    //* Database Configuration for production
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOSTNAME,
        dialect: "postgres",
        logging: false,
        freezeTableName: true,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
};
