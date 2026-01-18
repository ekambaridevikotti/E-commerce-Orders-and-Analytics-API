import express from "express";
import fs from "fs";

const router = express.Router();
const DB_PATH = "./db.json";

const readDB = () => JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
const writeDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

router.get("/", (req, res) => {
  const db = readDB();
  res.status(200).json(db.products);
});

export default router;
