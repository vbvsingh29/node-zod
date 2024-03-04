import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import createServer from "../utlis/server";
import mongoose from "mongoose";
import { createProduct } from "../service/product.service";
import { signJwt } from "../utlis/jwt.utlis";
import {
  expectedPayload,
  productPayload,
  userPayload,
} from "./constants/payload";

const app = createServer();

describe("product", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });
  describe("get product", () => {
    describe("given producct doesn't Exist", () => {
      it("should return 404", async () => {
        const productId = "product-123";
        await supertest(app).get(`/api/products/${productId}`).expect(404);
      });
    });

    describe("given producct does Exist", () => {
      it("should return 200 and Product", async () => {
        const product = await createProduct(productPayload);
        const productId = "product-123";
        const { body, statusCode } = await supertest(app).get(
          `/api/products/${product.productId}`
        );

        expect(statusCode).toBe(200);

        expect(body.product.productId).toBe(product.productId);
      });
    });
  });
  describe("create Product route", () => {
    describe("given User not logged in ", () => {
      it("shoould return 403", async () => {
        const { statusCode } = await supertest(app).post(`/api/products`);

        expect(statusCode).toBe(403);
      });
    });
    describe("given User is logged in ", () => {
      it("shoould return 201 and create Product", async () => {
        const jwt = signJwt(userPayload);
        const { statusCode, body } = await supertest(app)
          .post(`/api/products`)
          .set("Authorization", `Bearer ${jwt}`)
          .send(productPayload);

        expect(statusCode).toBe(201);
        expect(body.product).toEqual(expectedPayload);
      });
    });
  });
});
