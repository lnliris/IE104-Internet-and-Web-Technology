/* eslint-disable no-unused-vars */
import FilmListFuture from "../components/film-list-future";
import FilmListNow from "../components/film-list-now";
import FimlPosterSlide from "../components/film_poster_slide";
import { useState } from "react";

function ContentFilmList(){

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
            id:3,
            img:"https://m.media-amazon.com/images/M/MV5BZDMyYWU4NzItZDY0MC00ODE2LTkyYTMtMzNkNDdmYmFhZDg0XkEyXkFqcGc@._V1_.jpg",
            type:"Action, Thriller",
            length:"180",
            title:"VENOM"
        },
        {
            id:4,
            img:"https://m.media-amazon.com/images/M/MV5BZDMyYWU4NzItZDY0MC00ODE2LTkyYTMtMzNkNDdmYmFhZDg0XkEyXkFqcGc@._V1_.jpg",
            type:"Action, Thriller",
            length:"180",
            title:"VENOM"
        },
        {
            id:5,
            img:"https://m.media-amazon.com/images/M/MV5BZDMyYWU4NzItZDY0MC00ODE2LTkyYTMtMzNkNDdmYmFhZDg0XkEyXkFqcGc@._V1_.jpg",
            type:"Action, Thriller",
            length:"180",
            title:"VENOM"
        },
        {
            id:6,
            img:"https://m.media-amazon.com/images/M/MV5BZDMyYWU4NzItZDY0MC00ODE2LTkyYTMtMzNkNDdmYmFhZDg0XkEyXkFqcGc@._V1_.jpg",
            type:"Action, Thriller",
            length:"180",
            title:"VENOM"
        },
        
        
    ]);

    return(
        <>
            <FimlPosterSlide/>
            <FilmListFuture data={films}/>
            <FilmListNow data={films}/>
        </>
       
    );

}

export default ContentFilmList;