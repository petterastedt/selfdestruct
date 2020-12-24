import React from 'react'
import logo from './../../assets/img/logo.png'

const Header = () => (
  <div className="header centerComponent">
    <a href="/" aria-label="Back to homepage" alt="Back to homepage" title="Back to homepage">
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
      <h4 className="header-subtitle">share self-destructing messages anonymously</h4>
    </a>
  </div>
)

export default Header