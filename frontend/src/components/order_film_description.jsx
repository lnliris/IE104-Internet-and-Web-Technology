import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../api/api.js"; // Import hàm API
import $ from "jquery"

function OrderFilmDescript() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  // Hàm chuyển đổi định dạng ngày tháng năm
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(movieId); // Gọi API
        console.log(data);
        setMovie(data); // Cập nhật state với dữ liệu trả về
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    };

    fetchMovieDetails();
    do_bind_event();
  }, [movieId]);

  var do_bind_event = ()=>{
    event_trailer();
    popup_trailer();
  }

  var popup_trailer = ()=>{
    $(".playtrailer").on("click", function(){
      $(".parPopupTrailer").removeClass("hide");
    })
  }

  var event_trailer   = ()=>{
    $(".parPopupTrailer").on("click", function(){
      $(".parPopupTrailer").addClass("hide");
    })

    $(".chilPopupTrailer").on("click", function(e){
      e.stopPropagation();
    })
  }

  return (
    <section className="flex f-col w-100">
      <section className="w-100 h-100 flex cenhor cenver" style={{"position": "relative"}} >
            {/* <video  autoPlay loop>
                <source src={trailer} type="video/mp4"/>
            </video> */}
            <svg className="playtrailer" style={{"position" : "absolute"}} xmlns="http://www.w3.org/2000/svg" width="82" height="82" viewBox="0 0 82 82" fill="none">
            <path d="M41.0003 79.3334C62.1712 79.3334 79.3337 62.1709 79.3337 41C79.3337 19.8291 62.1712 2.66669 41.0003 2.66669C19.8294 2.66669 2.66699 19.8291 2.66699 41C2.66699 62.1709 19.8294 79.3334 41.0003 79.3334Z" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M33.3337 25.6667L56.3337 41L33.3337 56.3334V25.6667Z" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <img className="w-100" style={{"height":"100dvh", "objectFit":"cover","objectPosition":"center"}} src={movie?.poster_url} />
        </section>
      <section className="flex cenhor cenver hide parPopupTrailer" style={{"backgroundColor":"#000000bd","zIndex":"10000","position":"fixed", "width": "100%", "height":"100dvh"}}>
            {/* <video  autoPlay loop>
                <source src={trailer} type="video/mp4"/>
            </video> */}
            <iframe className="chilPopupTrailer" style={{"width": "50dvw", "height":"55dvh"}} src={movie?.vid_url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </section>
      <div
        className="flex w-100 cenver"
        style={{
          position: "relative",
          padding: "5% 15%",
          gap: "30px",
          transform: "translateY(-60px)",
        }}
      >
        <div style={{ flex: "1" }}>
          <img
            className="w-100 h-100"
            style={{ borderRadius: "20px" }}
            src={movie?.poster_url}
            alt={movie?.title}
          />
        </div>
        <div
          style={{
            flex: "2",
            marginTop: "80px",
            backgroundColor: "#00000099",
            padding: "30px",
            borderRadius: "10px",
          }}
        >
          <div className="flex spa-bet-ver cenhor">
            <h1 className="p-0 product-name" style={{ fontSize: "40px" }}>
              {movie?.title}
            </h1>
            <p className="text-badge" style={{ backgroundColor: "#B28FFF" }}>
              {movie?.limit_age}
            </p>
          </div>
          <div style={{ padding: "15px" }}>
            <div className="flex startver cenhor gap20">
              <div className="flex cenhor gap10">
                <p style={{ fontSize: "20px", color: "white" }}>
                  <b>{movie?.duration} phút</b>
                </p>
              </div>
              <div className="flex cenhor gap10">
                <p style={{ fontSize: "20px", color: "white" }}>
                  {/* Định dạng ngày tháng năm */}
                  <b>{movie?.release_date ? formatDate(movie.release_date) : ""}</b>
                </p>
              </div>
            </div>
            <div className="flex f-col gap10">
              <p style={{ color: "white" }}>
                Nhà sản xuất: <b>{movie?.crew}</b>
              </p>
              <p style={{ color: "white" }}>
                Thể loại: <b>{movie?.genre}</b>
              </p>
              <p style={{ color: "white" }}>
                Diễn viên: <b>{movie?.cast}</b>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex f-col w-100 cenver mt-50" style={{"position":"relative","padding":"0 5%","gap":"10px", "transform":"translateY(-60px)"}}>
      <div className="flex cenhor gap10">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 60 60" fill="none">
          <path d="M20 30.5H37.5M20 40.5H30.95M40 10.05C48.325 10.5 52.5 13.575 52.5 25V40C52.5 50 50 55 37.5 55H22.5C10 55 7.5 50 7.5 40V25C7.5 13.6 11.675 10.5 20 10.05M25 15H35C40 15 40 12.5 40 10C40 5 37.5 5 35 5H25C22.5 5 20 5 20 10C20 15 22.5 15 25 15Z" stroke="white" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h1 className="product-name m-0" style={{"fontSize":"30px"}}>Nội dung phim</h1>
      </div>
          <div className="line w-100" style={{"height":"1px", "backgroundColor":"white"}}></div>
          <p style={{"fontSize":"14px","color":"white"}}>{movie?.description}</p>
      </div>  
    </section>
  );
}

export default OrderFilmDescript;
