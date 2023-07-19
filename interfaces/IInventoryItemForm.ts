import { IItem } from "@interfaces/IItem";

export interface IInventoryItemForm {
  onSubmit: (
    values: TInventoryItemInitialValues,
    arg1: () => void
  ) => Promise<void>;
}

export type TInventoryItemInitialValues = Pick<
  IItem,
  "name" | "itemNumber" | "unitPrice"
>;
