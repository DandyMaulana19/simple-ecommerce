export const cookieOptions = (req) => {
  const isProduction = process.env.NODE_ENV === "Production";

  return {
    httpOnly: true,
    secure: isProduction && req.hostname !== "localhost",
    sameSite: "Strict",
    path: "/",
    maxAge: 24 * 60 * 60 * 1000,
  };
};
