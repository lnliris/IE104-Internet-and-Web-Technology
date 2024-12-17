import axios from "axios";
const BASE_URL='http://localhost:8081'
export const getMoviesInHomepage = async () => {
  const res = await axios.get(`${BASE_URL}/movie`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }
  const data = await res.data;
  return data;
};

export const getAllMovies = async () => {
  const res = await axios.get(`${BASE_URL}/movie/all`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }
  const data = await res.data;
  return data;
};
export const getSearchMovie = async (title) => {
  const res = await axios.get(`${BASE_URL}/movie/search?title=${title}`).catch((err) => console.log(err));

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
    let url = `${BASE_URL}/movie/${movieId}/showtimes`;
    if (date) {
      url += `?date=${date}`;
    }

    const res = await axios.get(url);

    if (!res || res.status !== 200) {
      console.log("No Data or Failed to fetch");
      return null;
    }

    const data = await res.data;
    console.log("Fetched Showtimes Data:", data); // Debugging line
    return data; // Data sẽ chứa cả roomId
  } catch (error) {
    console.error("Error fetching showtimes:", error);
    return null;
  }
};



export const getPromotionInHompage = async () => {
  const res = await axios.get(`${BASE_URL}/promotion/`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }
  const data = await res.data;
  return data;
};

export const getFoodList =async()=>{
  const res=await axios.get(`${BASE_URL}/food/`).catch((err)=>console.log(err));

  if(res.status !==200) {
    return console.log("No data");
  }
  const data=await res.data;
  return data;
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081/',
  headers: {
      'Content-Type': 'application/json',
  },
});

// Hàm POST để gửi request
export const post = async (url, data, config = {}) => {
 
  const response = await axiosInstance.post(url, data, config);
  return response; // Trả về dữ liệu response từ server
  
};


export const getSeatsByRoom = async (roomId) => {
  const res = await axios.get(`http://localhost:8081/seat/${roomId}`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }
  const data = await res.data;
  return data;
};

export const getMovieDetails = async (movieId) =>{
  const res=await axios.get(`${BASE_URL}/movie/${movieId}`).catch((err) =>console.log(err));

  if (res.status !==200) {
    return console.log('No data')
  }
  const data=await res.data;
  console.log(data)
  return data;
};

export const getCoupons = async ()=>{
  const res = await axios.get(`${BASE_URL}/coupon/`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }
  const data = await res.data;
  console.log(res.data)
  return data;
}

export const checkCoupon = async (title) => {
  try {
    const response = await axios.post(`${BASE_URL}/coupon/check`, { title });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : 'Đã xảy ra lỗi';
  }
};