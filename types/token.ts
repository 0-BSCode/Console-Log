import { JwtPayload } from "jsonwebtoken";
export interface JwtToken extends JwtPayload {
  id: string;
}
