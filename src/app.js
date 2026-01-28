const express = require("express");
const commandRoutes = require("./command/routes/commandRoutes");
const queryRoutes = require("./query/routes/queryRoutes");

const app = express();
app.use(express.json());

// Health
app.get("/health", (req, res) => res.json({ ok: true }));

// CQRS routes
app.use(commandRoutes);
app.use(queryRoutes);

module.exports = app;
