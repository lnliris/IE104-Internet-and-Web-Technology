import "./ConfirmCorn.css"; // Import file CSS
import avengerposter from '../../assets/img/avengerposter.jpg';
import { useNavigate } from "react-router";
import { BookingContext } from "../Context";
import { useContext } from "react";
function ConfirmCorn () {
  const {selectedSeats, seatPrice, selectedTheater, selectedTime, selectedDate, order, convertDateFormat, totalCorn, formatCurrency} = useContext(BookingContext);
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(-1);
  };
  const handleNext = () => {
    navigate('/payment')
  };

  const totalPrice = selectedSeats.length * seatPrice + totalCorn();

  return (
    <div className="container">
      <div className="container_card">
        <div className="card">
          {/* Poster */}
          <img
            src={avengerposter} // Thay link này bằng link poster phim
            alt="Avengers: Infinity War"
            className="poster"
          />

          {/* Thông tin rap chiếu*/}
          <div className="info">
            <h3 className="title">AVENGERS: INFINITY WAR</h3>
            <p className="subtitle">2D Phụ đề</p>
            <div className="details">
              <p>Rạp: {selectedTheater}</p>
              <p>{selectedDate.day} - {convertDateFormat(selectedDate.date)} </p>
              <p>Giờ: {selectedTime}</p>
            </div>
          </div>
        </div>

        {/*Thanh Ngang */}
        <div className="crossbar"></div>

        {/*Thông tin ghế */}
        <div className="infoseat">
          <div className="seatdetail">
            <p> Số lượng ghế: {selectedSeats.length}</p>
            <p> Vị trí ghế: {selectedSeats.join(", ")}</p>
          </div>
          <div className="seatprice"> {selectedSeats.length} x {formatCurrency(seatPrice)}</div>
        </div>
      </div>

      {/*Thông tin bắp nước */}
      {/* Hiển thị từng mặt hàng */}
      {Object.values(order)
        .filter((item) => item.quantity > 0) // Chỉ hiển thị các mặt hàng có số lượng > 0
        .map((item, index) => (
          <div key={index} className="total">
            <div className="totaltext" style={{ width: "70%" }}>
              <p>{item.quantity} x {item.name}</p>
            </div>
            <div className="totalprice" style={{ width: "30%" }}>
              {formatCurrency(item.quantity * item.price)}đ
            </div>
          </div>
        ))}

      {/*Tổng tiền*/}
      <div className="total">
        <div className="totaltext" style={{fontWeight:'bold'}}> Tổng tiền: </div>
        <div className="totalprice"> {formatCurrency(totalPrice)} </div>
      </div>

      {/* Nút điều hướng */}
      <div className="buttons">
        <button className="button-back" onClick={handleBack}>Quay lại</button>
        <button className="button-next" onClick={handleNext}>Tiếp theo</button>
      </div>
    </div>
  );
};

export default ConfirmCorn;