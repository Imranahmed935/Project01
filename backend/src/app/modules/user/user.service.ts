import bcrypt from "bcryptjs";
import { Request } from "express";
import { prisma } from "../../shared/prisma";
import config from "../../../config";

const registerUser = async (req: Request) => {
  const { fullName, email, password } = req.body;
  const saltRounds = Number(config.salt)
  const hashPassword = await bcrypt.hash(password, saltRounds);
  const user = await prisma.user.create({
    data: {
      fullName: fullName,
      email: email.toLowerCase(),
      password: hashPassword,
    },
  });
  return user;
};

const getUserById = async (email:string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });
  return user;
};


export const userService = {
  registerUser,
  getUserById
};
