import * as UserService from "../service/user.service";
import * as SessionService from "../service/session.service";
import supertest from "supertest";
import { sessionPayload, userInput, userPayload } from "./constants/payload";
import createServer from "../utlis/server";
import { createUserSessionHandler } from "../controller/session.comtoller";

const app = createServer();
describe("user", () => {
  // user registration
  // username and password and validated
  // verify login
  // veriify handler handles all error

  describe("user regitration", () => {
    describe("given the username and password valid", () => {
      it("should return user payload", async () => {
        const craeteUserServiceMock = jest
          .spyOn(UserService, "createUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode, body } = await supertest(app)
          .post(`/api/users`)
          .send(userInput);

        expect(statusCode).toBe(201);

        expect(body.data).toEqual(userPayload);

        expect(craeteUserServiceMock).toHaveBeenCalledWith(userInput);
      });
    });

    describe("given password not match", () => {
      it("shoudl return 400", async () => {
        const craeteUserServiceMock = jest
          .spyOn(UserService, "createUser")
          // @ts-ignore
          .mockReturnValueOnce(userPayload);

        const { statusCode, body } = await supertest(app)
          .post(`/api/users`)
          .send({ ...userInput, passwordConfirmation: "password" });

        expect(statusCode).toBe(500);

        expect(craeteUserServiceMock).not.toHaveBeenCalled();
      });
    });

    describe("given the user service throw", () => {
      it("shpuld handle error and return 500", async () => {
        const craeteUserServiceMock = jest
          .spyOn(UserService, "createUser")
          // @ts-ignore
          .mockRejectedValue("oh no :(");

        const { statusCode, body } = await supertest(app)
          .post(`/api/users`)
          .send(userInput);

        expect(statusCode).toBe(500);

        expect(craeteUserServiceMock).toHaveBeenCalled();
      });
    });
  });

  describe("craete user session", () => {
    describe("given username and password valid", () => {
      it("should retien access and refresh token ", async () => {
        jest
          .spyOn(UserService, "validatePassword")
          // @ts-ignore
          .mockReturnValue(userPayload);

        jest
          .spyOn(SessionService, "createSession")
          // @ts-ignore
          .mockReturnValue(sessionPayload);

        const req = {
          get: () => {
            return "a user agent";
          },
          body: {
            email: "testing@gmail.com",
            password: "Admin@123",
          },
        };

        const send = jest.fn();
        const status = jest.fn().mockReturnThis();
        const res = { send, status };

        // @ts-ignore
        await createUserSessionHandler(req, res);

        expect(status).toHaveBeenCalledWith(200);
        expect(send).toHaveBeenCalledWith({
          status: true,
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
        });
      });
    });
  });
});
