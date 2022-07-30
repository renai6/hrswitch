import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { authentication } from "../../utils/";
import { model } from "../../config/db";

const { generateHashPassword, generateAccessToken } = authentication();

export const createUser = async (req: Request, res: Response) => {
  const { name, email, userName, password } = req.body;

  const user: Prisma.UserCreateInput = {
    email,
    name,
    userName,
    password: await generateHashPassword(password),
  };

  try {
    const createdUser = await model.user.create({
      data: {
        ...user,
      },
    });

    const token = generateAccessToken({
      email: createdUser.email,
      name: createdUser.name,
      userName: createdUser.userName,
      role: createdUser.role,
      createdAt: `${createdUser.createdAt}`,
    });

    return res.status(201).json({ token });
  } catch (error) {
    return res.status(400).json("Error");
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await model.user.findMany({
      select: {
        email: true,
        name: true,
        createdAt: true,
        userName: true,
        role: true,
      },
    });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).json("Error");
  }
};
