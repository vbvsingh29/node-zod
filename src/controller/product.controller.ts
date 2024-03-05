import { Request, Response } from "express";
import {
  CreateProductInput,
  DeleteProductInput,
  GetProductInput,
  UpdateProductInput,
} from "../schema/product.schema";
import {
  createProduct,
  deleteProduct,
  findAndUpdateProduct,
  findProduct,
} from "../service/product.service";

export async function createProductHandler(
  req: Request<{}, {}, CreateProductInput["body"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;

    const body = req.body;

    const product = await createProduct({ ...body, user: userId });
    return res.status(201).send({ status: true, product });
  } catch (err: any) {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
}

export async function getProductHandler(
  req: Request<UpdateProductInput["params"]>,
  res: Response
) {
  try {
    const productId = req.params.productId;

    const product = await findProduct({ productId });

    if (!product) {
      return res.status(404).send({
        status: false,
        message: "Product Not Found",
      });
    }

    return res.status(200).send({
      status: true,
      product,
    });
  } catch (err: any) {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
}

export async function updateProductHandler(
  req: Request<GetProductInput["params"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;

    const productId = req.params.productId;

    const update = req.body;

    const product = await findProduct({ productId });

    if (!product) {
      return res.status(404).send({
        status: false,
        message: "Product Not Found",
      });
    }

    if (String(product.user) !== userId) {
      return res.status(403).send({
        status: false,
        message: "FOrbidden",
      });
    }

    const updatedProduct = await findAndUpdateProduct({ productId }, update, {
      new: true,
    });
    return res.status(200).send({
      status: true,
      updatedProduct,
    });
  } catch (err: any) {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
}

export async function deleteProductHandler(
  req: Request<DeleteProductInput["params"]>,
  res: Response
) {
  try {
    const userId = res.locals.user._id;

    const productId = req.params.productId;

    const product = await findProduct({ productId });

    if (!product) {
      return res.status(404).send({
        status: false,
        message: "Product Not Found",
      });
    }

    if (String(product.user) !== userId) {
      return res.status(403).send({
        status: false,
        message: "FOrbidden",
      });
    }
    await deleteProduct({ productId });
    return res.status(200).send({
      status: true,
      message: "Product Deleted",
    });
  } catch (err: any) {
    return res.status(500).send({
      status: false,
      message: err.message,
    });
  }
}
