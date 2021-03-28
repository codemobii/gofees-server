import { Schema, model } from "mongoose";

const FeeSchema = new Schema(
  {
    school: {
      type: Schema.Types.ObjectId,
      ref: "School",
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: "Class",
    },
    amount: {
      type: Number,
    },
    chunks: [{ type: Number }],
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model.Fee || model("Fee", FeeSchema);
