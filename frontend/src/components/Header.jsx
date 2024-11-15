import React from 'react'

function Header() {
  return (
    <div className=' bg-black flex justify-between'>
        <div className='text-red-700 items-center flex gap-8 
        font-bold text-[30px] px-4 py-2'> Movies</div>
        <div className='flex items-center space-x-4 px-3'>
        <input type="text" placeholder='Search'
        className='p-4 text-black'/>
        <button className='p-2 text-white
         bg-red-600 '>Search</button>
        </div>
    </div>
  )
}

export default Header