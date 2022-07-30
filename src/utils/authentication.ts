import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

interface UserState {
  email: string;
  name: string;
  userName: string;
  role: string;
  createdAt: string;
}

export const authentication = () => {
  const generateHashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  };

  const generateAccessToken = (payload: UserState) => {
    return jwt.sign(payload, process.env.TOKEN_SECRET as string, {
      expiresIn: "3h",
    });
  };

  return {
    generateHashPassword,
    generateAccessToken,
  };
};
