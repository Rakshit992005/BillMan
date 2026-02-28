import React from 'react'
import Home1Left from '../components/Home1Left'
import Home1Right from '../components/Home1Right'
import Home2 from '../components/Home2'

const Home = () => {
  return (
    <div className='flex flex-col bg-(--bg-primary) '>
      <div className='flex w-full p-60   h-[calc(100vh-80px)] border-b-2 border-(--border-primary)'>
      <Home1Left />
      <Home1Right />
      </div>
      <div className=' border-b-2 border-(--border-primary)'>
        <Home2 />
      </div>
      

      
    </div>
  )
}

export default Home
