import { Request, Response } from "express";
import logger from "../utlis/logger";
import { createUser } from "../service/user.service";
import { CreateUserInput } from "../schema/user.schema";
import { omit } from "lodash";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    logger.info(user);
    return res.status(201).send({
      status: true,
      message: "DONE",
      data: omit(user.toJSON(),"password"),
    });
  } catch (err: any) {
    logger.error(err);
    return res.status(500).send({ message: err.message });
  }
}
