require("dotenv").config();
const express = require("express");

const cors = require("cors");

const { connectDB } = require("./config/db");
const auth = require("./routes/auth");
const todos = require("./routes/todos");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  const now = new Date().toLocaleString();
  res.send(now);
});

app.get("/health-checked", (req, res) => {
  res.send("Server health is good and nodemon installed");
});
app.use("/auth", auth);
app.use("/todos", todos);



const {PORT = 8000} = process.env;
app.listen(PORT, (req, res) => {
  console.log(`Server is running on ${PORT}`);
});


// Cloud name: 
//    API SECRET
//      API KEY