import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { BoardService } from "./board.service";
import { JWTPayload } from "../../types/common";

const createBoard = catchAsync(
  async (req: Request & { user?: JWTPayload }, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new Error("User not found");
    }
    console.log(req.body)
    const result = await BoardService.createBoard(req.body, userId as string);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Board created successfully",
      data: result,
    });
  },
);


const getBoardByUserId = catchAsync(
  async (req: Request & { user?: JWTPayload }, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new Error("User not found");
    }
    console.log(req.body)
    const result = await BoardService.getBoardByUserId(userId as string);
    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: "Board Retrive successfully",
      data: result,
    });
  },
);

export const BoardController = {
  createBoard,
  getBoardByUserId
};
