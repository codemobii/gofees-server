import { Schema, model } from "mongoose";

const SchoolSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide an Email!"],
      unique: [true, "Email already exist"],
    },
    phone: {
      type: Number,
      required: [true, "Please provide a Phone number"],
      unique: [true, "Phone number already exist"],
    },
    name: {
      type: String,
      unique: false,
    },
    resetCode: {
      type: Number,
      required: false,
      unique: false,
    },
    token: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model.School || model("School", SchoolSchema);
