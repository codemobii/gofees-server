import { Schema, model } from "mongoose";

const StudentSchema = new Schema(
  {
    email: {
      type: String,
    },
    phone: {
      type: Number,
    },
    studentId: {
      type: Number,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    token: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    school: {
      type: Schema.Types.ObjectId,
      ref: "School",
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: "Class",
    },
    passport: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model.Student || model("Student", StudentSchema);
