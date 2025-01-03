import { Router } from "express";
import { protect } from "../utils/auth";
import { body, oneOf, param, query, validationResult } from "express-validator";
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
router.get("/product/:id", param("id").isString(), getProduct);
router.post("/product", body("name").isString(), createProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  validateInput,
  updateProduct
);
router.delete("/product/:id", param("id").isString(), deleteProduct);

//UPDATES
router.get("/updates", () => {});
router.get("/update/:id", param("id").isString(), () => {});
router.put(
  "/update/:id",
  param("id").isString(),
  body("title").isString(),
  body("body").isString(),
  body("status")
    .isIn(validStatus)
    .withMessage(`valid status must be one of ${validStatus.join(",")}`),
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
router.delete("/update/:id", param("id").isString(), () => {});

//UPDATE POINTS
router.get("/updatepoints", () => {});
router.get("/updatepoint/:id", param("id").isString(), () => {});
router.put(
  "/updatepoint/:id",
  body("name").isString(),
  body("description").isString(),
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
router.delete("/updatepoint/:id", param("id").isString(), () => {});

export default router;
