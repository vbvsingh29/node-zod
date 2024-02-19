import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.comtroller";
import { createUserSchema } from "./controller/schema/user.schema";
import validateResource from "./middleware/validateResource";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.status(200).send({message:"I am UP"}));

  app.post("/api/users", validateResource(createUserSchema),createUserHandler);
}

export default routes;
