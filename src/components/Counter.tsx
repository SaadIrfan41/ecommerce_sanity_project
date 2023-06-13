'use client'
import React, { useState } from 'react'

const Counter = () => {
  const [counter, setcounter] = useState(1)
  return (
    <div className='flex gap-8 items-center'>
      <h4 className=' font-bold text-base'>Quantity:</h4>
      <div className='flex gap-3'>
        <button
          disabled={counter < 2}
          onClick={() => {
            setcounter(counter - 1)
          }}
          className={
            ' bg-[#f1f1f1] rounded-full w-9 h-9 flex items-center justify-center text-3xl cursor-pointer'
          }
        >
          -
        </button>
        <span className='m-auto'>{counter}</span>
        <button
          onClick={() => {
            setcounter(counter + 1)
          }}
          className='  border-2 border-black rounded-full w-9 h-9 flex items-center justify-center text-[25px] cursor-pointer'
        >
          +
        </button>
      </div>
    </div>
  )
}

export default Counter
