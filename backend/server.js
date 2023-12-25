const express = require("express");
const dotenv = require("dotenv").config();
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const goalRoutes = require("./routes/goalRoutes");
const connectDb = require("./config/db");
const PORT = process.env.PORT || 5000;

connectDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", goalRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
