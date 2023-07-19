export type TUserRole = "admin" | "user";

export default interface IUser {
  _id?: string;
  avatar: string;
  firstName: string;
  lastName: string;
  email: string;
  role: TUserRole;
  password?: string;
  bio?: string;
}
