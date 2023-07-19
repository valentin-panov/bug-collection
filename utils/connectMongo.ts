import mongoose from "mongoose";

const connectMongo = async (msg?: string) => {
  try {
    console.log("CONNECTING TO MONGO", msg ? `. Message: ${msg}` : "");
    mongoose.Promise = global.Promise;
    await mongoose.connect(process.env.ATLAS_URL as string, {
      autoIndex: true,
    });
    console.log("CONNECTED TO MONGO");
  } catch (err) {
    console.log("Mongoose error", err);
  }
};

export default connectMongo;
