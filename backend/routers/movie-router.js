import express from "express"
import { getAllMovies, getSearchMovie, getMoviesInHomepage } from "../controllers/movie-controller.js";
import { getShowtimes } from "../controllers/showtime-controller.js";
const movieRouter = express.Router();
    movieRouter.get("/",getMoviesInHomepage);
    movieRouter.get("/search",getSearchMovie);
    movieRouter.get("/showtime",getShowtimes);
export default movieRouter;