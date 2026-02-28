import React from 'react'

const Card1 = (props) => {
  return (
    <div className='bg-white p-10 h-full w-80 rounded-2xl border-gray-200    border-2 gap-5'>
        <img src={props.card.image} alt="" className='h-10 w-10 ' />
        <h1 className='text-lg font-semibold'>{props.card.title}</h1>
        <p className='text-sm text-(--text-secondary)'>{props.card.description}</p>
    </div>
  )
}

export default Card1