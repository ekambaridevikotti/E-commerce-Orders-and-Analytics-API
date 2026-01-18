import express from "express";
import fs from "fs";

const router = express.Router();
const DB_PATH = "./db.json";

const readDB = () => JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
const writeDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

const today = () => new Date().toISOString().split("T")[0];

/* CREATE ORDER */
router.post("/", (req, res) => {
  const { productId, quantity } = req.body;
  const db = readDB();

  const product = db.products.find(p => p.id === productId);
  if (!product) return res.status(404).json({ error: "Product not found" });

  if (product.stock === 0 || quantity > product.stock) {
    return res.status(400).json({ error: "Insufficient stock" });
  }

  const totalAmount = product.price * quantity;

  const newOrder = {
    id: Date.now(),
    productId,
    quantity,
    totalAmount,
    status: "placed",
    createdAt: today()
  };

  product.stock -= quantity;
  db.orders.push(newOrder);

  writeDB(db);
  res.status(201).json(newOrder);
});

/* GET ALL ORDERS */
router.get("/", (req, res) => {
  const db = readDB();
  res.status(200).json(db.orders);
});

/* CANCEL ORDER */
router.delete("/:orderId", (req, res) => {
  const db = readDB();
  const order = db.orders.find(o => o.id == req.params.orderId);

  if (!order) return res.status(404).json({ error: "Order not found" });
  if (order.status === "cancelled") {
    return res.status(400).json({ error: "Order already cancelled" });
  }
  if (order.createdAt !== today()) {
    return res.status(400).json({ error: "Cancellation not allowed" });
  }

  order.status = "cancelled";

  const product = db.products.find(p => p.id === order.productId);
  product.stock += order.quantity;

  writeDB(db);
  res.status(200).json({ message: "Order cancelled successfully" });
});

/* CHANGE STATUS */
router.patch("/change-status/:orderId", (req, res) => {
  const { status } = req.body;
  const db = readDB();
  const order = db.orders.find(o => o.id == req.params.orderId);

  if (!order) return res.status(404).json({ error: "Order not found" });
  if (order.status === "cancelled" || order.status === "delivered") {
    return res.status(400).json({ error: "Status change not allowed" });
  }

  const validFlow = {
    placed: "shipped",
    shipped: "delivered"
  };

  if (validFlow[order.status] !== status) {
    return res.status(400).json({ error: "Invalid status flow" });
  }

  order.status = status;
  writeDB(db);

  res.status(200).json(order);
});

export default router;
