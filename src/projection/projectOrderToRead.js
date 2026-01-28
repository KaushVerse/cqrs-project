const OrderRead = require("../query/models/OrderRead");

async function projectOrderToRead(orderWriteDoc) {
  const order = orderWriteDoc.toObject
    ? orderWriteDoc.toObject()
    : orderWriteDoc;

  const itemCount = order.items.reduce((s, it) => s + it.qty, 0);
  const previewSkus = order.items.slice(0, 5).map((it) => it.sku);

  // Upsert: projection idempotent ✅
  await OrderRead.updateOne(
    { orderId: order.orderId },
    {
      $set: {
        orderId: order.orderId,
        userId: order.userId,
        status: order.status,
        totalAmount: order.totalAmount,
        itemCount,
        previewSkus,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      },
    },
    { upsert: true },
  );
}

module.exports = { projectOrderToRead };
