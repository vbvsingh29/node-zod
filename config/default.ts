import dotenv from "dotenv";
dotenv.config();
export default {
  port: process.env.PORT,
  dbUri: process.env.DATABASE_URL,
  saltWorkFactor: process.env.SALTWORKFACTOR,
  accessTokenTtl: process.env.ACCESSTOKENTTL,
  refreshTokenTtl:process.env.REFERSHTOKENTTL,
  publicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
  privateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
};
