import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { UserDocuemnt } from "./user.model";

export interface SessionInput {
  user: UserDocuemnt["_id"];
  valid: boolean;
  userAgent: string;
}

export interface SessionDocuemnt extends SessionInput, mongoose.Document {
  user: UserDocuemnt["_id"];
  valid: boolean;
  userAgent: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    valid: { type: Boolean, default: true },
    userAgent: { type: String },
  },
  {
    timestamps: true,
  }
);

const SessionModel = mongoose.model<SessionDocuemnt>("Session", sessionSchema);
export default SessionModel;
