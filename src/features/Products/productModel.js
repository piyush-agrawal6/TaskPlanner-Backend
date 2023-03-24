const mongoose = require("mongoose");
const { Schema } = mongoose;
const productSchema = new mongoose.Schema(
  {
    images: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: Array,
      required: true,
    },
    sizes: {
      type: Array,
      required: true,
    },
    shapes: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      maxLength: 6,
    },
    off_price: {
      type: Number,
      required: true,
      maxLength: 6,
    },
    discount: {
      type: Number,
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: String,
      required: true,
    },
    gst: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
