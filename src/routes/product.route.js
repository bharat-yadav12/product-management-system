import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createProduct,
  getAllProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  getProductById
} from "../controllers/product.controller.js";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validateRequest } from "../middlewares/validateRequest.middleware.js";
import {
  createProductSchema,
  updateProductSchema
} from "../validations/product.validation.js";

const router = Router();
router.use(verifyJWT);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/:slug", getProductBySlug);

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

