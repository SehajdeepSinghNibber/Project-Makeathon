import mongoose from "mongoose";

export default async function ConnectDB() {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/fundlens", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    console.log("The connection to mongo has been successful.");
  }
  catch (e) {
    console.log("This error occured when connecting to MOngo: ", e);
  }
}
