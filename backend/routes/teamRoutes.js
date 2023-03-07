import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createTeamReview,
  getTeamById,
  getAllTeams,
  getTeamLogo,
} from "../controllers/teamController.js";

const router = express.Router();

router.get("/", getAllTeams);
router.get("/:teamId", getTeamById);
router.get("/:teamId/logo", getTeamLogo);
router.route("/:teamId/review").post(protect, createTeamReview);

export default router;
