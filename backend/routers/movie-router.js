import express from "express"
import { getAllMovies, getSearchMovie, getMoviesInHomepage, addMovie, editMovie, deleteMovie, getMovieDetails } from "../controllers/movie-controller.js";
import { getShowtimeByMovieId, editShowtime, deleteShowtime} from "../controllers/showtime-controller.js";
const movieRouter = express.Router();
    movieRouter.get("/",getMoviesInHomepage);
    movieRouter.get("/all",getAllMovies);
    movieRouter.get("/search",getSearchMovie);
    movieRouter.post("/", addMovie);
    movieRouter.put("/:id", editMovie);
    movieRouter.delete("/:id", deleteMovie);
    movieRouter.get("/:id", getMovieDetails);
    movieRouter.get("/:id/showtimes",getShowtimeByMovieId);
    movieRouter.put("/:id/showtimes/:showtimeId",editShowtime);
    movieRouter.delete("/:id/showtimes/:showtimeId",deleteShowtime);
export default movieRouter;