import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { JwtToken } from "types/token";
import { serialize } from "cookie";

const authenticateUser = async (
  req: NextApiRequest,
  res: NextApiResponse,
  prisma: PrismaClient
): Promise<JwtToken> => {
  try {
    const { token } = req.cookies;

    const verified = jwt.verify(token, process.env.JWT_SECRET) as JwtToken;

    if (verified.exp * 1000 < new Date().getTime())
      throw new Error(`SESSION EXPIRED`);

    const user = await prisma.user.findFirst({
      where: { id: verified.id },
    });

    if (!user) {
      res.setHeader(
        "Set-Cookie",
        serialize("token", "", { path: "/", maxAge: -1 })
      );

      throw new Error(`USER DOES NOT EXIST`);
    }

    return verified;
  } catch (e) {
    console.error(e);
  }
};

export default authenticateUser;
