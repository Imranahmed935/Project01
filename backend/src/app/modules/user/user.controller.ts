import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { userService } from "./user.service";

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.registerUser(req);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Account Created Successfully!!",
    data: result,
  });
});


export const userController = {
    registerUser
}
