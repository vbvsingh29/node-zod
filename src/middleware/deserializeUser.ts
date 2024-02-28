import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { verifyJwt } from "../utlis/jwt.utlis";

export const deserialiseUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );
  
  if (!accessToken) {
    return next();
  }
  const { decoded, expired } = verifyJwt(accessToken);

  if(decoded){
    res.locals.user = decoded;
    next();
  }
  
  return next();
};
