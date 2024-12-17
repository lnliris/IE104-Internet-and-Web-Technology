import React, { useContext, useEffect } from 'react';
import VoucherCard from './VoucherCardneba'; // Đường dẫn tới file VoucherCard
import './VoucherCardList.css';
import { BookingContext } from '../Context';

const VoucherCardList = () => {
  const {discountAmount, setDiscountAmount} = useContext(BookingContext);

  const handleVoucherSelect = (discount) => {
    setDiscountAmount(discount); // Cập nhật số tiền giảm vào state
  };

  useEffect(() => {
    console.log("Discount:", discountAmount);
  }, [discountAmount]);
  return (
    <div className="VoucherCardList">
      <VoucherCard
        title="Giảm 20k"
        description="Áp dụng cho thành viên"
        expiryDate="1/1/2025"
        discount={20000}
        onSelect={handleVoucherSelect}
      />
      <VoucherCard
        title="Giảm 50k"
        description="Áp dụng cho hóa đơn trên 500k"
        expiryDate="30/12/2024"
        discount={50000}
        onSelect={handleVoucherSelect}
      />
    </div>
  );
};

export default VoucherCardList;
