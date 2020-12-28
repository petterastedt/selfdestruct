import React from 'react'
import logo from './../../assets/img/logo.png'

const Header = () => (
  <header className="header centerComponent">
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
      <h2 className="header-subtitle h4">share self-destructing messages anonymously</h2>
    </a>
  </header>
)

export default Header