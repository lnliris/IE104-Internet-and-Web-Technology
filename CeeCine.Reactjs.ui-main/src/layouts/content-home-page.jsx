/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from "react";
import Filmlist from "../components/film_list";
import FilterSearch from "../components/filter-search";
import Header from "../components/header";
import Promolist from "../components/promotion_list";

function contentProductPage(){

    const [films, setFilm] = useState([
        {
            id:1,
            img:"https://m.media-amazon.com/images/M/MV5BZDMyYWU4NzItZDY0MC00ODE2LTkyYTMtMzNkNDdmYmFhZDg0XkEyXkFqcGc@._V1_.jpg",
            type:"Action, Thriller",
            length:"180",
            title:"VENOM"
        },
        {
            id:2,
            img:"https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg",
            type:"Action, Thriller",
            length:"180",
            title:"Avenger: Endgame"
        },
        {
            id:2,
            img:"https://m.media-amazon.com/images/M/MV5BZDMyYWU4NzItZDY0MC00ODE2LTkyYTMtMzNkNDdmYmFhZDg0XkEyXkFqcGc@._V1_.jpg",
            type:"Action, Thriller",
            length:"180",
            title:"VENOM"
        },
        {
            id:2,
            img:"https://m.media-amazon.com/images/M/MV5BZDMyYWU4NzItZDY0MC00ODE2LTkyYTMtMzNkNDdmYmFhZDg0XkEyXkFqcGc@._V1_.jpg",
            type:"Action, Thriller",
            length:"180",
            title:"VENOM"
        },
        {
            id:2,
            img:"https://m.media-amazon.com/images/M/MV5BZDMyYWU4NzItZDY0MC00ODE2LTkyYTMtMzNkNDdmYmFhZDg0XkEyXkFqcGc@._V1_.jpg",
            type:"Action, Thriller",
            length:"180",
            title:"VENOM"
        },
        {
            id:2,
            img:"https://m.media-amazon.com/images/M/MV5BZDMyYWU4NzItZDY0MC00ODE2LTkyYTMtMzNkNDdmYmFhZDg0XkEyXkFqcGc@._V1_.jpg",
            type:"Action, Thriller",
            length:"180",
            title:"VENOM"
        },
        
        
    ]);

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
                data={films}
            />
            <Promolist
                data={promo}
            />
        </>
    );

}

export default contentProductPage;