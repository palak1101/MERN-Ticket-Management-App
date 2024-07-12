import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: [true, 'Please add an username'] },
    password: { type: String, required: [true, 'Please add password'] },
    email: { type: String, required: [true, 'Please add an email'] },
    mobileNumber: { type: String, default: ""},
    company: { type: String, default: ""},
    role: { type: String, default: ""},
  },

  
  { timestamps: true }
);

const userModel = new mongoose.model("users", userSchema);
export default userModel;