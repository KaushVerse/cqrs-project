require("dotenv").config();
const app = require("./app");
const { connectDB } = require("./config/db");

async function main() {
  await connectDB(process.env.MONGODB_URI);

  const port = process.env.PORT || 8080;
  app.listen(port, () =>
    console.log(`🚀 Server running on http://localhost:${port}`),
  );
}

main().catch((e) => {
  console.error("💥 Fatal:", e);
  process.exit(1);
});
