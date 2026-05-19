import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { authService } from "./auth.service";


const getMe = catchAsync(async (req: Request, res: Response) => {
    const userSession = req.cookies;
    console.log(userSession, "watch 44")
    const result = await authService.getMe(userSession);

    sendResponse(res, {
        statusCode:200,
        success: true,
        message: "User retrive successfully!",
        data: result,
    });
});



const login = catchAsync(async (req: Request, res: Response) => {
    const result = await authService.login(req.body);
    const { accessToken, refreshToken } = result;

    res.cookie("accessToken", accessToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 7
    })
    res.cookie("refreshToken", refreshToken, {
        secure: true,
        httpOnly: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24 * 90
    })

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "loggedIn successfully!",
        data:{
            accessToken,
            refreshToken
        }
    })
})


export const authController = {
    login,
    getMe
}