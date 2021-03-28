import { Schema, model } from "mongoose";

const InvoiceSchema = new Schema(
  {
    school: {
      type: Schema.Types.ObjectId,
      ref: "School",
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    class: {
      type: Schema.Types.ObjectId,
      ref: "Class",
    },
    payment: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
    },
    amount: {
      type: Number,
    },
    status: { type: Boolean, default: false },
    message: { type: String },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model.Invoice || model("Invoice", InvoiceSchema);
