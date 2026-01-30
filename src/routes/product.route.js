import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createProduct,
  getAllProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";
import {
  createProductSchema,
  updateProductSchema
} from "../validations/product.validation.js";

const router = Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:slug", getProductBySlug);

// Protected routes
router.post(
  "/",
  verifyJWT,
  upload.array("galleryImages", 5),
  validateRequest(createProductSchema),
  createProduct
);

router.patch(
  "/:id",
  verifyJWT,
  upload.array("galleryImages", 5),
  validateRequest(updateProductSchema),
  updateProduct
);

router.delete("/:id", verifyJWT, deleteProduct);

export default router;
