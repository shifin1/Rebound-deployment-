import * as dotenv from "dotenv";
dotenv.config();
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/dbConn.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import morgan from "morgan";
import userRoutes from "./routes/userRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const __dirname = path.resolve();

app.use("/api/users", userRoutes);
app.use("/api/teams", teamRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running.....");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(
      `server is running on port ${PORT} on ${process.env.NODE_ENV} mode`
    );
  });
});
