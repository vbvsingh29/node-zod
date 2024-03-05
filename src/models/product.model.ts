import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocuemnt } from "./user.model";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789");

export interface ProductInput {
  user: UserDocuemnt["_id"];
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface ProductDocuemnt extends ProductInput, mongoose.Document {
  user: UserDocuemnt["_id"];
  title: string;
  productId: string;
  description: string;
  price: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      default: () => `product_${nanoid()}`,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const ProductModel = mongoose.model<ProductDocuemnt>("Product", productSchema);
export default ProductModel;
