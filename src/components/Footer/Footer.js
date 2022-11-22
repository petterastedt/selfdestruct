import React from 'react'
import { Link } from 'react-router-dom'

const Footer = ({ footerText, footerUrl, footerUrlText }) => (
  <footer className="footer">
    {footerText || 'Back to '}
    <Link
      to={footerUrl || '/'}
      aria-label={`${footerText} ${footerUrlText}`}
      className="link-styled"
    >
      {footerUrlText || 'privtext.me'}
    </Link>
  </footer>
)

export default Footer
