import mongoose from "mongoose";

const DB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://1234:1234@cluster0.slszyct.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
      console.log("DB Connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
export default DB;
