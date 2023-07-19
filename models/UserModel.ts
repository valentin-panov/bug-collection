import { Model, Schema } from "mongoose";
import createModel from "./createModel";
import IUser from "@interfaces/IUser";

interface IUserMethods {
  fullName(): string;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: "user" },
  bio: { type: String, required: false },
  avatar: { type: String, required: false },
});

userSchema.method("fullName", function fullName() {
  return this.first_name + " " + this.last_name;
});

export default createModel<IUser, UserModel>("user", userSchema);

// import { model, models, Schema } from "mongoose";
//
// const userModel = new Schema({
//   firstName: { type: String, required: true },
//   lastName: { type: String, required: true },
//   email: { type: String, required: true },
//   password: { type: String, required: true },
//   role: { type: String, required: true, default: "user" },
//   bio: { type: String, required: false },
// });
//
// const UserModel = models.UserModel || model("user", userModel);
//
// export default UserModel;
