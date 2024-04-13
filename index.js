const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();

const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 6000;

const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");

// DATABASE CONNECTIVITY
dbConnect();

// ROUTES   ======================================================
// app.use("/", (req, res) => {
//   res.send("Saying hello to Rafi, from the SERVER :)");
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);
// ROUTES   =======================================================

// MIDDLEWARES ----------------------------------------------------
app.use(notFound);
app.use(errorHandler);
// MIDDLEWARES ----------------------------------------------------

app.listen(PORT, () => {
  console.log(`Server is Running: ${PORT}`);
});
