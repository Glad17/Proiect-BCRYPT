import { Request, Response } from "express";
import { generateVerificationCode } from "../utils/generateCode.js";
import { generateToken } from "../utils/jwtToken.js";
import User from "../database/schemas/user.schema.js"
import bcrypt from "bcrypt";
import crypto from "crypto";

export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password, name } = req.body ?? {};
    if (!email || !password || !name) {
      return res.status(400).send({ success: false, message: "All the inputs are necessary!" });
    }
    // const salt = crypto.randomBytes(16).toString("hex");
    const salt = await bcrypt.genSalt(14);
    const hashPassword = await bcrypt.hash(password, salt);

    const verificationCode = generateVerificationCode(8);

    const user = await User.create({
      email,
      password: hashPassword,
      name,
      verification: {
        theCode: verificationCode,
        isVerified: false
      }
    });
    if (!user) {
      return res.status(400).send({ success: false, message: "User already exists!" });
    }
    const { password: _password, forgetPasswordObject: _forgottenPasswordObject, ...userWithoutSensitiveData } = user.toJSON();
    return res.status(200).send({ success: true, message: "User created successfully!", User: userWithoutSensitiveData });
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
  console.log('test3');
}
export const verifyUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { code } = req.body;
    const user = await User.findOne({ verification: { theCode: code, isVerified: false } });
    if (!user) {
      return res.status(400).send({ success: false, message: "Invalid code!" });
    }

    await user.update({ verification: { theCode: null, isVerified: true } });
    return res
      .status(200)
      .cookie("jwt", generateToken(user._id.toString()), { httpOnly: true, maxAge: 1 * 60 * 60 * 1000, secure: process.env['NODE_ENV'] === "production" })
      .send({ success: true, message: "User verified successfully!" });

  }
  catch {
    return res.status(500).send({ success: false, message: "Something wrong happened!" });
  }
}
export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) {
      return res.status(400).send({ success: false, message: "All the inputs are necessary!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ success: false, message: "User not found!" });
    }
    if (user.verification) {
      // Check if the user is verified - I need to check if token expired if expired I need to generate a new one
      if (!user.verification.isVerified) {
        return res.status(400).send({ success: false, message: "User not verified!" });
      }
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ success: false, message: "Invalid credentials!" });
    }
    const { password: _password, verification: _verificationCode, ...userWithoutSensitiveData } = user.toJSON();
    return res
      .cookie("jwt", generateToken(user._id.toString()), { httpOnly: true, maxAge: 1 * 60 * 60 * 1000, secure: process.env['NODE_ENV'] === "production",domain:"localhost" })
      .status(200)
      .send({ success: true, message: "User logged in successfully!", User: userWithoutSensitiveData });
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
}
export const userMe = async (req: Request, res: Response): Promise<any> => {
  try {

    const id = req.params['userId'];
    if (!id) {
      return res.status(400).send({ success: false, message: "User not found!" });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).send({ success: false, message: "User not found!" });
    }
    return res.status(200).send({ success: true, message: "User logged in successfully!", User: user });
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(500).send(error.message);
    }
  }
}
export const logout = async (req: Request, res: Response): Promise<any> => {
  try {
    const cookie = await req.cookies['jwt'];
    if (!cookie) {
      return res.status(400).send({ success: false, message: "User not logged in!" });
    }
    res.clearCookie('jwt');
    return res.status(200).send({ success: true, message: "User logged out successfully!" });
  }
  catch {
    res.status(500).send({ success: false, message: "Something wrong happened!" });
  }
}
export const forgotPassword = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({ success: false, message: "All the inputs are necessary!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ success: false, message: "User not found!" });
    }
    const forgetPasswordToken = crypto.randomBytes(32).toString("hex");
    user.forgetPasswordObject = {
      forgetPasswordToken,
      forgetPasswordExpires: new Date(Date.now() + 15 * 60 * 1000)
    }

    await user.save();
    return res.status(200).send({ success: true, message: "Password reset link sent!", forgetPasswordToken: forgetPasswordToken });
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
}
export const resetPassword = async (req: Request, res: Response): Promise<any> => {
  try {
    const { password } = req.body;
    const forgetPasswordToken = req.params['token'];

    if (!password || !forgetPasswordToken) {
      return res.status(400).send({ success: false, message: "All the inputs are necessary!" });
    }

    const user = await User.findOne({ 'forgetPasswordObject.forgetPasswordToken': forgetPasswordToken, 'forgetPasswordObject.forgetPasswordExpires': { $gt: Date.now() } });
    if (!user) {
      return res.status(400).send({ success: false, message: "User not found or token expired!" });
    }

    const salt = await bcrypt.genSalt(14);
    const hashPassword = await bcrypt.hash(password, salt);
    user.password = hashPassword;
    await user.save();
    return res.status(200).send({ success: true, message: "Password updated successfully!" });
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
}

export const resendVerificationCode = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).send({ success: false, message: "All the inputs are necessary!" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ success: false, message: "User not found!" });
    }
    if (user.verification?.isVerified) {
      return res.status(400).send({ success: false, message: "User already verified!" });
    }
    const verificationCode = generateVerificationCode();
    if (!user.verification) {
      user.verification = {
        theCode: "",
        isVerified: false
      };
    }
    user.verification.theCode = verificationCode; 
    await user.save();
    return res.status(200).send({ success: true, message: "Verification code sent!", verificationCode: verificationCode });
  }
  catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).send(error.message);
    }
  }
}