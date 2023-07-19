import { Model, Schema, Types } from "mongoose";
import createModel from "./createModel";
import { IInventory } from "@interfaces/IInventory";

interface IInventoryMethods {
  fullName(): string;
}

type InventoryModel = Model<IInventory, {}, IInventoryMethods>;

const inventoryItemModel = new Schema<
  IInventory,
  InventoryModel,
  IInventoryMethods
>({
  user: { type: Types.ObjectId, required: true },
  name: { type: String, required: true },
  itemNumber: { type: String, required: true },
  unitPrice: { type: Number, required: true },
  image: {
    type: String,
    required: true,
    default:
      "https://images.unsplash.com/photo-1580169980114-ccd0babfa840?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9",
  },
});

inventoryItemModel.method("fullName", function fullName() {
  return this.itemNumber + " " + this.name;
});

export default createModel<IInventory, InventoryModel>(
  "inventory-item",
  inventoryItemModel
);

// import { model, models, Schema, Types } from "mongoose";
//
// const inventoryItemModel = new Schema({
//   user: { type: Types.ObjectId, required: true },
//   name: { type: String, required: true },
//   itemNumber: { type: String, required: true },
//   unitPrice: { type: Number, required: true },
//   image: {
//     type: String,
//     required: true,
//     default:
//       "https://images.unsplash.com/photo-1580169980114-ccd0babfa840?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&h=600&fit=crop&ixid=eyJhcHBfaWQiOjF9",
//   },
// });
//
// const InventoryItemModel =
//   models.InventoryItemModel || model("inventory-item", inventoryItemModel);
//
// export default InventoryItemModel;
