import { Schema, model } from "mongoose";

const WalletSchema = new Schema(
  {
    school: {
      type: Schema.Types.ObjectId,
      ref: "School",
    },
    public_key: {
      type: String,
    },
    _token: {
      type: String,
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

export default model.Wallet || model("Wallet", WalletSchema);
