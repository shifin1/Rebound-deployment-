import asyncHandler from "express-async-handler";
import Team from "../models/teamModel.js";

const getTeamById = asyncHandler(async (req, res) => {
  const { teamId } = req.params;

  const team = await Team.findOne({ team_key: teamId });

  if (team) {
    res.json({
      name: team.team_name,
      logo: team.team_logo,
      reviews: team.reviews,
    });
  } else {
    res.status(401);
    throw new Error(`Team with the id ${teamId} not found`);
  }
});

const createTeamReview = asyncHandler(async (req, res) => {
  const { comment } = req.body;

  const team = await Team.findOne({ team_key: req.params.teamId });

  if (team) {
    const alreadyReviewed = team.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Already Reviewed!");
    }

    const review = {
      name: req.user.name,
      comment,
      user: req.user._id,
    };

    team.reviews.push(review);

    await team.save();
    res.status(201).json({ message: "review added" });
  } else {
    res.status(401);
    throw new Error("Team not found");
  }
});

const getAllTeams = asyncHandler(async (req, res) => {
  const teams = await Team.find({});

  if (teams) {
    res.json(teams);
  } else {
    res.status(404);
    throw new Error("Not Found");
  }
});

const getTeamLogo = asyncHandler(async (req, res) => {
  const teamId = req.params.teamId;
  const team = await Team.findOne({ team_key: teamId });

  if (team) {
    res.send(team.team_logo);
  } else {
    res.status(404);
    throw new Error("Team not Found");
  }
});

export { getTeamById, createTeamReview, getAllTeams, getTeamLogo };
