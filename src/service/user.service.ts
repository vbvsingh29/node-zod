// import { DocumentDefinition } from "mongoose";
import UserModel, { UserInput } from "../models/user.model";
export async function createUser(input: UserInput) {
  try {
    return await UserModel.create(input);
  } catch (err: any) {
    throw new Error(err);
  }
}
