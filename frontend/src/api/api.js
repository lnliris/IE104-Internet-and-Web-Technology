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

export const getShowtimeAndTheaterInfo = async (movieId, date = null) => {
  if (!movieId) {
    console.log("Movie ID is required");
    return null;
  }

  try {
    let url = `http://localhost:8081/movie/${movieId}/showtimes`;
    if (date) {
      url += `?date=${date}`;
    }

    const res = await axios.get(url);

    if (!res || res.status !== 200) {
      console.log("No Data or Failed to fetch");
      return null;
    }

    const data = await res.data;
    return data;
  } catch (error) {
    console.error("Error fetching showtimes:", error);
    return null;
  }
};


export const getPromotionInHompage = async () => {
  const res = await axios.get("http://localhost:8081/promotion/").catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }
  const data = await res.data;
  return data;
};

export const getFoodList =async()=>{
  const res=await axios.get("http://localhost:8081/food/").catch((err)=>console.log(err));

  if(res.status !==200) {
    return console.log("No data");
  }
  const data=await res.data;
  return data;
}

export const getSeatsByRoom = async (roomId) => {
  const res = await axios.get(`http://localhost:8081/seat/${roomId}`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }
  const data = await res.data;
  return data;
};
