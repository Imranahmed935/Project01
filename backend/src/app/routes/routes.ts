import express from "express";
import { userRouter } from "../modules/user/user.route";
import { authRouter } from "../modules/auth/auth.route";
import { BoardRouter } from "../modules/board/board.route";


const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/board",
    route: BoardRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
