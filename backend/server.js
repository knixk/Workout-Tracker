require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

// express app
const app = express();
const PORT = process.env.PORT;

const workoutRoutes = require("./routes/workouts");

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("mongo connected..");
    // listen for reqs
    app.listen(PORT, () => {
      console.log("listening on port " + PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
