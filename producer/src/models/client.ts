// Third party imports
import { Schema, model } from "mongoose";

interface ClientI {
  name: string;
  keys: string[];
  logoURL: string;
  // isStore: boolean;
}

const clientSchema = new Schema<ClientI>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    keys: {
      type: [String],
      required: true,
      unique: true,
    },
    logoURL: {
      type: String,
      trim: true,
    },
    // isStore: {
    //   type: Boolean,
    //   default: false,
    // },
    // billingCycle: {
    //   type: String,
    //   enum: [],
    // },
  },
  {
    timestamps: { createdAt: true, updatedAt: true },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Client = model("clients", clientSchema);

export default Client;

