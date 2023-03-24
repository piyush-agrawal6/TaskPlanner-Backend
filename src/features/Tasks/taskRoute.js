const Task = require("./taskModel");
const User = require("../Users/userModel");
const express = require("express");
const app = express.Router();

app.get("/", async (req, res) => {
  const { organization } = req.query;
  try {
    const tasks = await Task.find({ organization });
    return res.status(200).send({ Tasks: tasks });
  } catch (error) {
    return res.status(404).send({ message: "error" });
  }
});

app.post("/", async (req, res) => {
  let { id } = req.body;
  let user = await User.findOne({ _id: id });
  try {
    const task = await Task.create({ ...req.body, assignee: user });
    return res.status(201).send({ message: `Task Added Successfully`, task });
  } catch (error) {
    return res.send({ message: "Something went wrong" });
  }
});

// app.put("/", async (req, res) => {
//   try {
//     const { id, userId, quantity } = req.body;
//     const cartItem = await Cart.findById(id);
//     if (cartItem && cartItem.userId.toString() === userId) {
//       const cart = await Cart.findByIdAndUpdate(
//         id,
//         { userId, productId: cartItem.productId, quantity },
//         { new: true }
//       )
//         .populate("productId")
//         .select("-userId");
//       return res.status(200).send({ message: "Cart updated successfully" });
//     } else {
//       return res.status(404).send({ message: "Item does not exist in cart" });
//     }
//   } catch (error) {
//     return res.status(404).send({ message: "Something went wrong" });
//   }
// });

app.delete("/delete", async (req, res) => {
  try {
    const id = req.query.id;
    const sprintItem = await Task.findById(id);
    if (sprintItem) {
      await Task.findByIdAndDelete(id);
      return res.status(200).send({ message: `Task deleted successfully` });
    } else {
      return res.send({ message: "Task does not exist in sprint list" });
    }
  } catch (error) {
    return res.status(404).send({ message: error });
  }
});

module.exports = app;
