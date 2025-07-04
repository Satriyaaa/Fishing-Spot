import express from "express";
import TicketsUsagesRoute from "./routes/TicketUsageRoute.js";
import fishingRoutes from "./routes/FishingSpotRoute.js";
import UsersRoutes from "./routes/UsersRoute.js";
import TicketsRoute from "./routes/TicketsRoute.js";
import PaymentRoute from "./routes/PaymentRoute.js";
import ReviewRoute from "./routes/ReviewRoute.js";
import cors from "cors";

import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerDocument = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../swagger.json"), "utf8")
);

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/fishing", fishingRoutes);
app.use("/api/tickets", TicketsRoute);
app.use("/api/usages", TicketsUsagesRoute);
app.use("/api/users", UsersRoutes);
app.use("/api/payment", PaymentRoute);
app.use("/api/reviews", ReviewRoute);
app.use(
  cors({
    origin: "https://fishing-spot-production.up.railway.app",
  })
);
// Serve Swagger UI di route /api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || "Internal Server Error",
      stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
