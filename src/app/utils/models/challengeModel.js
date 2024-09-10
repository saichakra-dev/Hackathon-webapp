import mongoose from "mongoose";

const ChallengeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    StartData: {
      type: Date,
      required: true,
    },
    EndDate: {
      type: Date,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const challengeModel = mongoose.model("challenge", ChallengeSchema);

export default challengeModel;
