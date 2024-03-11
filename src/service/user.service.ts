// import { DocumentDefinition } from "mongoose";
import { omit } from "lodash";
import UserModel, { UserDocuemnt, UserInput } from "../models/user.model";
import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import logger from "../utlis/logger";
import config from "config";
import axios from "axios";
import QueryString from "qs";

export async function createUser(input: UserInput) {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);
  if (!isValid) {
    return false;
  }
  return omit(user.toJSON(), "password");
}

export async function findUser(query: FilterQuery<UserDocuemnt>) {
  return UserModel.findOne(query).lean();
}

interface GoogleTokensResult {
  access_token: string;
  expires_in: Number;
  refresh_token: string;
  scope: string;
  id_token: string;
}

export async function getGoogleOAuthTokens(code: string) {
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code,
    client_id: config.get("googleClient_id"),
    client_secret: config.get("googleClientSecret"),
    redirect_uri: config.get("googleRedirectUri"),
    grant_type: "authorization_code",
  };
  try {
    const res = await axios.post<GoogleTokensResult>(
      url,
      QueryString.stringify(values),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return res.data;
  } catch (error: any) {
    logger.error(error, "Failed to Fetch Google AUth Token");
    throw new Error(error.message);
  }
}

interface GoogleUserResult {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export async function getGoogleUser({
  id_token,
  access_token,
}: {
  id_token: string;
  access_token: string;
}): Promise<GoogleUserResult> {
  try {
    const res = await axios.get<GoogleUserResult>(
      // `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      }
    );
    return res.data;
  } catch (error: any) {
    logger.error(error, "Error While Fetching Google User Details");
    throw new Error(error.message);
  }
}

export async function findUserAndUpdate(
  query: FilterQuery<UserInput>,
  update: UpdateQuery<UserInput>,
  options: QueryOptions = {}
) {
  return UserModel.findOneAndUpdate(query, update, options);
}
