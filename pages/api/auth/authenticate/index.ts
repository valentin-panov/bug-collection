import { NextApiRequest, NextApiResponse } from "next";
import { verifyPassword } from "@utils/passwordTools";
import { connectMongo } from "@utils/index";
import UserModel from "@models/UserModel";
import IUser from "@interfaces/IUser";
import { createTokens } from "@lib/auth";

export const config = {
  runtime: "nodejs",
};

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
const authenticate = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;

      await connectMongo();

      const user: IUser = await UserModel.findOne({
        email,
      }).lean();

      if (!user) {
        return res.status(403).json({
          message: "Wrong email or password.",
        });
      }

      const passwordValid = await verifyPassword(
        password,
        user.password as string
      );

      if (passwordValid) {
        const { password, bio, avatar, ...rest } = user;
        const userInfo = Object.assign({}, { ...rest });

        return createTokens(res, userInfo).then(({ res, expiresAt, token }) =>
          res.status(200).json({
            message: "Authentication successful!",
            token,
            userInfo,
            expiresAt,
          })
        );
      } else {
        return res.status(403).json({
          message: "Wrong email or password.",
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        message: "Authentication failed.",
      });
    }
  } else {
    return res.status(403).json({ message: "Something went wrong." });
  }
};

export default authenticate;
