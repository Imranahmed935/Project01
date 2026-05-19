import { NextFunction, Request, Response } from "express";
import ApiError from "../errors/ApiError";
import httpStatus from "http-status";
import config from "../../config";
import { jwtHelper } from "../helper/jwtHelper";

// const auth = () => {
//   return async (
//     req: Request & { user?: any },
//     res: Response,
//     next: NextFunction,
//   ) => {
//     try {
//       const token = req.cookies.accessToken;
      
//       if (!token) {
//         throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
//       }
//       const verifyUser = jwtHelper.verifyToken(
//         token,
//         config.jwt.jwt_secret as string,
//       );
//       console.log(verifyUser);
//       req.user = verifyUser;

//       // if (roles.length && !roles.includes(verifyUser.role)) {
//       //   throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
//       // }

//       next();
//     } catch (err) {
//       next(err);
//     }
//   };
// };

// export default auth;
const auth = () => {
  return async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const token = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : req.cookies?.accessToken;

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }

      const verifyUser = jwtHelper.verifyToken(token, config.jwt.jwt_secret as string);
      req.user = verifyUser;
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth