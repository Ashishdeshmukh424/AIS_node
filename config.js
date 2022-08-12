const path = require("path");

export const config = {
  rootDir: path.resolve(__dirname),
  port: process.env.API_PORT,
  encryption: process.env.ENCRYPTION,
  apiURL: process.env.API_URL,
  databaseHost: process.env.DB_HOST,
  databasePort: process.env.DB_PORT,
  databaseName: process.env.DB_NAME,
  databaseUser: process.env.DB_USERNAME,
  databasePassword: process.env.DB_PASSWORD,
  jwtTokenKey: process.env.JWT_SECRET_KEY
};
