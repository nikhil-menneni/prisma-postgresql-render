import express from "express";
import router from "../Routes/router";
import morgan from "morgan";
import cors from "cors";
import { protect } from "../utils/auth";
import { createNewUser, signIn } from "../handlers/user";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello" });
});

app.use("/api", protect, router);
app.post("/user", createNewUser);
app.post("/signIn", signIn);

export default app;
