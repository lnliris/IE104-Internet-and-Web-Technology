import React from "react";
import "./confirm.css"; // Import file CSS
import avengerposter from '../assets/img/avengerposter.jpg';

function Confirm () {
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
            <p>Rạp:</p>
            <p>Thứ:</p>
            <p>Giờ:</p>
          </div>
        </div>
      </div>

      {/* Nút điều hướng */}
      <div className="buttons">
        <button className="button-back">Quay lại</button>
        <button className="button-next">Tiếp theo</button>
      </div>
    </div>
  );
};

export default Confirm;
