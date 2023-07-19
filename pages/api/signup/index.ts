import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "@utils/passwordTools";
import UserModel from "@models/UserModel";
import connectMongo from "utils/connectMongo";
import { createTokens } from "@lib/auth";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
const signup = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { email, firstName, lastName } = req.body;

      const hashedPassword = await hashPassword(req.body.password);

      const userData = {
        email: email.toLowerCase(),
        firstName,
        lastName,
        password: hashedPassword,
        role: "admin",
      };

      await connectMongo();

      const existingEmail = await UserModel.findOne({
        email: userData.email,
      }).lean();

      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const newUser = new UserModel(userData);
      const savedUser = await newUser.save();

      if (savedUser) {
        const { firstName, lastName, email, role } = savedUser;

        const userInfo = {
          firstName,
          lastName,
          email,
          role,
        };

        return createTokens(res, userInfo).then(({ res, expiresAt, token }) =>
          res.status(200).json({
            message: "User created!",
            token,
            userInfo,
            expiresAt,
          })
        );
      } else {
        return res.status(400).json({
          message: "There was a problem creating your account",
        });
      }
    } catch (err) {
      return res.status(400).json({
        message: "There was a problem creating your account",
      });
    }
  } else {
    // Handle any other HTTP method
    return res.status(403).json({ message: "Something went wrong." });
  }
};

export default signup;
