import React from 'react'
import Header from './../components/Header/Header'
import InfoBox from './../components/InfoBox/InfoBox'
import Footer from './../components/Footer/Footer'
import { Link } from 'react-router-dom'
import './../main.css'

const About = () => (
  <div className="container centerComponent about-page">
    <div className="pageWrapper centerComponentVertically">
      <Header />
      <InfoBox />
    </div>
    <Footer
      footerMessage={[
        <div key="footer content">
          Back to{' '}
          <Link
            to="/"
            aria-label="Back to homepage"
            alt="Back to homepage"
            className="link-styled"
          >
            privtext.me
          </Link>
        </div>
      ]}
    />
  </div>
)

export default About
