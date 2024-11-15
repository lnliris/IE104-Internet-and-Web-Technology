import React, { useState } from 'react';
// Components filter lọc theo thể loại/ rating/ ngày ra mắt

const items = [
    { title: 'Movie 1', genre: 'Action', rating: 8.5, releaseDate: '2022-09-01' },
    { title: 'Movie 2', genre: 'Comedy', rating: 7.0, releaseDate: '2021-05-10' },
    { title: 'Movie 3', genre: 'Drama', rating: 9.0, releaseDate: '2023-01-20' },
    // Add more items as needed
    
];
function FilterSearch() {
    const [genreFilter, setGenreFilter] = useState('');
    const [ratingFilter, setRatingFilter] = useState('');
    const [releaseDateFilter, setReleaseDateFilter] = useState('');

    const filteredItems = items.filter(item => {
        // Xử lý dữ liệu để cho đầu ra
        return (
            (genreFilter ? item.genre === genreFilter : true) &&
            (ratingFilter ? item.rating >= ratingFilter : true) &&
            (releaseDateFilter ? item.releaseDate >= releaseDateFilter : true)
        );
    });

    return (
        <div>
        <div className='flex items-center bg-red-700 justify-between p-3' >    
            <div>
                <select onChange={e => setGenreFilter(e.target.value)} value={genreFilter}>
                    <option value="">Genre</option>
                    <option value="Action">Action</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Drama">Drama</option>
                    {/* Add more genres as needed */}
                </select>
            </div>
            <div>            
                <select onChange={e => setRatingFilter(e.target.value)} value={ratingFilter}>
                    <option value="">Rating</option>
                    <option value="8">Xem nhiều nhất</option>    
                    {/* Add more rating as needed */}
                </select>
            </div>        
            <div>
                <label>Release Date: </label>
                <input
                    type="date" placeholder='Release Date'
                    onChange={e => setReleaseDateFilter(e.target.value)}
                    value={releaseDateFilter}
                />
            </div>            
        </div>
        {/* Kết quả */}
        <h3>Results</h3>
        <ul>
            {filteredItems.map((item, index) => (
                <div key={index} className='w-full flex items-center'>
                    {item.title} - {item.genre} - Rating: {item.rating} - Released on: {item.releaseDate}
                </div>
            ))}
        </ul>
        </div>
    );
};
export default FilterSearch