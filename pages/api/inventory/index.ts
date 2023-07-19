import { NextApiRequest, NextApiResponse } from "next";
import InventoryItemModel from "@models/InventoryItemModel";
import connectMongo from "@utils/connectMongo";
import { verifyToken } from "@lib/auth";
import IUser from "@interfaces/IUser";

/**
 * @param {import("next").NextApiRequest} req
 * @param {import("next").NextApiResponse} res
 */
const apiInventory = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const token = req.headers.authorization?.substring(7);
      const { _id } = (await verifyToken(token as string)) as unknown as IUser;

      await connectMongo("GET from inventory api");

      const inventoryItems = await InventoryItemModel.find({
        user: _id,
      });
      res.status(200).json(inventoryItems);
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  } else if (req.method === "POST") {
    try {
      const token = req.headers.authorization?.substring(7);
      const { _id } = (await verifyToken(token as string)) as unknown as IUser;
      await connectMongo();

      const input = Object.assign({}, req.body, {
        user: _id,
      });
      const inventoryItem = new InventoryItemModel(input);
      await inventoryItem.save();
      res.status(201).json({
        message: "Inventory item created!",
        inventoryItem,
      });
    } catch (err) {
      return res.status(400).json({
        message: "There was a problem creating the item",
      });
    }
  } else {
    // Handle any other HTTP method
    return res.status(403).json({ message: "Something went wrong." });
  }
};

export default apiInventory;
