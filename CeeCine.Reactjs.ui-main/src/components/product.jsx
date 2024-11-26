import { useEffect } from "react";
import comm from "../utils/common";
function Product(prop){

    useEffect(()=>{
        new comm().do_grabb_scroll("#wrap-recom-product");
    })

    return(
        <div className="wrap-product" data-id={prop.id} onClick={()=>{prop.clickEvent()}}>
            <div className="wrap-prod-info">
                <div className="product-topinf">{prop.type} / {prop.length}</div>
                <div className="product-name">{prop.name}</div>
                <div className="wrap-product-user">
                    <div className="wrap-btn-action">
                        <button className="btn_cus btn_film" style={{"backgroundColor":"red"}}><p>Đặt vé ngay</p></button>
                        <button className="btn_cus btn_film" style={{"border":"1px solid white","backgroundColor":"transparent"}}><p>Xem thêm</p></button>
                    </div>
                </div>
            </div>
            <img className="w-100 h-100 img_prod_el" src={prop.img}  />
            
        </div>
    );

}

export default Product;