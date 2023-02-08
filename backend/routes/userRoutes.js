import {
  authUser,
  registerUser,
  getUsers,
} from "../controllers/userController.js"
import express from "express"
import { protect, admin } from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/login", authUser)
router.post("/register", registerUser)

router.route("/").get(protect, admin, getUsers)

export default router
