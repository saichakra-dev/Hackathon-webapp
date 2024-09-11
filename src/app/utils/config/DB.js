import mongoose from "mongoose";

let isConnected = false;

const DB = async () => {
  if (!isConnected) {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => {
        isConnected = true;
        console.log("DB Connected");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export default DB;
