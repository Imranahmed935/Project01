import express from "express";
import { BoardController } from "./board.controller";
import auth from "../../middleware/auth";


const router = express.Router();

router.get("/", auth(), BoardController.getBoardByUserId);
router.post("/create", auth(), BoardController.createBoard);


export const BoardRouter = router;