import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    images:[
        {
            type: String,
            required: [false, "Images is required"],
        }
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true } // Adds createdAt & updatedAt automatically
);

// Prevent model re-compilation issues in Next.js
export default mongoose.models.Schema || mongoose.model("Schema", Schema);