import React from 'react'
import SearchBar from './SearchBar'
// Header Bar

const Search = () => {
  return (
    <div className=' bg-black flex justify-between'>
        <div className='text-red-700 items-center flex gap-8 
        font-bold text-[30px] px-4 py-2'> Ceecin</div>
        <div className='flex items-center px-4 py-2'> <SearchBar></SearchBar> </div>
    </div>
  )
}
export default Search