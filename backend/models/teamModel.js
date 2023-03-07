import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const teamSchema = mongoose.Schema({
  team_key: {
    type: Number,
    required: true,
    unique: true,
  },
  team_name: {
    type: String,
    required: true,
  },
  team_logo: {
    type: String,
  },
  reviews: [reviewSchema],
});

const Team = mongoose.model("Team", teamSchema);

export default Team;
