import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";
import { UserDocuemnt } from "./user.model";

export interface SchemaInput {
  user: UserDocuemnt["_id"];
  valid: boolean;
  userAgent: string;
}

export interface SchemaDocuemnt extends SchemaInput, mongoose.Document {
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

const SessionModel = mongoose.model("Session", sessionSchema);
export default SessionModel;
