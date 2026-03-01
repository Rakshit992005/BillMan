import React from 'react'

const Home1Left = () => {
  return (
    <div className='w-1/2 flex flex-col gap-10   justify-center items-center'>
        <div className='flex flex-col justify-center items-center '>
        <span className='w-1/2  text-(--color-dark) text-5xl font-bold'>Simplify Invoicing.</span>
        <span className='w-1/2 text-(--color-secondary) text-5xl font-bold'>Maximize Revenue.</span>
        </div>


        <p className='w-3/7 xs:w-1/2 text-left text-(--text-secondary)'>The all-in-one platform for freelancers and agencies to automate invoicing, track every rupee, and gain deep insights into business growth.</p>

        <div className='flex gap-10'>
        <button className='w-30 h-10 bg-(--color-secondary) text-white rounded-full'>Get Started</button>
        <button className='w-30 h-10 bg-(--color-secondary) text-white rounded-full'>Watch Demo</button>
        </div>

    </div>
  )
}

export default Home1Left