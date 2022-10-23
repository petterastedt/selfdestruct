import React from 'react'
import Header from './../components/Header/Header'
import InfoBox from './../components/InfoBox/InfoBox'
import Footer from './../components/Footer/Footer'

const About = () => (
  <div className="container about-page">
    <div className="pageWrapper centerComponent centerComponentVertically">
      <Header />
      <InfoBox />
      <Footer
        footerMessage={[
          <div key="footer content">
            Back to{' '}
            <a
              href="/"
              aria-label="Back to homepage"
              alt="Back to homepage"
              className="link-styled"
            >
              privtext.me
            </a>
          </div>
        ]}
      />
    </div>
  </div>
)

export default About
