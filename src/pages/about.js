import React from 'react'
import Header from './../components/Header/Header'
import InfoBox from './../components/InfoBox/InfoBox'
import Footer from './../components/Footer/Footer'
import { Link } from 'react-router-dom'
import './../main.css'

const About = () => (
  <>
    <div className="pageWrapper centerComponentVertically">
      <Header />
      <InfoBox />
    </div>
    <Footer />
  </>
)

export default About
