import React from "react";
import "./ConfirmCorn.css"; // Import file CSS
import avengerposter from '../../assets/img/avengerposter.jpg';

function ConfirmCorn () {
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
              <p>Rạp:</p>
              <p>Thứ:</p>
              <p>Giờ:</p>
            </div>
          </div>
        </div>

        {/*Thanh Ngang */}
        <div className="crossbar"></div>

        {/*Thông tin ghế */}
        <div className="infoseat">
          <div className="seatdetail">
            <p> Số lượng ghế</p>
            <p> Vị trí ghế</p>
          </div>
          <div className="seatprice"> 800000 * 2</div>
        </div>
      </div>

      {/*Thông tin bắp nước */}
      <div className="total">
        <div className="totaltext" style={{width: '70%'}}>
          <p> 0 x Combo 1 bắp + 2 nước</p>
        </div>
        <div className="totalprice" style={{width:'30%'}}> 100.000đ x 2</div>
      </div>

      {/*Tổng tiền*/}
      <div className="total">
        <div className="totaltext"> Tổng tiền: </div>
        <div className="totalprice"> 800000đ</div>
      </div>

      {/* Nút điều hướng */}
      <div className="buttons">
        <button className="button-back">Quay lại</button>
        <button className="button-next">Tiếp theo</button>
      </div>
    </div>
  );
};

export default ConfirmCorn;