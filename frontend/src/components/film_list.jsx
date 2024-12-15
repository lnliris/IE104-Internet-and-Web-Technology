import { useNavigate } from "react-router";
import Product from "./product";

function Filmlist(prop){
    const nav = useNavigate();

    var orderFilm   = function(){
        nav("/order");
        window.location.reload()
    }

    return(
        <section className="mt-50">
        <div className="center_ul" id="btn_type_film_list">
            <button className="btn_cus btn-file-time-cate" id="film_now"><p className="text_upper">Phim đang chiếu</p></button>
            <button className="btn_cus btn-file-time-cate" id="film_futu"><p className="text_upper">Phim sắp chiếu</p></button>
        </div>
        <div className="center_ul" id="wrap-product-list">
            <div className="center_ul" id="product-list">
            <div className="wrap-nodata hide"></div>
            {prop.data ? prop.data.map((d) => (
                    <Product
                        key={d.id}
                        clickEvent = {()=>{}}
                        orderFilm={orderFilm}
                        id={d.id}
                        img={d.img}
                        type={d.type}
                        length={d.length}
                        name={d.title}
                    />
                )) : ""}
            </div>
            <button className="btn_cus" id="more_films"><p className="text_upper">Xem thêm</p></button>
        </div>
        </section>
    )
}

export default Filmlist;