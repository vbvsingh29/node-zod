import * as UserService from "../service/user.service";
import supertest from "supertest";
import { userInput, userPayload } from "./constants/payload";
import createServer from "../utlis/server";

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
      it("shpuld handle error and return 409", async () => {
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
        
      });
    });
  });
});
