const mongoose = require("mongoose");

const OrderWriteSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true, index: true },
    userId: { type: String, index: true },
    items: [
      {
        sku: String,
        qty: Number,
        price: Number,
      },
    ],
    totalAmount: Number,
    status: {
      type: String,
      enum: ["CREATED", "CANCELLED"],
      default: "CREATED",
    },

    // 🔁 Idempotency support (optional but recommended)
    idemKey: { type: String, unique: true, sparse: true, index: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("OrderWrite", OrderWriteSchema);
