import bcrypt from "bcryptjs";
import { prisma } from "../../shared/prisma";
import ApiError from "../../errors/ApiError";
import { jwtHelper } from "../../helper/jwtHelper";
import config from "../../../config";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";


const getMe = async (cookies: any) => {
  const accessToken = cookies?.accessToken;
  console.log(accessToken,"watch 2")

  if (!accessToken) {
    throw new ApiError(401, "Access Token not found");
  }

  const decodedData = jwtHelper.verifyToken(
    accessToken,
    config.jwt.jwt_secret as Secret
  );

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
    },
  });

  return userData;
};

const login = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      email: payload.email,
    },
  });

  const checkPass = await bcrypt.compare(payload.password, user.password);
  if (!checkPass) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Password is incorrect!");
  }

  const accessToken = jwtHelper.generateToken(
    { email: user.email, id: user.id },
    config.jwt.jwt_secret as string,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelper.generateToken(
    { email: user.email },
    config.jwt.refresh_token_secret as string,
    config.jwt.refresh_token_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

export const authService = {
  login,
  getMe
};