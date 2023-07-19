import { NextApiRequest, NextApiResponse } from "next";
import data from "@data/dashboard";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
const apiDashboard = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return res.status(200).json(data);
  } else {
    return res.status(403).json({ message: "Something went wrong." });
  }
};

export default apiDashboard;
