import { FilterQuery, Query, QueryOptions, UpdateQuery } from "mongoose";
import ProductModel, {
  ProductDocuemnt,
  ProductInput,
} from "../models/product.model";
import { databaseResponseTimeHistogram } from "../utlis/metrics";

export async function createProduct(input: ProductInput) {
  const metricsLabel = {
    operation: "createProduct",
  };
  const timer = databaseResponseTimeHistogram.startTimer();
  try {
    const result = await ProductModel.create(input);
    timer({ ...metricsLabel, success: "true" });
    return result;
  } catch (error: any) {
    timer({ ...metricsLabel, success: "false" });
    throw new Error(error.message);
  }
}
export async function findProduct(
  query: FilterQuery<ProductDocuemnt>,
  options: QueryOptions = { lean: true }
) {
  const metricsLabel = {
    operation: "findProduct",
  };
  const timer = databaseResponseTimeHistogram.startTimer();

  try {
    const result = await ProductModel.findOne(query, {}, options);
    timer({ ...metricsLabel, success: "true" });
    return result;
  } catch (error: any) {
    timer({ ...metricsLabel, success: "false" });
    throw new Error(error.message);
  }
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
