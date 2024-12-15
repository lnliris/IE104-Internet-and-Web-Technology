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