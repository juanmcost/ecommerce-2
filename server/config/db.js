const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const client = mongoose
<<<<<<< HEAD
  .connect(process.env.MONGODB_HOST, {
=======
  .connect("mongodb://localhost:27017/ecommerce", {
>>>>>>> back
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((e) => console.log("MongoDB Error: " + e));

module.exports = client;
