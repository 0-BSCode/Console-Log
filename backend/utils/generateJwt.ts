import jwt from "jsonwebtoken";

const generateJwt = (userId: string): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_VALIDITY,
  });
};

export default generateJwt;
