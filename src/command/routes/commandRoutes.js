const express = require("express");
const { createOrder } = require("../handlers/createOrder");

const router = express.Router();

// ✍️ Command endpoint
router.post("/commands/orders", createOrder);

module.exports = router;
