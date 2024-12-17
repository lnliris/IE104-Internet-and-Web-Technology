import React, { createContext, useState } from "react";

// Tạo Context
export const BookingContext = createContext();

// Provider để bao bọc các component con và truyền dữ liệu
export const BookingProvider = ({ children }) => {
  
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState({ day: "", date: "" });
  const seatPrice = 80000; // Giá mỗi ghế
  const [selectedSeats, setSelectedSeats] = useState([]); // State lưu ghế đã chọn
  const [order, setOrder] = useState({});

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

  // PopUp Context
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [isPaymentPopup, setIsPaymentPopup] = useState(false);

  const handleConfirmClick = () => {
    setIsConfirmPopupOpen(true); // Mở popup xác nhận
  };

  const handleConfirmClose = () => {
    setIsConfirmPopupOpen(false); // Đóng popup xác nhận
  };

  const handleConfirmOpen = () => {
    setIsConfirmPopupOpen(false); // Đóng popup xác nhận
    setIsPaymentPopup(true); // Hiển thị popup thông tin thanh toán
  };

  const handleClosePaymentPopup = () => {
    setIsPaymentPopup(false); // Đóng popup thông tin thanh toán
  };

  // Input Discount
  const [discountInput, setDiscountInput] = useState(0);

  
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
        handleConfirmClick, handleConfirmClose, handleConfirmOpen, handleClosePaymentPopup,
        isConfirmPopupOpen, isPaymentPopup,
        discountInput, setDiscountInput}}
    >
      {children}
    </BookingContext.Provider>
  );
};
