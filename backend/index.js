import dotenv from "dotenv";
import connectDB from "./db/db.js";
import { app } from "./app.js";
dotenv.config({
  path: "./.env",
});

// DB connection
connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error: ", error);
      throw error;
    });
    app.listen(process.env.PORT || 5000, () => {
      console.log("App is listening on port: ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
