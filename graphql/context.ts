import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";
import prisma from "utils/initializePrisma";

export type Context = {
  prisma: PrismaClient;
  currentUser?: User;
};

export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}): Promise<Context> {
  return {
    prisma,
  };
}
