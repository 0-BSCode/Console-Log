import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import prisma from "utils/initializePrisma";

export type Context = {
  prisma: PrismaClient;
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
