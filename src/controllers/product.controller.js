import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

/**
 * CREATE PRODUCT (with image upload)
 */
export const createProduct = asyncHandler(async (req, res) => {
  const {
    metaTitle,
    productName,
    slug,
    price,
    discountedPrice,
    description
  } = req.body;

  // multer puts files on req.files
  if (!req.files || req.files.length === 0) {
    throw new ApiError(400, "At least one product image is required");
  }

  // upload images to cloudinary
  const galleryImages = [];

  for (const file of req.files) {
    console.log("file.path is ",file.path)
    const cloudinaryResponse = await uploadOnCloudinary(file.path);

    if (!cloudinaryResponse) {
      throw new ApiError(500, "Image upload failed");
    }

    galleryImages.push(cloudinaryResponse.secure_url);
  }

  const product = await Product.create({
    metaTitle,
    productName,
    slug,
    galleryImages,
    price,
    discountedPrice,
    description,
    createdBy: req.user._id
  });

  return res
    .status(201)
    .json(new ApiResponse(201, product, "Product created successfully"));
});

/**
 * GET ALL PRODUCTS
 */
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .populate("createdBy", "username email")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));
});

/**
 * GET PRODUCT BY SLUG
 */
export const getProductBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const product = await Product.findOne({ slug })
    .populate("createdBy", "username email");

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, product, "Product fetched successfully"));
});

/**
 * UPDATE PRODUCT
 * (supports updating images OR only text fields)
 */
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  let updatedImages = product.galleryImages;

  // If new images are uploaded, replace old ones
  if (req.files && req.files.length > 0) {
    updatedImages = [];

    for (const file of req.files) {
      const cloudinaryResponse = await uploadOnCloudinary(file.path);

      if (!cloudinaryResponse) {
        throw new ApiError(500, "Image upload failed");
      }

      updatedImages.push(cloudinaryResponse.secure_url);
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      $set: {
        ...req.body,
        galleryImages: updatedImages
      }
    },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedProduct, "Product updated successfully"));
});

/**
 * DELETE PRODUCT
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  // NOTE:
  // We are not deleting images from Cloudinary here.
  // In real apps, you'd store public_id and delete them.

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Product deleted successfully"));
});
