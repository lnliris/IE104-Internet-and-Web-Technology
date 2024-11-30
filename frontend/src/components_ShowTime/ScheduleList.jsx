import React, { useState } from "react";

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
    <div className="max-w-lg mx-auto p-4 space-y-4">
      {schedules.map((schedule, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg overflow-hidden"
        >
          {/* Header */}
          <button
            onClick={() => toggleCinema(schedule.cinema)}
            className={`w-full text-left px-4 py-2 bg-red-700 text-white font-bold ${
              openCinema === schedule.cinema ? "rounded-t-lg" : "rounded-lg"
            }`}
          >
            {schedule.cinema}
          </button>

          {/* Body */}
          {openCinema === schedule.cinema && (
            <div className="px-4 py-2 bg-gray-100">
              <p className="text-gray-700 text-sm">{schedule.address}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {schedule.times.map((time, timeIndex) => (
                  <button
                    key={timeIndex}
                    className="px-4 py-2 bg-gray-200 rounded-lg text-sm font-medium hover:bg-gray-300"
                  >
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
