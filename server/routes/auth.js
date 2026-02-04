const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../models/auth");
const { verifyToken } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const user = await Users.findOne({ email });
    if (user) {
      return res
        .status(401)
        .json({ message: "Email is already in use", isError: true });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const uid =
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);

    const newUserData = { uid, fullName, email, password: hashedPassword };
    const newUser = new Users(newUserData);
    await newUser.save();

    delete newUser.password;

    res
      .status(201)
      .json({
        message: "A new user has been successfully created",
        user: newUser,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", isError: true });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid email or password", isError: true });
    }

    const match = await bcrypt.compare(password, user.password);
    console.log("match", match);

    if (match) {
      const { uid } = user;

      const token = jwt.sign({ uid }, "secretkey", { expiresIn: "1d" });

      res.status(200).json({ message: "Login successful", token });
    } else {
      return res
        .status(401)
        .json({ message: "Invalid email or password", isError: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", isError: true });
  }
});

router.get("/user", verifyToken, async (req, res) => {
  try {
    const { uid } = req;

    const user = await Users.findOne({ uid }).select("-password").exec();
    if (!user) {
      return res.status(401).json({ message: "User not found", isError: true });
    }

    res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", isError: true });
  }
});

router.patch("/user-update", verifyToken, async (req, res) => {
  try {
    const { uid } = req;
    const { fullName } = req.body;

    const user = await Users.findOne({ uid });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized or User not found", isError: true });
    }

    const updatedUser = Users.findOneAndUpdate({ uid }, { fullName });
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", isError: true });
  }
});
router.delete("/delete-user", verifyToken, async (req, res) => {
  try {
    const { uid } = req;

    const user = await Users.findOne({ uid });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized or User not found", isError: true });
    }

    const deletedUser = Users.findOneAndDelete({ uid });
    res.status(200).json({ message: "User ", user: deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", isError: true });
  }
});

module.exports = router;
