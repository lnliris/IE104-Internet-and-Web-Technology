import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import { FaSearch } from "react-icons/fa";

// Hàm chức năng thu nhỏ mở rộng tìm kiếm

const SearchBar = () => {
  const [isVisible, setIsVisible] = useState(false); // State to control visibility
  const [searchTerm, setSearchTerm] = useState(''); // State for search input value

  // Toggle the visibility of the search bar
  const toggleSearchBar = () => {
    setIsVisible((prev) => !prev);
  };

  // Handle the search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Button/Icon to toggle the search bar */}
      <button onClick={toggleSearchBar} style={{ cursor: 'pointer' }}>
      <FaSearch color='white' size='20px' className='flex items-center '/>
      </button>

      {/* Search bar, conditionally rendered based on isVisible state */}
      {isVisible && (
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
          style={{
            marginLeft: '10px',
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            outline: 'none',
            transition: 'width 0.3s ease',
            width: isVisible ? '200px' : '0', // Smooth transition
          }}
        />
      )}
    </div>
  );
};

export default SearchBar;