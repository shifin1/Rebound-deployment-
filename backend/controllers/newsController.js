import axios from "axios";
import asyncHandler from "express-async-handler";

// @desc   Get news articles
// @route  GET /api/news
// @access Public

const getNews = asyncHandler(async (req, res) => {
  const options = {
    method: "GET",
    url: "https://nba-latest-news.p.rapidapi.com/articles?limit=50",
    headers: {
      "X-RapidAPI-Key": process.env.RAPID_API_KEY,
      "X-RapidAPI-Host": "nba-latest-news.p.rapidapi.com",
    },
  };

  await axios
    .request(options)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      res.json({ message: error.message });
    });
});

export { getNews };
