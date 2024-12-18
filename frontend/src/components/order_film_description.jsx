import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../api/api.js"; // Import hàm API

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
  }, [movieId]);

  return (
    <section className="flex f-col w-100">
      <section>
            {/* <video  autoPlay loop>
                <source src={trailer} type="video/mp4"/>
            </video> */}
            <iframe className="w-100 " style={{"height" : "100dvh"}} src={movie?.vid_url} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
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
            <h1 className="product-name" style={{ fontSize: "40px" }}>
              {movie?.title}
            </h1>
            <p className="text-badge" style={{ backgroundColor: "#B28FFF" }}>
              T{movie?.limit_age}
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
    </section>
  );
}

export default OrderFilmDescript;
