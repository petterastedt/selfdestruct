import React from 'react'
import logo from './../../assets/img/logo.png'

const Header = () => (
  <div className="header centerComponent">
    <div className="header-logoWrapper">
      <img
        src={logo}
        alt="privtext logo"
        aria-label="privtext logo"
        className="header-logo"
        loading="lazy"
      />
      <h1>privtext.me</h1>
    </div>
    <h3 className="header-features">256-AES ENCRYPTION - DELETED AFTER READING*</h3>
    <h4 className="header-subtitle">share self-destructing messages anonymously</h4>
  </div>
)

export default Header