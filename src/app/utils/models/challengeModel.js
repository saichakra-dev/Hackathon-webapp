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
    StartDate: {
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

const challengeModel =
  mongoose.models.challenge || mongoose.model("challenge", ChallengeSchema);

export default challengeModel;
