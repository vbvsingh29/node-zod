import { Express, Request, Response } from "express";
import {
  createUserHandler,
  getCurrentUser,
} from "./controller/user.comtroller";
import { createUserSchema } from "./schema/user.schema";
import validateResource from "./middleware/validateResource";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
  googleOauthHandler,
} from "./controller/session.comtoller";
import { createSessionSchema } from "./schema/session.schema";
import requireUser from "./middleware/requireUser";
import {
  createProductSchema,
  deleteProductScehma,
  getProductScehma,
  updateProductScehma,
} from "./schema/product.schema";
import {
  createProductHandler,
  deleteProductHandler,
  getProductHandler,
  updateProductHandler,
} from "./controller/product.controller";

function routes(app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) =>
    res.status(200).send({ message: "I am UP" })
  );

  app.post("/api/users", validateResource(createUserSchema), createUserHandler);
  app.get("/api/me", requireUser, getCurrentUser);

  app.post(
    "/api/sessions",
    validateResource(createSessionSchema),
    createUserSessionHandler
  );

  app.get("/api/sessions", requireUser, getUserSessionsHandler);
  app.delete("/api/sessions", requireUser, deleteSessionHandler);

  app.get("/api/sessions/oauth/google", googleOauthHandler);
  app.post(
    "/api/products",
    [requireUser, validateResource(createProductSchema)],
    createProductHandler
  );
  app.put(
    "/api/products/:productId",
    [requireUser, validateResource(updateProductScehma)],
    updateProductHandler
  );
  app.get(
    "/api/products/:productId",
    [validateResource(getProductScehma)],
    getProductHandler
  );
  app.delete(
    "/api/products/:productId",
    [requireUser, validateResource(deleteProductScehma)],
    deleteProductHandler
  );
}

export default routes;
