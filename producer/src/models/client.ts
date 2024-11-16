// Third party imports
import { Schema, model } from "mongoose";

const clientSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    logoURL: {
      type: String,
    },
    isCached: {
      type: Boolean,
    },
    // billingCycle: {
    //   type: String,
    //   enum: [],
    // },
  },
  {
    timestamps: {
      createdAt: true,
    },
  }
);
