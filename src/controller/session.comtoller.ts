import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { createSession, findSessions } from "../service/session.service";
import { signJwt } from "../utlis/jwt.utlis";
import config from "config";

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
  return res.status(200).send({ accessToken, refreshToken });
}

export async function getUserSessionHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });
  console.log({ sessions });

  return res.send({ sessions });
}
