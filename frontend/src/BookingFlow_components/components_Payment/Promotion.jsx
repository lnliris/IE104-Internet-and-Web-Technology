import React from 'react';
import './Promotion.css'; // Tạo CSS riêng để tạo giao diện giống như hình
import VoucherCardList from './VoucherCardList';
import { useState, useContext } from 'react';
import { BookingContext } from '../Context';

const Promotion = () => {
  const [discountCode, setDiscountCode] = useState('');
  const [isValid, setIsValid] = useState(null); // Kiểm tra mã giảm giá hợp lệ
  const {discountInput, setDiscountInput} = useContext(BookingContext);

  const validCodes = [
    { code: "DISCOUNT20", amount: 20000 },
    { code: "SALE50", amount: 50000 },
    { code: "OFFER10", amount: 10000 }
  ]; // Mã giảm giá hợp lệ

  const handleDiscountChange = (e) => {
    setDiscountCode(e.target.value);
  };

  const applyDiscount = () => {
    const foundCode = validCodes.find(item => item.code === discountCode);
    if (foundCode) {
      setIsValid(true);
      setDiscountInput(foundCode.amount);
      alert(`Mã giảm giá hợp lệ! Bạn đã giảm được ${foundCode.amount} VND.`);
    } else {
      setIsValid(false);
      setDiscountInput(0);
      alert("Mã giảm giá không hợp lệ.");
    }
  };
  return (
    <div className="promo-container">
      <h2>Khuyến mãi</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Mã giảm giá"
          value={discountCode}
          onChange={handleDiscountChange}
          className="promo-input"
        />
        <button className="apply-button" onClick={applyDiscount}>Áp dụng</button>
        {isValid !== null && (
        <p className={isValid ? 'valid-code' : 'invalid-code'}>
          {isValid ? `Mã giảm giá hợp lệ! Giảm ${discountInput} VND` : 'Mã giảm giá không hợp lệ!'}
        </p>
      )}
      </div>
      <VoucherCardList></VoucherCardList>
    </div>
  );
};

export default Promotion;
