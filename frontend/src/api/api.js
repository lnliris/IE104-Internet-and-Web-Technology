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
  const res = await axios.get(`${BASE_URL}/seat/${roomId}`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }
  const data = await res.data;
  return data;
};

export const createTicket = async ({ seat_id, showtime_id }) => {
  try {
    // Lấy token từ localStorage hoặc state (nếu cần xác thực)
    const token = localStorage.getItem('token');

    // Kiểm tra nếu không có token
    if (!token) {
      throw new Error("User not authenticated. Token is missing.");
    }

    // Gửi yêu cầu POST lên server để tạo ticket
    const response = await axios.post(
      `${BASE_URL}/tickets`, // Endpoint API cho việc tạo ticket
      { seat_id, showtime_id },  // Payload gửi đi (seat_id và showtime_id)
      {
        headers: {
          Authorization: `Bearer ${token}`, // Đính kèm token trong header
          "Content-Type": "application/json", // Dữ liệu định dạng JSON
        },
      }
    );

    // Trả về dữ liệu từ server
    return response.data;
  } catch (error) {
    console.error("Error creating ticket:", error.response?.data || error.message);
    throw error; // Ném lỗi để component có thể xử lý
  }
};

export const createBooking = async ({ ticket_ids, fandb_items }) => {
  try {
    const token = localStorage.getItem('token');
    console.log('Token:', token);
    if (!token) {
      throw new Error('Token không tồn tại');
    }
    const payload = {
      ticket_ids, 
      fandb_items 
    };
    const response = await axios.post(`${BASE_URL}/bookings`, payload, {
      headers: {
        Authorization: `Bearer ${token}`, // Đính kèm token vào header
        "Content-Type": "application/json" // Định dạng dữ liệu gửi là JSON
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error.response?.data || error.message);
    throw error; 
  }
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

export const getAllTheater = async () => {
  const res = await axios.get(`${BASE_URL}/theater/all`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }
  const data = await res.data;
  return data;
};

export const getAllPromo = async () => {
  const res = await axios.get(`${BASE_URL}/promotion/all`).catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("No Data");
  }
  const data = await res.data;
  return data;
};