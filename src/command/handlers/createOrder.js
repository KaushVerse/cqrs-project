const { z } = require("zod");
const { nanoid } = require("nanoid");
const OrderWrite = require("../models/OrderWrite");
const { projectOrderToRead } = require("../../projection/projectOrderToRead");

const CreateOrderSchema = z.object({
  userId: z.string().min(1),
  items: z
    .array(
      z.object({
        sku: z.string().min(1),
        qty: z.number().int().positive(),
        price: z.number().positive(),
      }),
    )
    .min(1),
});

function calcTotal(items) {
  return items.reduce((sum, it) => sum + it.qty * it.price, 0);
}

async function createOrder(req, res) {
  try {
    const idemKey = req.header("Idempotency-Key") || null;

    // ✅ Validate command payload
    const payload = CreateOrderSchema.parse(req.body);

    // 🔁 If idemKey exists, return same result for retries
    if (idemKey) {
      const existing = await OrderWrite.findOne({ idemKey }).lean();
      if (existing) {
        return res.status(200).json({
          message:
            "🔁 Duplicate request (idempotent replay). Returning existing order.",
          orderId: existing.orderId,
        });
      }
    }

    const orderId = `ord_${nanoid(10)}`;
    const totalAmount = calcTotal(payload.items);

    // ✅ Write to command store
    const order = await OrderWrite.create({
      orderId,
      userId: payload.userId,
      items: payload.items,
      totalAmount,
      status: "CREATED",
      idemKey,
    });

    // 📌 CQRS: Update read model via projection (sync for demo)
    // Real world: event -> queue -> async projection
    await projectOrderToRead(order);

    return res.status(201).json({
      message: "✅ Order created",
      orderId,
    });
  } catch (err) {
    // Zod validation errors
    if (err?.issues) {
      return res
        .status(400)
        .json({ message: "❌ Validation failed", issues: err.issues });
    }

    // Mongo duplicate key (idempotency/orderId conflicts)
    if (err?.code === 11000) {
      return res
        .status(409)
        .json({ message: "⚠️ Duplicate key conflict", details: err.keyValue });
    }

    console.error("CreateOrder Error:", err);
    return res.status(500).json({ message: "💥 Internal error" });
  }
}

module.exports = { createOrder };
