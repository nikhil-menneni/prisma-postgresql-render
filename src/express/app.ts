import express from "express";
import router from "../routes/router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "../utils/auth";
import { createNewUser, signIn } from "../handlers/user";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello" });
});

app.use("/api", protect, router);
app.post("/user", createNewUser);
app.post("/signIn", signIn);

app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).send({ message: "Not authorized" });
  } else if (err.type === "input") {
    res.status(400).send({ message: "Invalid input" });
  } else {
    res.status(500).send({ message: "Internal server error" });
  }
});

export default app;
