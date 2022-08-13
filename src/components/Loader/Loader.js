import React from 'react'
import logo from './../../assets/img/logo.png'

const Loader = () => (
  <div className="loader" data-testid="loader">
    <img
      alt="privtext logo"
      aria-label="privtext logo"
      className="loader-logo"
      decoding="async"
      loading="lazy"
      src={logo}
    />
    <div className="loader-text">Loading</div>
  </div>
)

export default Loader
