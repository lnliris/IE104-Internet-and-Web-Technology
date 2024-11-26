/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState,useEffect } from "react";
import Filmlist from "../components/film_list";
import FilterSearch from "../components/filter-search";
import Header from "../components/header";
import Promolist from "../components/promotion_list";
import { getMoviesInHomepage } from "../api/api";

function contentProductPage(){

    const [movies, setMovies] = useState()
    useEffect(() => {
        
        getMoviesInHomepage()
          .then((data) => {setMovies(data.movies)
          })
          
          .catch((err) => console.log(err));
      }, []);
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