import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "@models/UserModel";
import connectMongo from "@utils/connectMongo";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
const apiUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      await connectMongo();

      const users = await UserModel.find()
        .lean()
        .select("_id firstName lastName avatar bio");

      return res.status(200).json({
        users,
      });
    } catch (err) {
      return res.status(400).json({
        message: "There was a problem getting the users",
      });
    }
  } else {
    // Handle any other HTTP method
    return res.status(403).json({ message: "Something went wrong." });
  }
};

export default apiUsers;
