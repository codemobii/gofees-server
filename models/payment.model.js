import { Schema, model } from "mongoose";

const PaymentSchema = new Schema(
  {
    school: {
      type: Schema.Types.ObjectId,
      ref: "School",
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
    fee: {
      type: Schema.Types.ObjectId,
      ref: "Fee",
    },
    paid: {
      type: Number,
    },
    amount: {
      type: Number,
    },
    next: {
      type: Number,
    },
    status: { type: Boolean, default: false },
    invoices: [{ type: Schema.Types.ObjectId, ref: "Invoice" }],
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default model.Payment || model("Payment", PaymentSchema);
