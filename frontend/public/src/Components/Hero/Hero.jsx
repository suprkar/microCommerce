import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_icon.png'
const Hero = () => {
  return (
    <div className='hero' style={{ background: 'linear-gradient(to right, #F3B664, #FFE7C1,)' }}>
      <div className="hero-left">
        <h2 className='NEW-ARRIVALS-ONLY'>NEW ARRIVALS ONLY</h2>
        <div>
          <div className="hero-hand-icon">
            <p>new</p>
            <img src={hand_icon} alt="" />
          </div>
          <p className='para'>collections</p>
          <p className='para'>for everyone </p>
        </div>
        <div className="hero-latest-btn">
        <div>Latest Collection</div>
        <img src={arrow_icon} alt="" />

      </div>
      </div>
      
      <div className="hero-right">
          <img src={hero_image} height='600' width='500' alt="" />
      </div>
    </div>
  )
}

export default Hero
