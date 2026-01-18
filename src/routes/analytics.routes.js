import express from "express";
import fs from "fs";

const router = express.Router();
const DB_PATH = "./db.json";

const readDB = () => JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));

/* ALL ORDERS */
router.get("/allorders", (req, res) => {
  const db = readDB();
  const orders = [];

  db.orders.forEach(o => orders.push(o));

  res.json({ count: orders.length, orders });
});

/* CANCELLED ORDERS */
router.get("/cancelled-orders", (req, res) => {
  const db = readDB();
  const cancelled = db.orders.filter(o => o.status === "cancelled");

  res.json({ count: cancelled.length, orders: cancelled });
});

/* SHIPPED ORDERS */
router.get("/shipped", (req, res) => {
  const db = readDB();
  const shipped = db.orders.filter(o => o.status === "shipped");

  res.json({ count: shipped.length, orders: shipped });
});

/* TOTAL REVENUE BY PRODUCT */
router.get("/total-revenue/:productId", (req, res) => {
  const db = readDB();
  const product = db.products.find(p => p.id == req.params.productId);
  if (!product) return res.status(404).json({ error: "Product not found" });

  const revenue = db.orders
    .filter(o => o.productId == product.id && o.status !== "cancelled")
    .reduce((sum, o) => sum + o.quantity * product.price, 0);

  res.json({ productId: product.id, totalRevenue: revenue });
});

/* OVERALL REVENUE */
router.get("/alltotalrevenue", (req, res) => {
  const db = readDB();

  const revenue = db.orders
    .filter(o => o.status !== "cancelled")
    .reduce((sum, o) => {
      const product = db.products.find(p => p.id === o.productId);
      return sum + (product.price * o.quantity);
    }, 0);

  res.json({ totalRevenue: revenue });
});

export default router;
