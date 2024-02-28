import { Express, Request, Response } from "express";
import { createUserHandler } from "./controller/user.comtroller";
import { createUserSchema } from "./schema/user.schema";
import validateResource from "./middleware/validateResource";
import { createUserSessionHandler, deleteSessionHandler, getUserSessionHandler } from "./controller/session.comtoller";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "./middleware/requireUser";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) =>
    res.status(200).send({ message: "I am UP" })
  );

  app.post("/api/users", validateResource(createUserSchema), createUserHandler);

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );
  app.get("/api/sessions",requireUser, getUserSessionHandler);
  app.delete("/api/sessions",requireUser, deleteSessionHandler);
}

export default routes;
