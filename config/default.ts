import dotenv from "dotenv";
dotenv.config();
export default {
  port: process.env.PORT,
  origin: process.env.ORIGIN,
  dbUri: process.env.DATABASE_URL,
  saltWorkFactor: process.env.SALTWORKFACTOR,
  accessTokenTtl: process.env.ACCESSTOKENTTL,
  refreshTokenTtl: process.env.REFERSHTOKENTTL,
  publicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY,
  privateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  googleClient_id: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  googleRedirectUri: process.env.GOOGLE_AUTH_REDIRECT_URL,
};
