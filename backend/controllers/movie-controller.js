import Movie from "../models/movie-model.js";

export const getAllMovies = async (req, res, next) => {
    let movies;
  
    try {
      movies = await Movie.find();
    } catch (err) {
      return console.log(err);
    }
  
    if (!movies) {
      return res.status(500).json({ message: "Request Failed" });
    }
    return res.status(200).json({ movies });
  };
  
  export const getMoviesInHomepage = async (req, res, next) => { 
    let movies;
  
    try {
      // Sử dụng phương thức limit(6) để lấy chỉ 6 bộ phim đầu tiên
      movies = await Movie.find().limit(6);
    } catch (err) {
      return console.log(err);
    }
  
    if (!movies || movies.length === 0) {
      return res.status(500).json({ message: "Request Failed" });
    }
  
    // Trả về dữ liệu với 6 bộ phim đầu tiên
    return res.status(200).json({ movies });
  };

export const getMovieById = async (req, res, next) => {
  const id = req.params.id;
  let movie;
  try {
    movie = await Movie.findById(id);
  } catch (err) {
    return console.log(err);
  }

  if (!movie) {
    return res.status(404).json({ message: "Invalid Movie ID" });
  }

  return res.status(200).json({ movie });
};


export const getSearchMovie = async (req, res, next) => {
  const { title, genre } = req.query;

  // Xây dựng đối tượng truy vấn dựa trên các tham số đã nhập
  let query = {};

  if (title) {
    query.title = { $regex: title, $options: "i" }; // $regex cho tìm kiếm không phân biệt chữ hoa/chữ thường
  }
  if (genre) {
    query.genre = { $regex: genre, $options: "i" };
  }
  
  let results;
  try {
    results = await Movie.find(query); // Tìm kiếm phim dựa trên đối tượng truy vấn
  } catch (err) {
    return res.status(500).json({ message: "Lỗi khi tìm kiếm phim" });
  }

  if (!results || results.length === 0) {
    return res.status(404).json({ message: "Không tìm thấy phim phù hợp" });
  }

  return res.status(200).json({ results });
};

export const addMovie = async (req, res, next) => { 
  const { title, description, duration, genre, rating, limit_age, poster_url, release_date } = req.body;

  if (
    !title || title.trim() === "" ||
    !description || description.trim() === "" ||
    !duration || duration.trim() === "" ||
    !genre || genre.trim() === "" ||
    !rating || rating.trim() === "" ||
    !limit_age || isNaN(limit_age) ||
    !poster_url || poster_url.trim() === "" ||
    !release_date
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let movie;
  try {
    movie = new Movie({
      title,
      description,
      duration,
      genre,
      rating,
      limit_age,
      poster_url,
      release_date: new Date(release_date), 
    });

    await movie.save();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to add movie", error: err.message });
  }

  return res.status(201).json({ message: "Movie added successfully", movie });
};

export const editMovie = async (req, res, next) => {
  // Lấy id từ params
  const movieId = req.params.id;

  // Lấy dữ liệu chỉnh sửa từ body
  const { title, description, duration, genre, rating, limit_age, poster_url, release_date } = req.body;

  // Kiểm tra xem dữ liệu body có hợp lệ không
  if (
    !title || title.trim() === "" ||
    !description || description.trim() === "" ||
    !duration || duration.trim() === "" ||
    !genre || genre.trim() === "" ||
    !rating || rating.trim() === "" ||
    !limit_age || isNaN(limit_age) ||
    !poster_url || poster_url.trim() === "" ||
    !release_date
  ) {
    return res.status(422).json({ message: "Invalid Inputs" });
  }

  let updatedMovie;
  try {
    updatedMovie = await Movie.findByIdAndUpdate(
      movieId,
      {
        title,
        description,
        duration,
        genre,
        rating,
        limit_age,
        poster_url,
        release_date: new Date(release_date), 
      },
      { new: true } 
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to update movie", error: err.message });
  }

  if (!updatedMovie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  return res.status(200).json({ message: "Movie updated successfully", movie: updatedMovie });
};

export const deleteMovie = async (req, res, next) => {
 
  const movieId = req.params.id;

  let deletedMovie;
  try {
    
    deletedMovie = await Movie.findByIdAndDelete(movieId);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Failed to delete movie", error: err.message });
  }

  if (!deletedMovie) {
    return res.status(404).json({ message: "Movie not found" });
  }

  return res.status(200).json({ message: "Movie deleted successfully", movie: deletedMovie });
};