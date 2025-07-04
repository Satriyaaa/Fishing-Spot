import express from "express";
import TicketsController from "../controllers/TicketsController.js";
import { authenticateToken, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();
router.get("/me", authenticateToken, TicketsController.getMyTickets);
router.post("/", authenticateToken, TicketsController.create);
router.post("/print", authenticateToken, TicketsController.cetakTicket);

router.get(
  "/",
  authenticateToken,
  authorizeRoles("admin", "super_admin"),
  TicketsController.getAll
);
router.get(
  "/:id",
  authenticateToken,
  authorizeRoles("admin", "super_admin"),
  TicketsController.getById
);

export default router;
