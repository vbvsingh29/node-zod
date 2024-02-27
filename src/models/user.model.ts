import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserInput {
  email: string;
  name: string;
  password: string;
}
export interface UserDocuemnt extends UserInput, mongoose.Document {
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<Boolean>;}

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next: (err?: Error) => void) {
  let user = this as UserDocuemnt;

  if (!user.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(user.password, salt);

  user.password = hash;
});

userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<Boolean> {
  const user = this as UserDocuemnt;
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};
const UserModel = mongoose.model<UserDocuemnt>("User", userSchema);
export default UserModel;
