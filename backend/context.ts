import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import prisma from "./utils/initializePrisma";
import { JwtToken } from "types/token";
import authenticateUser from "./utils/authenticateUser";

export type Context = {
  req: NextApiRequest;
  res: NextApiResponse;
  prisma: PrismaClient;
  currentUser?: () => Promise<JwtToken>;
};

export async function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}): Promise<Context> {
  return {
    req,
    res,
    prisma,
    currentUser: () => authenticateUser(req, res, prisma),
  };
}
