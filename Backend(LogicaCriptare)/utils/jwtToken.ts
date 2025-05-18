import jwt from "jsonwebtoken";
export const generateToken = (userId: string) => {
  if(!process.env['JWT_SECRET']) return null;
  return jwt.sign({ userId }, process.env['JWT_SECRET'], { expiresIn: "1h" });
}