import { object, number, string, TypeOf } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      required:
 *        - title
 *        - description
 *        - price
 *        - image
 *      properties:
 *         title:
 *           type: string
 *           default: "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
 *         description:
 *           type: string
 *           default: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
 *         price:
 *           type: number
 *           default: 879.99
 *         image:
 *           type: string
 *           default: "url..." 
 *
 */
const paylaod = {
  body: object({
    title: string({
      required_error: "Title is required",
    }),
    description: string({
      required_error: "Description is required",
    }).min(120, "Description should be 120 characters long"),
    price: number({
      required_error: "Price is required",
    }),
    image: string({
      required_error: "Image is required",
    }),
  }),
};

const params = {
  params: object({
    productId: string({
      required_error: "ProductId is required",
    }),
  }),
};

export const createProductSchema = object({
  ...paylaod,
});

export const updateProductScehma = object({
  ...paylaod,
  ...params,
});

export const getProductScehma = object({
  ...params,
});

export const deleteProductScehma = object({
  ...params,
});

export type CreateProductInput = TypeOf<typeof createProductSchema>;
export type UpdateProductInput = TypeOf<typeof updateProductScehma>;
export type GetProductInput = TypeOf<typeof getProductScehma>;
export type DeleteProductInput = TypeOf<typeof deleteProductScehma>;
