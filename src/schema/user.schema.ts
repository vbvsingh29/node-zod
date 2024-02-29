import { TypeOf, object, string } from "zod";

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is Required",
    }),
    password: string({
      required_error: "Password is Required",
    }).min(6, "Password too short greater than 6 chars"),
    passwordConfirmation: string({
      required_error: "passwordCOnfirmate is required",
    }),
    email: string({
      required_error: "Email is required",
    }).email("Email is Not valid"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Password dont match",
    path: ["passwordConfirmation"],
  }),
});

export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>;
