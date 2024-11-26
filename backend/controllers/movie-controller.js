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

