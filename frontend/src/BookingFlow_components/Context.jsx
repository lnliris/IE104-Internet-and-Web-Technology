import React, { createContext, useState,useEffect, useCallback } from "react";

// Tạo Context
export const BookingContext = createContext();

// Provider để bao bọc các component con và truyền dữ liệu
export const BookingProvider = ({ children }) => {
  
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState({ day: "Thứ 2", date: "2024-12-13" });
  const seatPrice = 80000; // Giá mỗi ghế
  const [selectedSeats, setSelectedSeats] = useState([]); // State lưu ghế đã chọn
  const [order, setOrder] = useState({});
  const [selectedRoomId, setSelectedRoomId]=useState(null);
  const [selectedShowtimeId, setSelectedShowtimeId]=useState([])
  const [selectedSeatIds, setSelectedSeatIds] = useState([]);
  const [fandb,setFandB]=useState([])
  
  const totalCorn = () => {
    return Object.keys(order).reduce((total, itemId) => {
      const item = order[itemId];
      total += item.price * item.quantity;
      return total;
    }, 0);
  };

  
  const [discountAmount, setDiscountAmount] = useState(0);

  function convertDateFormat(dateString) {
    const parts = dateString.split('-'); // Tách chuỗi theo dấu '-'
    return `${parts[2]}/${parts[1]}/${parts[0]}`; // Đổi thứ tự thành ngày-tháng-năm
  }

  const formatCurrency = (value) => new Intl.NumberFormat("vi-VN").format(value);
  return (
    <BookingContext.Provider
      value={{
        selectedDate, setSelectedDate,
        selectedTheater, setSelectedTheater,
        selectedTime, setSelectedTime,
        seatPrice,
        selectedSeats, setSelectedSeats,
        order, setOrder,
        convertDateFormat, 
        totalCorn,
        discountAmount, setDiscountAmount,
        formatCurrency,
        selectedRoomId,setSelectedRoomId,
        selectedShowtimeId, setSelectedShowtimeId,
        selectedSeatIds, setSelectedSeatIds ,
        fandb,setFandB     
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
