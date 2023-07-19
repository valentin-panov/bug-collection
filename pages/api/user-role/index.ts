import { NextApiRequest, NextApiResponse } from "next";
import UserModel from "@models/UserModel";
import connectMongo from "@utils/connectMongo";
import { verifyToken } from "@lib/auth";
import IUser from "@interfaces/IUser";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
const apiUserRole = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    try {
      const token = req.headers.authorization?.substring(7);
      const { _id } = (await verifyToken(token as string)) as unknown as IUser;

      const allowedRoles = ["user", "admin"];
      const { role } = req.body;

      if (!allowedRoles.includes(role)) {
        return res.status(400).json({ message: "Role not allowed" });
      }
      await connectMongo();

      await UserModel.findOneAndUpdate({ _id }, { role });

      res.status(200).json({
        message:
          "User role updated. You must log in again for the changes to take effect.",
      });
    } catch (err) {
      return res.status(400).json({ message: err });
    }
  } else {
    // Handle any other HTTP method
    return res.status(403).json({ message: "Something went wrong." });
  }
};

export default apiUserRole;
