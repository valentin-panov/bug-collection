import IUser from "./IUser";

export interface IInventory {
  user: IUser;
  name: string;
  itemNumber: string;
  unitPrice: number;
  image: string;
}
