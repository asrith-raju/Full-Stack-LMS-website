import React from 'react'
import { assets } from '../../assets/assets'

const CallToAction = () => {
  return (
    <div>
      <h1>Learn anything,anytime,anywhere</h1>
      <p>Incididunt sint fugiat pariatur cupidatat consectetur sit cillium anim id venim aliqua prodient execpteur commodo doea.</p>
      <div>
        <button>Get Started</button>
        <button>Learn more <img src={assets.arrow_icon} alt="arrow_icon" /></button>
      </div>
    </div> 
  )
}

export default CallToAction
