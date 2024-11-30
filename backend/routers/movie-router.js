import express from "express"
import { getAllMovies, getSearchMovie, getMoviesInHomepage, addMovie, editMovie, deleteMovie, getMovieDetails } from "../controllers/movie-controller.js";
import { getShowtimes } from "../controllers/showtime-controller.js";
const movieRouter = express.Router();
    movieRouter.get("/",getMoviesInHomepage);
    movieRouter.get("/all",getAllMovies);
    movieRouter.get("/search",getSearchMovie);
    movieRouter.get("/showtime",getShowtimes);
    movieRouter.post("/", addMovie);
    movieRouter.put("/:id", editMovie);
    movieRouter.delete("/:id", deleteMovie);
    movieRouter.get("/:id", getMovieDetails);
export default movieRouter;