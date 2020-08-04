require("dotenv").config();
import express from "express";
import multerConfig from "./config/multer";
import path from "path";

const app = express();

app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "tmp", "uploads"))
);

app.get("/", (req, res) => {
  console.log("health");
  res.send({ status: "online " });
});

app.post("/uploadImage", multerConfig.single("file"), (req, res) => {
  console.log(req.file);
  return res.send(`${process.env.APP_URL}/files/${req.file.filename}`);
});

app.listen(3001);
