  /* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState,useEffect } from "react";
import Filmlist from "../components/film_list";
import { useLocation } from "react-router-dom";  
import FilterSearch from "../components/filter-search";
import Header from "../components/header";
import Promolist from "../components/promotion_list";
import { getMoviesInHomepage, getSearchMovie } from "../api/api";

function contentProductPage(){

    const [movies, setMovies] = useState();
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === "/") {
          // Nếu ở trang chủ, gọi API lấy phim trang chủ
          getMoviesInHomepage()
            .then((data) => {
              setMovies(data.movies);
            })
            .catch((err) => console.log(err));
        } else if (location.pathname === "/search") {
          // Nếu ở trang tìm kiếm, gọi API tìm kiếm phim
          const searchTitle = new URLSearchParams(location.search).get('title');
         
          if (searchTitle) {
            getSearchMovie(searchTitle)
              .then((data) => {
                setMovies(data.results); // Giả sử API trả về một mảng phim
              })
              .catch((err) => console.log(err));
          }
        }
      }, [location]); 
      console.log(movies);    

    const [promo, setPromo] = useState(
        [
            {img:"https://stc.shopiness.vn/deal/2020/10/23/f/e/4/6/1603443370684_540.jpg"},
            {img:"https://stc.shopiness.vn/deal/2020/10/23/f/e/4/6/1603443370684_540.jpg"},
            {img:"https://stc.shopiness.vn/deal/2020/10/23/f/e/4/6/1603443370684_540.jpg"},
            {img:"https://stc.shopiness.vn/deal/2020/10/23/f/e/4/6/1603443370684_540.jpg"}
        ]
    )

    return(        
        <>
            <Header/>
            <FilterSearch
                event={()=>{}}
            />
            <Filmlist
                data={movies}
            />
            <Promolist
                data={promo}
            />
        </>
    );

}

export default contentProductPage;