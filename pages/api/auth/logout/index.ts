import { NextApiRequest, NextApiResponse } from "next";
import { expireTokenCookieInResponse } from "@lib/auth";

export const config = {
  runtime: "nodejs",
};

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      return expireTokenCookieInResponse(res).then((res: NextApiResponse) =>
        res.status(200).json({
          message: "Logout successful!",
        })
      );
    } catch (e) {
      console.error(e);
    }
  } else {
    return res.status(403).json({ message: "Something went wrong." });
  }
};

export default logout;
