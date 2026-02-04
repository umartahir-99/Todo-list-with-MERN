const express = require("express");
const multer = require("multer");
const Todos = require("../models/todos");
const { verifyToken } = require("../middlewares/auth");
const { getRandomId } = require("../config/global");
const { cloudinary } = require("../config/cloudinary");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });
router.post("/create", verifyToken,upload.fields([{name:"image"}]), async (req, res) => {
  try { 
    const formData = req.body;
    let imageURL = "", imagePublicId = ""
    if(req.files["image"] && req.files["image"][0]){
      await new Promise ((resolve, reject)=>{
        const upLoadStream = cloudinary.uploader.upload_stream(
          {folder: "images/"},
          (error, result)=>{
           if(error){return reject(error)}
imageURL = result.secure_url, imagePublicId = result.public_id;
            resolve()

          }
        )

        upLoadStream.end(req.files["image"][0].buffer);
      })
    }
    const { title, dueDate, description, priority } = formData;
    const { uid } = req;
    const id = getRandomId();
    const todoData = { id, uid, title, dueDate, description, priority, imageURL, imagePublicId };
    const todo = new Todos(todoData);
    await todo.save();
    res
      .status(201)
      .json({ message: "A new todo has been successfully created", todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", isError: true });
  }
});

router.get("/all", verifyToken, async (req, res) => {
  try {
    const { uid } = req;
    const todos = await Todos.find({ uid });
    res.status(200).json({ message: "Todos fetched successfully", todos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", isError: true });
  }
});

router.get("/single/:id", verifyToken, async (req, res) => {
  try {
    const { uid } = req;
    const { id } = req.params;
    const todo = await Todos.findOne({ uid, id });
    res.status(200).json({ message: "Todo fetched successfully", todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", isError: true });
  }
});

router.patch("/update", verifyToken, async (req, res) => {
  try {
    const { id, title, dueDate, description, priority, status, isCompleted } =
      req.body;
    const { uid } = req;
    const todoData = {
      id,
      title,
      dueDate,
      description,
      priority,
      status,
      isCompleted,
    };
    const updatedTodo = await Todos.findOneAndUpdate({ uid, id }, todoData, {
      new: true,
    });
    res
      .status(200)
      .json({
        message: "A todo has been successfully updated",
        todo: updatedTodo,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", isError: true });
  }
});

router.delete("/single/:id", verifyToken, async (req, res) => {
  try {
    const { uid } = req;
    const { id } = req.params;
    const todo = await Todos.findOneAndDelete({ uid, id });
    res.status(200).json({ message: "Todo deleted successfully", todo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", isError: true });
  }
});

module.exports = router;
