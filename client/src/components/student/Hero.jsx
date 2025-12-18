import React from 'react'
import { assets } from '../../assets/assets'

const Hero = () => {
  return (
    <div>
      <h1 className='md:text-home-heading-large text-home-heading-small relative font-bold text-gray-800 max-w-xl mx-auto'>Empower your future with the courses designed to <span className='text-blue-600'>fit your choice.</span><img src={assets.sketch} alt=""  className='md:block hidden absolute -bottom-7 right-0'/></h1>
    </div>
  )
}

export default Hero
