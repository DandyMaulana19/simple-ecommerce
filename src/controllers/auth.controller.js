import prisma from "../prisma/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { successResponse, errorResponse } from "../utils/reponse";
import cookieOptions from "../utils/cookieOptions";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const existedEmail = await prisma.user.findUnique({ where: email });
  if (existedEmail)
    return errorResponse(res, "Email allready in used", null, 400);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return successResponse(res, "Register Success", {
    id: user.id,
    name: user.name,
    email: user.email,
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return errorResponse(res, "User not Found", null, 401);

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return errorResponse(res, "Email/Password wrong", null, 401);

  const token = await jwt.sign({ id: user.id }, JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie(token, "token", cookieOptions(req));

  return successResponse(res, "Login Success", {
    userId: user.id,
    email: email,
    token: token,
  });
};
export const logout = async (req, res) => {
  res.clearCookie("token", {
    ...cookieOptions(req),
    maxAge: undefined,
  });
  return successResponse(res, "Logout Success");
};
