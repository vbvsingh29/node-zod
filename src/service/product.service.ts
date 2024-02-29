import { FilterQuery, Query, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, {
  ProductDocuemnt,
  ProductInput,
} from "../models/product.model";

export async function createProduct(input: ProductInput) {
  return ProductModel.create(input);
}
export async function findProduct(
  query: FilterQuery<ProductDocuemnt>,
  options: QueryOptions = { lean: true }
) {
  return ProductModel.findOne(query, {}, options);
}
export async function findAndUpdateProduct(
  query: FilterQuery<ProductDocuemnt>,
  update: UpdateQuery<ProductDocuemnt>,
  options: QueryOptions
) {
  return ProductModel.findOneAndUpdate(query, update, options);
}
export async function deleteProduct(query: FilterQuery<ProductDocuemnt>) {
  return ProductModel.deleteOne(query);
}
