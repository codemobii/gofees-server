import { Schema, model } from "mongoose";

const ClassSchema = new Schema(
  {
    school: {
      type: Schema.Types.ObjectId,
      ref: "School",
    },
    name: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model.Class || model("Class", ClassSchema);
