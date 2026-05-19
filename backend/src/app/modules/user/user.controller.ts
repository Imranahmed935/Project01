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

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const {email} = req.params;
  const result = await userService.getUserById(email as string);
  sendResponse(res,{
    statusCode:201,
    success:true,
    message:"get single User by email Successfully!!",
    data:result
  })
});


export const userController = {
    registerUser,
    getUserById
}
