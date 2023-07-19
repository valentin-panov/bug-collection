import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "@models/UserModel";
import { connectMongo } from "@utils/index";
import { verifyToken } from "@lib/auth";
import IUser from "@interfaces/IUser";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
const apiBio = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const token =
        req.cookies["access-token"] || req.headers.authorization?.substring(7);
      const { _id } = (await verifyToken(token as string)) as unknown as IUser;
      await connectMongo();

      const user = await UserModel.findOne({
        _id,
      })
        .lean()
        .select("bio");

      return res.status(200).json({
        bio: user?.bio,
      });
    } catch (err) {
      return res.status(400).json({
        message: "There was a problem fetching your bio",
      });
    }
  } else if (req.method === "PATCH") {
    try {
      const token =
        req.cookies["access-token"] || req.headers.authorization?.substring(7);

      const { _id } = (await verifyToken(token as string)) as unknown as IUser;
      await connectMongo();

      const { bio } = req.body.bio;
      const updatedUser = await UserModel.findOneAndUpdate(
        {
          _id,
        },
        {
          bio,
        },
        {
          new: true,
        }
      );

      return res.status(200).json({
        message: "Bio updated!",
        bio: updatedUser?.bio,
      });
    } catch (err) {
      return res.status(400).json({
        message: "There was a problem updating your bio",
      });
    }
  } else {
    // Handle any other HTTP method
    return res.status(403).json({ message: "Something went wrong." });
  }
};

export default apiBio;
