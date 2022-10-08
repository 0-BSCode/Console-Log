import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import { JwtToken } from "types/token";
import prisma from "utils/initializePrisma";

const authenticateUser = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<JwtToken> => {
  const { token } = req.cookies;

  const verified = jwt.verify(token, process.env.JWT_SECRET) as JwtToken;

  console.log("AUTHENTICATE USER CALLED");
  if (verified.exp * 1000 < new Date().getTime())
    throw new Error(`SESSION EXPIRED`);

  const user = await prisma.user.findFirst({
    where: { id: verified.id },
  });

  if (!user) throw new Error(`USER DOES NOT EXIST`);

  return verified;
};

export default authenticateUser;
