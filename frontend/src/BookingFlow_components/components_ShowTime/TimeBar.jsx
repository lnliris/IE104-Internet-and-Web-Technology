import React, { useState } from "react";
import "./TimeBar.css";

const days = [
  { day: "Thứ 2", date: "2/12" },
  { day: "Thứ 3", date: "3/12" },
  { day: "Thứ 4", date: "4/12" },
  { day: "Thứ 5", date: "5/12" },
  { day: "Thứ 6", date: "6/12" },
  { day: "Thứ 7", date: "7/12" },
  { day: "Chủ Nhật", date: "8/12" },
];

const TimeBar = () => {
  const [selectedDay, setSelectedDay] = useState(null);

  const handleDayClick = (index) => {
    setSelectedDay(index);
  };

  return (
    <div className="booking-bar">
      {days.map((day, index) => (
        <div
          key={index}
          className={`day-item ${selectedDay === index ? "active" : ""}`}
          onClick={() => handleDayClick(index)}
        >
          <p className="day-label">{day.day}</p>
          <p className="date-label">{day.date}</p>
        </div>
      ))}
    </div>
  );
};

export default TimeBar;
