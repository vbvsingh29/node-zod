import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utlis/jwt.utlis";
import { reIssueAccessToken } from "../service/session.service";

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = get(req, "headers.authorization", "");

    const refreshTokenHeader = get(req, "headers.x-refresh");

    let refreshToken: string | undefined;
    if (Array.isArray(refreshTokenHeader)) {
      // Handle the case where refreshTokenHeader is an array
      refreshToken = refreshTokenHeader[0]; // Assuming you want to use the first element
    } else {
      refreshToken = refreshTokenHeader;
    }

    if (!accessToken) {
      return next();
    }
    const { decoded, expired } = verifyJwt(accessToken);

    if (decoded) {
      res.locals.user = decoded;
      next();
    }

    if (expired && refreshToken) {
      const newAccessToken = await reIssueAccessToken({ refreshToken });

      if (typeof newAccessToken === "string") {
        res.setHeader("x-access-token", newAccessToken);
        const result = verifyJwt(newAccessToken);
        res.locals.user = result.decoded;
        return next();
      }
      return next();
    }

    return next();
  } catch (err: any) {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
};

export default deserializeUser;
