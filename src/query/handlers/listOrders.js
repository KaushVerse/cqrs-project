const OrderRead = require("../models/OrderRead");

async function listOrders(req, res) {
  try {
    const { userId } = req.query;
    const filter = userId ? { userId } : {};

    const orders = await OrderRead.find(filter)
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return res.json({ count: orders.length, orders });
  } catch (err) {
    console.error("ListOrders Error:", err);
    return res.status(500).json({ message: "💥 Internal error" });
  }
}

module.exports = { listOrders };
