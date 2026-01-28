# 🚀 CQRS Order Service (Node.js + MongoDB)

A **Command Query Responsibility Segregation (CQRS)** based backend service
built with **Node.js, Express, MongoDB**, and **Docker**.

This project demonstrates **real-world backend patterns** like:
- Command / Query separation
- Idempotent APIs
- Write & Read models
- Projection layer
- Dockerized setup

Perfect for **learning, interviews, and production-ready architecture demos**.

---

## ✨ Why this project exists (Best Use Case)

This project is designed to show **how real scalable systems work**:

✅ Avoids mixing reads & writes  
✅ Safe retries using **Idempotency-Key**  
✅ Easy to scale read & write separately  
✅ Clean separation of responsibilities  
✅ Ready for async events (Kafka / RabbitMQ)

> This pattern is used in **e-commerce, payments, order systems, fintech apps**.

---

## 🏗️ Project Architecture (CQRS)

Client
|
|── Command API (Write)
| └── OrderWrite (Mongo)
| ↓
| Projection
| ↓
|── Query API (Read)
└── OrderRead (Mongo)


---

## 📂 Folder Structure

src/
config/
db.js
command/
models/OrderWrite.js
handlers/createOrder.js
routes/commandRoutes.js
query/
models/OrderRead.js
handlers/getOrder.js
handlers/listOrders.js
routes/queryRoutes.js
projection/
projectOrderToRead.js
app.js
server.js

.env
Dockerfile
docker-compose.yml


---

## ⚙️ Tech Stack

- Node.js
- Express
- MongoDB
- Zod (validation)
- NanoID (ID generation)
- Docker & Docker Compose

---

## 🔐 Idempotency (Important Feature)

This API supports **safe retries** using:
Idempotency-Key


Same request + same key = **no duplicate orders** 🚫  
Very important for **payments & order systems**.

---

## ▶️ Running Project (Without Docker)

### 1️⃣ Install dependencies
```bash
npm install
2️⃣ Start MongoDB locally
mongod
3️⃣ Create .env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/cqrs_demo
4️⃣ Start server
node src/server.js
Server will run at:

http://localhost:3000
🐳 Running Project (Using Docker) ✅ Recommended
1️⃣ Start Docker containers
docker compose up -d --build
2️⃣ Check running containers
docker ps
3️⃣ View logs
docker logs cqrs-api
Expected logs:

✅ MongoDB connected
🚀 Server running on port 3000
🧪 API Testing (Postman)
➕ Create Order (Command)
POST /commands/orders
Headers:

Content-Type: application/json
Idempotency-Key: order-001
Body:

{
  "userId": "user_123",
  "items": [
    { "sku": "sku_mouse", "qty": 2, "price": 599 }
  ]
}
📖 Get Order (Query)
GET /queries/orders/:orderId
📃 List Orders (Query)
GET /queries/orders
🗂️ Database Collections
Collection	Purpose
order_writes	Command (write model)
order_reads	Query (read model / projection)
🖥️ MongoDB GUI (Optional)
MongoDB Compass

mongodb://localhost:27017
Or browser GUI (mongo-express if enabled)

http://127.0.0.1:8081
🧠 Key Learnings from this Project
CQRS pattern in practice

Idempotent API design

MongoDB write vs read models

Dockerizing Node.js apps

Clean scalable backend structure

🚀 Future Improvements
Async projection using RabbitMQ / Kafka

Separate read & write databases

Event sourcing

Authentication & authorization

Kubernetes deployment

👨‍💻 Author
Built with ❤️ by Kaush
For learning, interviews, and real-world backend mastery.

⭐ Final Note
If you are learning system design, backend engineering, or microservices
this project is a must-have in your portfolio 💯


---

Bro honestly —  
👉 **Ye README recruiter + senior dev dono ko impress karega** 😎  

Agar bole to next:
- README me **architecture diagram**
- Swagger / OpenAPI docs
- CI/CD GitHub Actions
- Production hardening notes
