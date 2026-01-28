const OrderRead = require("../models/OrderRead");

async function getOrder(req, res) {
  try {
    const { orderId } = req.params;
    const order = await OrderRead.findOne({ orderId }).lean();

    if (!order) return res.status(404).json({ message: "❌ Order not found" });
    return res.json({ order });
  } catch (err) {
    console.error("GetOrder Error:", err);
    return res.status(500).json({ message: "💥 Internal error" });
  }
}

module.exports = { getOrder };
