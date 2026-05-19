import { prisma } from "../../shared/prisma";
import { BoardPayload } from "../../types/common";

const createBoard = async (payload: BoardPayload, userId: string) => {
  const { unitName, tagline } = payload;
  console.log(payload)
  const result = await prisma.board.create({
    data: {
      unitName,
      tagline,
      userId,
    },
  });
  return result;
};

const getBoardByUserId = async (userId: string) => {
  console.log(userId)
  const result = await prisma.board.findFirst({
    where:{
      userId
    }
  });
  return result;
};

export const BoardService = {
  createBoard,
  getBoardByUserId
};
