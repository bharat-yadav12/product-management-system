import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    metaTitle: {
      type: String,
      required: true,
      trim: true,
      maxlength: 70
    },

    productName: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true
    },

    galleryImages: [
      {
        type: String,
        required: true
      }
    ],

    price: {
      type: Number,
      required: true,
      min: 0
    },

    discountedPrice: {
      type: Number,
      min: 0
    },

    description: {
      type: String,
      required: true
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const Product = mongoose.model("Product", productSchema);
