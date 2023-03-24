const Cart = require("./cartModel");
const express = require("express");
const { isAuthenticated } = require("../../middleware/auth");
const app = express.Router();

app.get("/", async (req, res) => {
  const { userId } = req.query;
  try {
    const carts = await Cart.find({ userId });
    return res.status(200).send({ message: carts });
  } catch (error) {
    return res.status(404).send({ message: "error" });
  }
});

app.post("/", async (req, res) => {
  try {
    const cart = await Cart.create(req.body);
    return res.status(201).send({ message: `Product Added Successfully` });
  } catch (error) {
    return res.send({ message: "Something went wrong" });
  }
});

app.put("/", async (req, res) => {
  try {
    const { id, userId, quantity } = req.body;
    const cartItem = await Cart.findById(id);

    if (cartItem && cartItem.userId.toString() === userId) {
      const cart = await Cart.findByIdAndUpdate(
        id,
        { userId, productId: cartItem.productId, quantity },
        { new: true }
      )
        .populate("productId")
        .select("-userId");
      return res.status(200).send({ message: "Cart updated successfully" });
    } else {
      return res.status(404).send({ message: "Item does not exist in cart" });
    }
  } catch (error) {
    return res.status(404).send({ message: "Something went wrong" });
  }
});

app.delete("/", async (req, res) => {
  try {
    const { id, userId } = req.body;
    const cartItem = await Cart.findById(id);
    if (cartItem && cartItem.userId.toString() === userId) {
      const cart = await Cart.findByIdAndDelete(id)
        .populate("productId")
        .select("-userId");
      return res
        .status(200)
        .send({ message: `Deleted the product from cart successfully` });
    } else {
      return res.status(404).send({ message: "Item does not exist in cart" });
    }
  } catch (error) {
    return res.status(404).send({ message: "Something went wrong" });
  }
});

module.exports = app;
