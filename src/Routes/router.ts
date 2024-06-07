import { Router } from "express";
import { protect } from "../utils/auth";
import { body, oneOf, validationResult } from "express-validator";
import { validateInput } from "../utils/validator";
import { validStatus } from "../constants/constant";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../handlers/product";

const router = Router();

//PRODUCTS
router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.put(
  "/product/:id",
  body("name").optional().isString(),
  validateInput,
  updateProduct
);
router.post("/product", body("name").isString(), createProduct);
router.delete("/product/:id", deleteProduct);

//UPDATES
router.get("/updates", () => {});
router.get("/update/:id", () => {});
router.put(
  "/update/:id",
  body("title").optional().isString(),
  body("body").optional().isString(),
  body("status")
    .isIn(validStatus)
    .withMessage(`valid status must be one of ${validStatus.join(",")}`)
    .optional(),
  body("version").optional().isString(),
  validateInput,
  () => {}
);
router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  body("productId").exists().isString(),
  validateInput,
  () => {}
);
router.delete("/update/:id", () => {});

//UPDATE POINTS
router.get("/updatepoints", () => {});
router.get("/updatepoint/:id", () => {});
router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  validateInput,
  () => {}
);
router.post(
  "/updatepoint",
  body("name").exists().isString(),
  body("description").exists().isString(),
  body("updateId").exists().isString(),
  validateInput,
  () => {}
);
router.delete("/updatepoint/:id", () => {});

export default router;
