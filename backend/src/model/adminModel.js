import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

const adminModel = new mongoose.model("admin", adminSchema);
export default userModel;

// {
//     "fullName": "John Doe",
//     "email": "john.doe@example.com",
//     "password": "password123"
//   }