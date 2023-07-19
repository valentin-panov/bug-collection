import type { NextApiResponse } from "next";

const handler = async (res: NextApiResponse) => {
  return res.status(403).json({ status: "invalid csrf token" });
};
export default handler;
