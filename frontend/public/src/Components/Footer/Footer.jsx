import React from 'react'
import './Footer.css'
import footer_logo from '../Assets/logo.png'
import insta_icon from '../Assets/instagram_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'
import email_icon from '../Assets/email_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
        <img src={footer_logo} width="80" height="80" alt="" />
        <p>Sportify</p>
      </div>
      <ul className='footer-links'>
        <li>Company</li>
        <li>Products</li>
        <li>Offices</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
      <div className="footer-social-icon">

        <div className="footer-icons-container">
            <img src={insta_icon} alt="" />
        </div>

        <div className="footer-icons-container">
            <img src={email_icon} alt="" />
        </div>

        <div className="footer-icons-container">
            <img src={whatsapp_icon} alt="" />
        </div>

      </div>
      <div className="footer-copyright">
        <hr />
        <p>Copyright @2023 - All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer
