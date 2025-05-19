"use strict";
import { Sequelize, DataTypes } from "sequelize";
import * as fs from "fs";
import * as path from "path";
import process from "process";
import { logger } from "../common/utils/index";
const basename = path.basename(__filename);
let env: string = process.env.NODE_ENV || "development";
let config = require("../config/db.config")[env];
const db: Record<string, any> = {};

let sequelize: any;

if (config?.use_env_variable) {
  const databaseUrl = process.env[config?.use_env_variable] || "";
  sequelize = new Sequelize(databaseUrl, config);
} else {
  sequelize = new Sequelize(config.database || "", config.username || "", config.password || undefined, config);
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      // file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
      file.indexOf(".") !== 0 && file !== basename && (file.slice(-3) === ".ts" || file.slice(-3) === ".js")
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize
  .sync({ alter: true })
  .then(() => {
    logger.verbose("Database & tables created!");
  })
  .catch((err: any) => {
    logger.error(`catch error in model/index.ts: ${err}`);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
