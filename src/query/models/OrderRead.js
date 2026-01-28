const mongoose = require("mongoose");

const OrderReadSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true, index: true },
    userId: { type: String, index: true },

    // 📌 Read-optimized fields
    status: String,
    totalAmount: Number,
    itemCount: Number,

    // Optional denormalized: quick UI rendering
    previewSkus: [String],

    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: false }, // we store timestamps ourselves from write model
);

module.exports = mongoose.model("OrderRead", OrderReadSchema);
