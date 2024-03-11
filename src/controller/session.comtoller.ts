import { Request, Response, CookieOptions } from "express";
import jwt from "jsonwebtoken";
import {
  findUserAndUpdate,
  getGoogleOAuthTokens,
  getGoogleUser,
  validatePassword,
} from "../service/user.service";
import {
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import { signJwt } from "../utlis/jwt.utlis";
import config from "config";
import logger from "../utlis/logger";

const accessTokenCookiesOption: CookieOptions = {
  maxAge: 900000, // 15 mins
  httpOnly: true,
  domain: "localhost",
  path: "/",
  sameSite: "lax",
  secure: false,
};

const refreshTokenCookiesOption: CookieOptions = {
  ...accessTokenCookiesOption,
  maxAge: 3.154e10, // 1 year
};
export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate user password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send({
      status: false,
      message: "Invalid Email or Password",
    });
  }

  // create session
  const session = createSession(user._id, req.get("user-agent") || "");

  // create access token
  const accessToken = signJwt(
    { ...user, session: (await session)._id },
    { expiresIn: config.get("accessTokenTtl") } // 15 mins
  );

  // craete refreh token
  const refreshToken = signJwt(
    { ...user, session: (await session)._id },
    { expiresIn: config.get("refreshTokenTtl") } // 1y
  );
  // Return access and refresh token
  res.cookie("accessToken", accessToken, accessTokenCookiesOption);

  res.cookie("refreshToken", refreshToken, refreshTokenCookiesOption);
  return res.status(200).send({ status: true, accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
  try {
    const userId = res.locals.user._id;

    const sessions = await findSessions({
      user: userId,
      valid: true,
    });

    return res.status(200).send({ sessions });
  } catch (err: any) {
    logger.error(err, "catch error");
    return res.status(500).send({
      message: err.message,
    });
  }
}

export async function deleteSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}

export async function googleOauthHandler(req: Request, res: Response) {
  try {
    // get code from query string
    const code = req.query.code as string;
    // get id and accesstoken with code
    const { id_token, access_token } = await getGoogleOAuthTokens(code);
    console.log({ id_token, access_token });
    // get user with token

    const googleuser = await getGoogleUser({ id_token, access_token });
    //jwt.decode(id_token);
    // insert that user in DB (UPSERT the user)

    if (!googleuser.verified_email) {
      return res
        .status(403)
        .send({ message: "Google Account is not Verified" });
    }
    const user = await findUserAndUpdate(
      {
        email: googleuser.email,
      },
      {
        email: googleuser.email,
        name: googleuser.name,
        picture: googleuser.picture,
      },
      {
        upsert: true,
        new: true,
      }
    );
    // create session
    const session = createSession(
      user?.toJSON()._id,
      req.get("user-agent") || ""
    );

    // create access token
    const accessToken = signJwt(
      { ...user?.toJSON(), session: (await session)._id },
      { expiresIn: config.get("accessTokenTtl") } // 15 mins
    );

    // craete refreh token
    const refreshToken = signJwt(
      { ...user?.toJSON(), session: (await session)._id },
      { expiresIn: config.get("refreshTokenTtl") } // 1y
    );
    
    // Return access and refresh token
    res.cookie("accessToken", accessToken, accessTokenCookiesOption);

    res.cookie("refreshToken", refreshToken, refreshTokenCookiesOption);
    // redirect to clinet
    res.redirect(`${config.get("origin")}`);
  } catch (error: any) {
    logger.error(error, "catch error");
    return res.redirect(`${config.get("origin")}/oauth/error/#`);
  }
}
