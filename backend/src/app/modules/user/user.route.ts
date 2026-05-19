import express from "express"
import { userController } from "./user.controller"
const router = express.Router()

router.get("/:email", userController.getUserById);
router.post("/register", userController.registerUser);

export const userRouter = router;