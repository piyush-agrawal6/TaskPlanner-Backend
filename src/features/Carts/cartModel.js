const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Object,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
    images: {
      type: Array,
    },
  },
  {
    versionKey: false,
  }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
