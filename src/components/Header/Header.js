import React from 'react'
import logo from './../../assets/img/logo.png'

const Header = () => (
  <header className="header">
    <a
      href="/"
      aria-label="Back to homepage"
      alt="Back to homepage"
      title="Back to homepage"
    >
      <div className="header-logoWrapper">
        <img
          alt="privtext logo"
          aria-label="privtext logo"
          className="header-logo"
          decoding="async"
          loading="lazy"
          src={logo}
        />
        <h1>privtext.me</h1>
      </div>
      <h2 className="header-subtitle h4">
        share self-destructing messages anonymously
      </h2>
    </a>
  </header>
)

export default Header
