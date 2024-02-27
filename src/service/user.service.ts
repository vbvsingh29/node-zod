// import { DocumentDefinition } from "mongoose";
import { omit } from "lodash";
import UserModel, { UserInput } from "../models/user.model";
export async function createUser(input: UserInput) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(),"password")
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function validatePassword({
  email, password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if(!user){
    return false;
  }

  const isValid = await user.comparePassword(password);
  if(!isValid){
    return false
  }
   return omit(user.toJSON(),"password")
}
