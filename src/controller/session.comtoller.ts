import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import {
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import { signJwt } from "../utlis/jwt.utlis";
import config from "config";
import logger from "../utlis/logger";

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
  res.cookie("accessToken", accessToken, {
    maxAge: 900000, // 15 mins
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,
  });

  res.cookie("refreshToken", refreshToken, {
    maxAge: 3.154e10, // 1 year
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "strict",
    secure: false,
  });
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
