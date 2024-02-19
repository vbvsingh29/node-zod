import dotenv from "dotenv";
dotenv.config();
export default {
  port: process.env.PORT,
  dbUri: process.env.DATABASE_URL,
  saltWorkFactor: process.env.SALTWORKFACTOR,
};
