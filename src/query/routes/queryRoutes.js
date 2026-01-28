const express = require("express");
const { getOrder } = require("../handlers/getOrder");
const { listOrders } = require("../handlers/listOrders");

const router = express.Router();

// 🔍 Query endpoints
router.get("/queries/orders/:orderId", getOrder);
router.get("/queries/orders", listOrders);

module.exports = router;
