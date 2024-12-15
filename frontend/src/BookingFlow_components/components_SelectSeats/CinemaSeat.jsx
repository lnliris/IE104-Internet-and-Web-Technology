import React, { useState } from "react";
import "./CinemaSeat.css"; // Để thêm CSS tùy chỉnh


const CinemaSeat = () => {
  const rows = ["A", "B", "C", "D", "E", "F", "G"];
  const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const hiddenSeats = ["A4", "A5", "A6"];  

  const [seats, setSeats] = useState({
    A5: "booked",
    B5: "booked",
    E5: "selected",
    E6: "selected",
    F5: "booked",
  });

  const handleSeatClick = (row, col) => {
    const seatKey = `${row}${col}`;
    setSeats((prevSeats) => {
      if (prevSeats[seatKey] === "booked") return prevSeats; // Không cho chọn ghế đã đặt
      return {
        ...prevSeats,
        [seatKey]: prevSeats[seatKey] === "selected" ? "available" : "selected",
      };
    });
  };

  return (
    <div className="cinema">
      <div className="screen-container">
        <div className="screen-curve"></div>
        <p className="screen-text">MÀN HÌNH</p>
      </div>
      <div className="seating">
        {rows.map((row) => (
          <div className="row" key={row}>
            {cols.map((col) => {
              const seatKey = `${row}${col}`;
              const isHidden = hiddenSeats.includes(seatKey); // Kiểm tra ghế có cần ẩn không
              const seatStatus = seats[seatKey] || "available";
              return (
                <div
                  key={seatKey}
                  className={`seat ${seatStatus} ${isHidden ? "hidden" : ""}`}
                  onClick={() => handleSeatClick(row, col)}
                >
                  {seatKey}
                </div>
              );
            })}
          </div>
        ))}
      </div>
        <div className="legend">
            <div className="legend-item">
            <span className="seat available"></span> Ghế chưa đặt
            </div>
            <div className="legend-item">
            <span className="seat selected"></span> Ghế đang đặt
            </div>
            <div className="legend-item">
            <span className="seat booked"></span> Ghế đã đặt
            </div>
        </div>
    </div>
  );
};

export default CinemaSeat;