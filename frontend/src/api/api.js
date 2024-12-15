import axios from "axios";
export const getMoviesInHomepage = async () => {
  const res = await axios.get("http://localhost:8081/movie").catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }
  const data = await res.data;
  return data;
};

export const getSearchMovie = async (title) => {
  const res = await axios.get(`http://localhost:8081/movie/search?title=${title}`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }
 
  const data = await res.data;
  return data;
};