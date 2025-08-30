import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true }, // Added phone
  password: { type: String, required: true },
});

export default mongoose.model("User", userSchema);
