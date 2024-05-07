import JWT from "jsonwebtoken";
import { JSON_SIGNATURE } from "../keys";

export const getUserFromTheToken = (token: string) => {
  try {
    return JWT.verify(token, JSON_SIGNATURE) as {
      userId: number;
    };
  } catch (err) {
    return null;
  }
};
