import mongoose from "mongoose";

let isConnected = false;

const DB = async () => {
  if (!isConnected) {
    await mongoose
      .connect(
        process.env.MONGO_URI ||
          "mongodb+srv://1234:1234@cluster0.slszyct.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
      )
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
