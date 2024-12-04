import React, { useState } from "react";
import "./ScheduleList.css"; // Import file CSS

const schedules = [
  {
    cinema: "Galaxy Linh Trung",
    address: "TTTM Coopmart Linh Trung, P.Linh Trung, Thủ Đức, TP.HCM",
    times: ["20:00", "22:00"],
  },
  {
    cinema: "CGV Hùng Vương Plaza",
    address: "Tầng 7, Hùng Vương Plaza, 126 Hùng Vương, Q.5, TP.HCM",
    times: ["10:00", "13:00", "15:00", "19:00", "23:00"],
  },
  {
    cinema: "Lotte Gold View",
    address: "Tầng 5, Tòa Nhà Gold View, 346 Bến Vân Đồn, Q.4, TP.HCM",
    times: ["20:00", "22:00"],
  },
  {
    cinema: "Lotte Moonlight Thủ Đức",
    address: "Tầng 5 TTTM Moonlight Plaza, 102 Tăng Nhơn Phú B, TP.HCM",
    times: ["16:00", "18:00", "21:00"],
  },
  {
    cinema: "Cinestar Quốc Thanh",
    address: "271 Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, TP.HCM",
    times: ["12:00", "14:30", "19:30"],
  },
  {
    cinema: "Cinestar Hai Bà Trưng",
    address: "135 Hai Bà Trưng, Q.1, TP.HCM",
    times: ["11:00", "15:00", "20:00"],
  },
];

const ScheduleList = () => {
  const [openCinema, setOpenCinema] = useState(null);

  const toggleCinema = (cinema) => {
    setOpenCinema(openCinema === cinema ? null : cinema);
  };

  return (
    <div className="schedule-list-container">
      {schedules.map((schedule, index) => (
        <div key={index} className="schedule-item">
          {/* Header */}
          <button
            onClick={() => toggleCinema(schedule.cinema)}
            className={`schedule-header ${
              openCinema === schedule.cinema ? "active" : ""
            }`}
          >
            {schedule.cinema}
          </button>

          {/* Body */}
          {openCinema === schedule.cinema && (
            <div className="schedule-body">
              <p className="schedule-address">{schedule.address}</p>
              <div className="schedule-times">
                {schedule.times.map((time, timeIndex) => (
                  <button key={timeIndex} className="schedule-time-button">
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ScheduleList;
