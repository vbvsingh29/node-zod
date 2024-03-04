import { AnyZodObject } from "zod";
import { Request, Response, NextFunction } from "express";
const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e: any) {
      res.status(500).send(e.errors);
    }
  };

export default validateResource;