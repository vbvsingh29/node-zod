import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocuemnt } from "../models/session.model";

export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({
    user: userId,
    userAgent,
  });

  return session.toJSON();
}

export async function findSessions(query: FilterQuery<SessionDocuemnt>) {
  return SessionModel.find(query).lean();
}

export async function updateSession(
  query: FilterQuery<SessionDocuemnt>,
  update: UpdateQuery<SessionDocuemnt>
) {
  return SessionModel.updateOne(query, update);
}
