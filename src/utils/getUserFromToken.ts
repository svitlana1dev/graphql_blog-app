import JWT from "jsonwebtoken";
require("dotenv").config();

export const getUserFromTheToken = (token: string) => {
  try {
    return JWT.verify(token, `${process.env.JSON_SIGNATURE}`) as {
      userId: number;
    };
  } catch (err) {
    return null;
  }
};
