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
  /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
  app.get("/healthcheck", (req: Request, res: Response) =>
    res.status(200).send({ message: "I am UP" })
  );

  /**
   * @openapi
   * paths:
   *   /api/users:
   *     post:
   *       tags:
   *         - User
   *       summary: Register a user
   *       requestBody:
   *         required: true
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/CreateUserInput'
   *       responses:
   *         '201':
   *           description: Success
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/CreateUserResponse'
   *         '400':
   *           description: Bad Request
   *         '500':
   *           description: Internal Server Error
   */

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

  /**
   * @openapi
   * paths:
   *   /api/products/{productId}:
   *     get:
   *       tags:
   *         - Products
   *       summary: Get a Single Product by ProductId
   *       parameters:
   *         - name: productId
   *           in: path
   *           description: The Id of Product
   *           required: true
   *       responses:
   *         '200':
   *           description: Success
   *           content:
   *             application/json:
   *               schema:
   *                 $ref: '#/components/schemas/Product'
   *         '404':
   *           description: Product not found
   */

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
