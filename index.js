const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();

const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 6000;

const authRouter = require("./routes/authRoute");
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");



// DATABASE CONNECTIVITY
dbConnect();

// ROUTES   =========================================================
// app.use("/", (req, res) => {
    //   res.send("Saying hello to Rafi, from the SERVER :)");
    // });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/api/user", authRouter);
// ROUTES   =========================================================

// MIDDLEWARES -----------------------------------------------------
app.use(notFound)
app.use(errorHandler)
// MIDDLEWARES -----------------------------------------------------


app.listen(PORT, () => {
  console.log(`Server is Running: ${PORT}`);
});
