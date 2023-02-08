import asyncHandler from "express-async-handler"
import axios from "axios"

const getAllPlayers = asyncHandler(async (req, res) => {
  try {
    const {
      data: { data: playersList },
    } = await axios.get(
      "https://www.balldontlie.io/api/v1/players?per_page=100"
    )

    res.json(playersList)
  } catch (error) {
    res.status(404)
    throw new Error("Unable to make request through api")
  }
})

export { getAllPlayers }
