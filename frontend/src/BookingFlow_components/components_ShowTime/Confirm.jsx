import React, { useContext } from "react";
import "./confirm.css"; // Import file CSS
import avengerposter from '../../assets/img/avengerposter.jpg';
import { useNavigate } from "react-router-dom"
import { BookingContext } from "../Context";

function Confirm () {
  const {selectedTheater, selectedTime, selectedDate, convertDateFormat,selectedRoomId,selectedShowtimeId} = useContext(BookingContext);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  const handleNext = () => {
    navigate(`/selectseats/${selectedRoomId}`)
  };
  
  return (
    <div className="container">
      <div className="card">
        {/* Poster */}
        <img
          src={avengerposter} // Thay link này bằng link poster phim
          alt="Avengers: Infinity War"
          className="poster"
        />

        {/* Thông tin */}
        <div className="info">
          <h3 className="title">AVENGERS: INFINITY WAR</h3>
          <p className="subtitle">2D Phụ đề</p>
          <div className="details">
            {selectedTheater && <p>Rạp: {selectedTheater}</p>}
            {selectedDate && selectedDate.day && (<p>{selectedDate.day} - {convertDateFormat(selectedDate.date)}</p>)}
            {selectedTime && <p>Giờ: {selectedTime}</p>}
          </div>
        </div>
      </div>

      {/* Nút điều hướng */}
      <div className="buttons">
        <button className="button-back" onClick={handleBack}>Quay lại</button>
        <button className="button-next" onClick={handleNext}>Tiếp theo</button>
      </div>
    </div>
  );
};

export default Confirm;
